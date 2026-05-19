import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'tgb-change-this-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'growthbench2024';
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

const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);

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
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.replace(/^\/api/, '') || '/';

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Auth middleware
  function getUser() {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) return null;
    try { return jwt.verify(header.split(' ')[1], JWT_SECRET); } catch { return null; }
  }

  try {
    if (path === '/login' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.password) return json(res, 400, { error: 'Password required' });

      const match = await bcrypt.compare(body.password, hash);
      if (!match) return json(res, 401, { error: 'Invalid password' });
      const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      return json(res, 200, { token });
    }

    if (path === '/posts') {
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

    if (path === '/ctas') {
      const user = getUser();
      if (!user) return json(res, 401, { error: 'Unauthorized' });
      if (req.method === 'GET') return json(res, 200, readJSON(CTAS_FILE, {}));
      if (req.method === 'PUT') {
        const body = await parseBody(req);
        writeJSON(CTAS_FILE, body);
        return json(res, 200, { success: true });
      }
    }

    json(res, 404, { error: 'Not found' });
  } catch (e) {
    json(res, 500, { error: e.message });
  }
}
