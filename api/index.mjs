import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Razorpay config — keys from environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const RAZORPAY_CONFIGURED = Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);

// Pricing constants (must match src/lib/training.js)
const BASE_PRICE_PAISE = 349900; // ₹3,499
const MAX_SELF_SERVE_SEATS = 8;
const DISCOUNT_CODES = [
  { code: 'CLAUDE500', type: 'flat', value: 50000 }, // ₹500 off per person
];

function deriveAmount(seatCount, discountCode) {
  const subtotal = BASE_PRICE_PAISE * seatCount;
  const dc = discountCode?.trim().toUpperCase();
  if (dc) {
    const found = DISCOUNT_CODES.find(d => d.code === dc);
    if (found) {
      const discount = found.type === 'flat'
        ? found.value * seatCount
        : Math.round(subtotal * found.value / 100);
      return subtotal - discount;
    }
  }
  return subtotal;
}

// Fail closed: no committed fallbacks. Set JWT_SECRET + ADMIN_PASSWORD
// as environment variables (see .env.example). Without them the admin
// API answers 503 instead of accepting a known password.
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_CONFIGURED = Boolean(JWT_SECRET && ADMIN_PASSWORD);
if (!AUTH_CONFIGURED) {
  console.error('Missing JWT_SECRET or ADMIN_PASSWORD env vars — admin API disabled.');
}
const DATA_DIR = '/tmp/data';
const POSTS_FILE = join(DATA_DIR, 'posts.json');
const CTAS_FILE = join(DATA_DIR, 'ctas.json');

if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

const readJSON = (file, fallback) => {
  try {
    if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf-8'));
  } catch {}
  return fallback;
};

const writeJSON = (file, data) => {
  try { writeFileSync(file, JSON.stringify(data, null, 2)); } catch {}
};

// Best-effort per-instance login throttle (10 tries / 15 min / IP).
// NOTE: serverless instances don't share memory, so this slows casual
// brute force but is not a substitute for a strong password + short TTL.
const loginAttempts = new Map();
function loginAllowed(ip) {
  const now = Date.now();
  const rec = loginAttempts.get(ip);
  if (!rec || now > rec.reset) {
    loginAttempts.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
    return true;
  }
  rec.count += 1;
  return rec.count <= 10;
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  // Non-www → www redirect (skip local + preview deployments)
  const host = req.headers.host;
  if (host && !host.startsWith('www.') && !host.startsWith('localhost') && !host.includes('127.0.0.1') && !host.includes('.vercel.app') && !host.includes('.app-preview.')) {
    const dest = `https://www.${host}${req.url}`;
    res.writeHead(301, { Location: dest });
    res.end();
    return;
  }

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API routes
  if (path.startsWith('/api/')) {
    const apiPath = path.replace(/^\/api/, '') || '/';

    // ── Public routes (no auth required) ───────────────────────────

    // Public: Razorpay config (key_id only — safe to expose)
    if (apiPath === '/razorpay/config' && req.method === 'GET') {
      return json(res, 200, { keyId: RAZORPAY_KEY_ID || '' });
    }

    // Public: Create Razorpay order
    if (apiPath === '/razorpay/order' && req.method === 'POST') {
      if (!RAZORPAY_CONFIGURED) return json(res, 503, { error: 'Payment not configured' });

      const body = await parseBody(req);
      const { seatCount, discountCode } = body;

      if (!seatCount || seatCount < 1 || seatCount > MAX_SELF_SERVE_SEATS) {
        return json(res, 400, { error: 'Invalid seat count (1-8)' });
      }

      const amount = deriveAmount(seatCount, discountCode);

      try {
        const { default: Razorpay } = await import('razorpay');
        const razorpay = new Razorpay({
          key_id: RAZORPAY_KEY_ID,
          key_secret: RAZORPAY_KEY_SECRET,
        });

        const order = await razorpay.orders.create({
          amount,
          currency: 'INR',
          receipt: `TGB-${Date.now()}`,
          notes: {
            seatCount: String(seatCount),
            discountCode: discountCode || 'none',
          },
        });

        return json(res, 200, {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
        });
      } catch (err) {
        console.error('Razorpay order creation failed:', err);
        return json(res, 500, { error: 'Failed to create order' });
      }
    }

    // Public: Verify Razorpay payment
    if (apiPath === '/razorpay/verify' && req.method === 'POST') {
      if (!RAZORPAY_CONFIGURED) return json(res, 503, { error: 'Payment not configured' });

      const body = await parseBody(req);
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return json(res, 400, { error: 'Missing payment verification fields' });
      }

      const generated = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generated !== razorpay_signature) {
        return json(res, 400, { verified: false, error: 'Invalid signature' });
      }

      return json(res, 200, { verified: true, paymentId: razorpay_payment_id });
    }

    // Public: verify certificate
    if (apiPath.startsWith('/training/verify/') && req.method === 'GET') {
      const certId = apiPath.split('/training/verify/')[1];
      if (!certId) return json(res, 400, { error: 'Certificate ID required' });
      return json(res, 200, { message: 'Use client-side Supabase query', certId });
    }

    // Public: validate discount code
    if (apiPath === '/training/discount/validate' && req.method === 'POST') {
      const body = await parseBody(req);
      const DISCOUNT_CODES = [];
      const found = DISCOUNT_CODES.find(d => d.code === body.code?.toUpperCase());
      if (!found) return json(res, 404, { valid: false, error: 'Invalid code' });
      if (found.expiresAt && new Date(found.expiresAt) < new Date()) {
        return json(res, 400, { valid: false, error: 'Code expired' });
      }
      return json(res, 200, { valid: true, ...found });
    }

    // ── Admin routes (auth required) ───────────────────────────────
    if (!AUTH_CONFIGURED) return json(res, 503, { error: 'Admin API not configured' });

    function getUser() {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return null;
      try { return jwt.verify(header.split(' ')[1], JWT_SECRET); } catch { return null; }
    }

    try {
      if (apiPath === '/login' && req.method === 'POST') {
        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
        if (!loginAllowed(ip)) return json(res, 429, { error: 'Too many attempts. Try again in 15 minutes.' });
        const body = await parseBody(req);
        if (!body.password) return json(res, 400, { error: 'Password required' });

        const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
        const match = await bcrypt.compare(body.password, hash);
        if (!match) return json(res, 401, { error: 'Invalid password' });
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
        return json(res, 200, { token });
      }

      if (apiPath === '/posts') {
        const user = getUser();
        if (!user) return json(res, 401, { error: 'Unauthorized' });
        if (req.method === 'GET') return json(res, 200, readJSON(POSTS_FILE, []));
        if (req.method === 'PUT') {
          const body = await parseBody(req);
          if (!Array.isArray(body)) return json(res, 400, { error: 'Expected array' });
          writeJSON(POSTS_FILE, body);
          return json(res, 200, { success: true });
        }
      }

      if (apiPath === '/ctas') {
        const user = getUser();
        if (!user) return json(res, 401, { error: 'Unauthorized' });
        if (req.method === 'GET') return json(res, 200, readJSON(CTAS_FILE, {}));
        if (req.method === 'PUT') {
          const body = await parseBody(req);
          writeJSON(CTAS_FILE, body);
          return json(res, 200, { success: true });
        }
      }

      // Admin: certificate operations (require auth)
      if (apiPath.startsWith('/training/certificates')) {
        const user = getUser();
        if (!user) return json(res, 401, { error: 'Unauthorized' });
        return json(res, 200, { message: 'Use client-side Supabase for certificate operations' });
      }

      return json(res, 404, { error: 'Not found' });
    } catch (e) {
      return json(res, 500, { error: e.message });
    }
  }

  // This function only serves /api/* — static assets and the SPA fallback
  // are handled by the platform (see vercel.json rewrites). Anything else
  // reaching here is a miss.
  return json(res, 404, { error: 'Not found' });
}
// force rebuild Mon Sep 21 18:13:46 IST 2026
// Mon Sep 21 18:23:00 IST 2026
