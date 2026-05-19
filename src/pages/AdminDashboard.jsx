import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Plus, Save, Eye, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { blogPosts as defaultPosts } from '@/content/blog';

const STORAGE_KEY = 'tgb_blog_posts';
const SAVED_CTAS_KEY = 'tgb_blog_ctas';

const defaultCTAs = {
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

const loadPosts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return JSON.parse(JSON.stringify(defaultPosts));
};

const loadCTAs = () => {
  try {
    const saved = localStorage.getItem(SAVED_CTAS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return JSON.parse(JSON.stringify(defaultCTAs));
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [ctas, setCtas] = useState({});
  const [activeSlug, setActiveSlug] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [dirty, setDirty] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    setPosts(loadPosts());
    setCtas(loadCTAs());
  }, []);

  const saveAll = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    localStorage.setItem(SAVED_CTAS_KEY, JSON.stringify(ctas));
    setDirty(false);
    setSaveMsg('Saved.');
    setTimeout(() => setSaveMsg(''), 2000);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const updatePost = (slug, field, value) => {
    setPosts(prev => prev.map(p => p.slug === slug ? { ...p, [field]: value } : p));
    setDirty(true);
  };

  const addPost = () => {
    const slug = 'new-post-' + Date.now();
    const newPost = {
      slug,
      title: 'Untitled Post',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      category: 'Growth Strategy',
      image: '/assets/images/og-growth-strategy.svg',
      readTime: 5,
      description: '',
      body: '',
      faq: []
    };
    const updated = [...posts, newPost];
    setPosts(updated);
    setActiveSlug(slug);
    setDirty(true);
  };

  const deletePost = (slug) => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    setPosts(prev => prev.filter(p => p.slug !== slug));
    if (activeSlug === slug) setActiveSlug(null);
    setDirty(true);
  };

  const activePost = posts.find(p => p.slug === activeSlug);

  const categories = ['Growth Strategy', 'CRO', 'Google Ads', 'Meta Ads', 'Lead Systems', 'UI/UX', 'Website Dev', 'Marketing Strategy'];

  return (
    <section className="section-light min-h-screen pt-20">
      <div className="container-site">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <div>
            <h1 className="mb-1">Blog Admin</h1>
            <p className="text-sm text-muted-foreground">Manage blog posts, CTAs, and page meta.</p>
          </div>
          <div className="flex items-center gap-3">
            {dirty && <span className="text-xs text-amber-600 font-medium">Unsaved changes</span>}
            {saveMsg && <span className="text-xs text-green-600 font-medium">{saveMsg}</span>}
            <button onClick={saveAll} className="btn-primary text-sm py-2 px-4 inline-flex items-center gap-1">
              <Save className="w-4 h-4" /> Save All
            </button>
            <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 p-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-6">
          <button onClick={() => setActiveTab('posts')} className={'px-4 py-2 text-sm font-medium border-b-2 transition-colors ' + (activeTab === 'posts' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>Blog Posts</button>
          <button onClick={() => setActiveTab('ctas')} className={'px-4 py-2 text-sm font-medium border-b-2 transition-colors ' + (activeTab === 'ctas' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>CTAs & Site Settings</button>
        </div>

        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar */}
            <div className="space-y-2">
              <button onClick={addPost} className="w-full text-sm font-medium py-2 px-3 rounded-lg border border-dashed border-border text-primary hover:bg-primary-light transition-colors flex items-center gap-2 justify-center">
                <Plus className="w-4 h-4" /> New Post
              </button>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                {posts.map(p => (
                  <button key={p.slug} onClick={() => setActiveSlug(p.slug)} className={'w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ' + (activeSlug === p.slug ? 'bg-primary-light text-primary font-medium' : 'hover:bg-surface-off text-muted-foreground')}>
                    <div className="truncate font-medium">{p.title}</div>
                    <div className="text-xs opacity-60 truncate">{p.category} \u00B7 {p.date}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Editor */}
            <div>
              {activePost ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-display font-bold">Editing: {activePost.title}</h2>
                    <button onClick={() => deletePost(activePost.slug)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Title</label>
                      <input value={activePost.title} onChange={e => updatePost(activePost.slug, 'title', e.target.value)} className="input w-full" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Slug</label>
                      <input value={activePost.slug} onChange={e => updatePost(activePost.slug, 'slug', e.target.value)} className="input w-full text-sm font-mono" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Category</label>
                      <select value={activePost.category} onChange={e => updatePost(activePost.slug, 'category', e.target.value)} className="input w-full">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Read Time (min)</label>
                      <input type="number" value={activePost.readTime} onChange={e => updatePost(activePost.slug, 'readTime', parseInt(e.target.value) || 1)} className="input w-full" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Meta Description</label>
                    <textarea value={activePost.description} onChange={e => updatePost(activePost.slug, 'description', e.target.value)} rows={2} className="input w-full resize-none" />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Body (Markdown)</label>
                    <textarea value={activePost.body} onChange={e => updatePost(activePost.slug, 'body', e.target.value)} rows={16} className="input w-full resize-none font-mono text-sm" />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">OG Image Path</label>
                    <input value={activePost.image || ''} onChange={e => updatePost(activePost.slug, 'image', e.target.value)} className="input w-full text-sm font-mono" placeholder="/assets/images/og-card.svg" />
                  </div>

                  <div className="border-t border-border pt-4">
                    <h3 className="text-sm font-display font-semibold mb-3">FAQ (JSON array)</h3>
                    <textarea value={JSON.stringify(activePost.faq || [], null, 2)} onChange={e => {
                      try { const v = JSON.parse(e.target.value); updatePost(activePost.slug, 'faq', v); } catch {}
                    }} rows={6} className="input w-full resize-none font-mono text-xs" />
                    <p className="text-[10px] text-muted-foreground mt-1">Array of { }q{ } and { }a{ } objects. Must be valid JSON.</p>
                  </div>

                  <div className="border-t border-border pt-4 flex gap-2">
                    <a href={'/insights/' + activePost.slug} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm inline-flex items-center gap-1 no-underline"><Eye className="w-4 h-4" /> Preview</a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-muted-foreground">
                  <p>Select a post from the sidebar to edit it, or click { }New Post.{ }</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'ctas' && (
          <div className="max-w-2xl space-y-8">
            <div>
              <h2 className="text-lg font-display font-bold mb-4">Mid-Article CTA</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Text</label>
                  <input value={ctas.midArticle?.text || ''} onChange={e => { setCtas(prev => ({ ...prev, midArticle: { ...prev.midArticle, text: e.target.value } })); setDirty(true); }} className="input w-full" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Button Label</label>
                  <input value={ctas.midArticle?.button || ''} onChange={e => { setCtas(prev => ({ ...prev, midArticle: { ...prev.midArticle, button: e.target.value } })); setDirty(true); }} className="input w-full" />
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-8">
              <h2 className="text-lg font-display font-bold mb-4">Bottom CTA</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Text</label>
                  <input value={ctas.bottomCTA?.text || ''} onChange={e => { setCtas(prev => ({ ...prev, bottomCTA: { ...prev.bottomCTA, text: e.target.value } })); setDirty(true); }} className="input w-full" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Button Label</label>
                  <input value={ctas.bottomCTA?.button || ''} onChange={e => { setCtas(prev => ({ ...prev, bottomCTA: { ...prev.bottomCTA, button: e.target.value } })); setDirty(true); }} className="input w-full" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Secondary Button Label</label>
                  <input value={ctas.bottomCTA?.secondary || ''} onChange={e => { setCtas(prev => ({ ...prev, bottomCTA: { ...prev.bottomCTA, secondary: e.target.value } })); setDirty(true); }} className="input w-full" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;