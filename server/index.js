import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'tgb-change-this-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'growthbench2024';

const DATA_DIR = join(__dirname, 'data');
const POSTS_FILE = join(DATA_DIR, 'posts.json');
const CTAS_FILE = join(DATA_DIR, 'ctas.json');

if (!existsSync(DATA_DIR)) {
  import('fs').then(fs => fs.mkdirSync(DATA_DIR, { recursive: true }));
}

const readJSON = (file, fallback) => {
  try {
    if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf-8'));
  } catch {}
  return fallback;
};

const writeJSON = (file, data) => {
  writeFileSync(file, JSON.stringify(data, null, 2));
};

app.use(cors());
app.use(express.json());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
});

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    req.user = jwt.verify(header.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

app.post('/api/login', loginLimiter, async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });
  const match = await bcrypt.compare(password, hash);
  if (!match) return res.status(401).json({ error: 'Invalid password' });
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

app.get('/api/posts', authMiddleware, (req, res) => {
  const posts = readJSON(POSTS_FILE, []);
  res.json(posts);
});

app.put('/api/posts', authMiddleware, (req, res) => {
  const posts = req.body;
  if (!Array.isArray(posts)) return res.status(400).json({ error: 'Expected array' });
  writeJSON(POSTS_FILE, posts);
  res.json({ success: true });
});

app.get('/api/ctas', authMiddleware, (req, res) => {
  const ctas = readJSON(CTAS_FILE, {});
  res.json(ctas);
});

app.put('/api/ctas', authMiddleware, (req, res) => {
  const ctas = req.body;
  writeJSON(CTAS_FILE, ctas);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
