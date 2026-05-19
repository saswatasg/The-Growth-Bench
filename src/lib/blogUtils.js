import { blogPosts as defaultPosts } from '@/content/blog';

const STORAGE_KEY = 'tgb_blog_posts';
const CTAS_KEY = 'tgb_blog_ctas';

export const defaultCTAs = {
  midArticle: {
    text: 'Want this applied to your brand?',
    button: "Book a free audit call",
    note: "or chat with us on WhatsApp"
  },
  bottomCTA: {
    text: 'Ready to put these insights to work?',
    button: "Book a Free Audit Call",
    secondary: "Chat on WhatsApp"
  }
};

export const loadPosts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return defaultPosts;
};

export const loadCTAs = () => {
  try {
    const saved = localStorage.getItem(CTAS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { ...defaultCTAs };
};
