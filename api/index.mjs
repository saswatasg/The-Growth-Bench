import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { join, extname } from 'path';

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

const MIME_TYPES = {
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.vcf': 'text/vcard',
};

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

    function getUser() {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return null;
      try { return jwt.verify(header.split(' ')[1], JWT_SECRET); } catch { return null; }
    }

    try {
      if (apiPath === '/login' && req.method === 'POST') {
        const body = await parseBody(req);
        if (!body.password) return json(res, 400, { error: 'Password required' });

        const match = await bcrypt.compare(body.password, hash);
        if (!match) return json(res, 401, { error: 'Invalid password' });
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
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

      return json(res, 404, { error: 'Not found' });
    } catch (e) {
      return json(res, 500, { error: e.message });
    }
  }

  // Serve static files from dist/
  const distDir = join(process.cwd(), 'dist');
  const requestPath = path === '/' ? '/index.html' : path;
  const filePath = join(distDir, requestPath);

  if (filePath.startsWith(distDir)) {
    try {
      if (statSync(filePath).isFile()) {
        const content = readFileSync(filePath);
        const ext = extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
        return;
      }
    } catch {}
  }

  // SPA fallback — serve index.html for all non-file routes
  try {
    const indexPath = join(distDir, 'index.html');
    const content = readFileSync(indexPath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  } catch (e) {
    json(res, 404, { error: 'Not found: ' + e.message });
  }
}
