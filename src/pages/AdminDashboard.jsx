import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Save, Eye, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { defaultCTAs, loadPosts as loadPostsFromStorage, loadCTAs as loadCTAsFromStorage } from '@/lib/blogUtils';
import { fetchPosts, savePosts as apiSavePosts, fetchCTAs, saveCTAs as apiSaveCTAs } from '@/lib/api';

const STORAGE_KEY = 'tgb_blog_posts';
const SAVED_CTAS_KEY = 'tgb_blog_ctas';

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
    const load = async () => {
      try {
        const apiPosts = await fetchPosts();
        if (apiPosts && apiPosts.length) {
          setPosts(apiPosts);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(apiPosts));
        } else {
          setPosts(loadPostsFromStorage());
        }
      } catch {
        setPosts(loadPostsFromStorage());
      }
      try {
        const apiCtas = await fetchCTAs();
        if (apiCtas && apiCtas.midArticle) {
          setCtas(apiCtas);
          localStorage.setItem(SAVED_CTAS_KEY, JSON.stringify(apiCtas));
        } else {
          setCtas(loadCTAsFromStorage());
        }
      } catch {
        setCtas(loadCTAsFromStorage());
      }
    };
    load();
  }, []);

  const saveAll = async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    localStorage.setItem(SAVED_CTAS_KEY, JSON.stringify(ctas));
    try {
      await apiSavePosts(posts);
      await apiSaveCTAs(ctas);
    } catch {}
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

  const inputClass = "w-full px-3 py-2 text-body-sm text-ink bg-canvas border border-hairline-soft rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40";
  const labelClass = "text-caption-sm font-medium text-mute uppercase tracking-wider mb-1 block";

  return (
    <>
      <PageMeta title="Admin Dashboard | The Growth Bench" description="Blog content management." noindex={true} />
    <section className="bg-canvas min-h-screen pt-20">
      <div className="container-site">
        <div className="flex items-center justify-between mb-8 pt-4">
          <div>
            <h1 className="font-display text-heading-xl md:text-display-md text-ink mb-1">Blog Admin</h1>
            <p className="text-body-sm text-mute">Manage blog posts, CTAs, and page meta.</p>
          </div>
          <div className="flex items-center gap-3">
            {dirty && <span className="text-caption-sm text-sale font-medium">Unsaved changes</span>}
            {saveMsg && <span className="text-caption-sm text-success font-medium">{saveMsg}</span>}
            <Button size="sm" onClick={saveAll}>
              <Save className="w-4 h-4 mr-1" /> Save All
            </Button>
            <button onClick={handleLogout} className="text-body-sm text-mute hover:text-ink flex items-center gap-1 p-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        <div className="flex gap-0 border-b border-hairline-soft mb-6">
          <button onClick={() => setActiveTab('posts')} className={'px-4 py-2 text-body-sm font-medium border-b-2 transition-colors ' + (activeTab === 'posts' ? 'border-ink text-ink' : 'border-transparent text-mute hover:text-ink')}>Blog Posts</button>
          <button onClick={() => setActiveTab('ctas')} className={'px-4 py-2 text-body-sm font-medium border-b-2 transition-colors ' + (activeTab === 'ctas' ? 'border-ink text-ink' : 'border-transparent text-mute hover:text-ink')}>CTAs & Site Settings</button>
        </div>

        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
            <div className="space-y-2">
              <button onClick={addPost} className="w-full text-body-sm font-medium py-2 px-3 rounded-lg border border-dashed border-hairline-soft text-ink hover:bg-soft-cloud transition-colors flex items-center gap-2 justify-center">
                <Plus className="w-4 h-4" /> New Post
              </button>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                {posts.map(p => (
                  <button key={p.slug} onClick={() => setActiveSlug(p.slug)} className={'w-full text-left text-body-sm py-2 px-3 rounded-lg transition-colors ' + (activeSlug === p.slug ? 'bg-soft-cloud text-ink font-medium' : 'hover:bg-soft-cloud text-mute')}>
                    <div className="truncate font-medium">{p.title}</div>
                    <div className="text-caption-sm opacity-60 truncate">{p.category} \u00B7 {p.date}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              {activePost ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-heading-lg font-display text-ink">Editing: {activePost.title}</h2>
                    <button onClick={() => deletePost(activePost.slug)} aria-label="Delete post" className="text-mute hover:text-sale p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Title</label>
                      <input value={activePost.title} onChange={e => updatePost(activePost.slug, 'title', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Slug</label>
                      <input value={activePost.slug} onChange={e => updatePost(activePost.slug, 'slug', e.target.value)} className={inputClass + " font-mono"} />
                    </div>
                    <div>
                      <label className={labelClass}>Category</label>
                      <select value={activePost.category} onChange={e => updatePost(activePost.slug, 'category', e.target.value)} className={inputClass}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Read Time (min)</label>
                      <input type="number" value={activePost.readTime} onChange={e => updatePost(activePost.slug, 'readTime', parseInt(e.target.value) || 1)} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Meta Description</label>
                    <textarea value={activePost.description} onChange={e => updatePost(activePost.slug, 'description', e.target.value)} rows={2} className={inputClass + " resize-none"} />
                  </div>

                  <div>
                    <label className={labelClass}>Body (Markdown)</label>
                    <textarea value={activePost.body} onChange={e => updatePost(activePost.slug, 'body', e.target.value)} rows={16} className={inputClass + " resize-none font-mono text-body-sm"} />
                  </div>

                  <div>
                    <label className={labelClass}>OG Image Path</label>
                    <input value={activePost.image || ''} onChange={e => updatePost(activePost.slug, 'image', e.target.value)} className={inputClass + " font-mono"} placeholder="/assets/images/og-card.png" />
                  </div>

                  <div className="border-t border-hairline-soft pt-4">
                    <h3 className="text-body-sm font-display font-semibold mb-3">FAQ (JSON array)</h3>
                    <textarea value={JSON.stringify(activePost.faq || [], null, 2)} onChange={e => {
                      try { const v = JSON.parse(e.target.value); updatePost(activePost.slug, 'faq', v); } catch {}
                    }} rows={6} className={inputClass + " resize-none font-mono text-caption-sm"} />
                    <p className="text-caption-sm text-mute mt-1">Array of {'{'}q{'}'} and {'{'}a{'}'} objects. Must be valid JSON.</p>
                  </div>

                  <div className="border-t border-hairline-soft pt-4 flex gap-2">
                    <a href={'/resources/' + activePost.slug} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-body-sm text-mute hover:text-ink no-underline"><Eye className="w-4 h-4" /> Preview</a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-mute">
                  <p className="text-body-md">Select a post from the sidebar to edit it, or click New Post.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'ctas' && (
          <div className="max-w-2xl space-y-8">
            <div>
              <h2 className="text-heading-lg font-display text-ink mb-4">Mid-Article CTA</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Text</label>
                  <input value={ctas.midArticle?.text || ''} onChange={e => { setCtas(prev => ({ ...prev, midArticle: { ...prev.midArticle, text: e.target.value } })); setDirty(true); }} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Button Label</label>
                  <input value={ctas.midArticle?.button || ''} onChange={e => { setCtas(prev => ({ ...prev, midArticle: { ...prev.midArticle, button: e.target.value } })); setDirty(true); }} className={inputClass} />
                </div>
              </div>
            </div>
            <div className="border-t border-hairline-soft pt-8">
              <h2 className="text-heading-lg font-display text-ink mb-4">Bottom CTA</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Text</label>
                  <input value={ctas.bottomCTA?.text || ''} onChange={e => { setCtas(prev => ({ ...prev, bottomCTA: { ...prev.bottomCTA, text: e.target.value } })); setDirty(true); }} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Button Label</label>
                  <input value={ctas.bottomCTA?.button || ''} onChange={e => { setCtas(prev => ({ ...prev, bottomCTA: { ...prev.bottomCTA, button: e.target.value } })); setDirty(true); }} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Secondary Button Label</label>
                  <input value={ctas.bottomCTA?.secondary || ''} onChange={e => { setCtas(prev => ({ ...prev, bottomCTA: { ...prev.bottomCTA, secondary: e.target.value } })); setDirty(true); }} className={inputClass} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default AdminDashboard;
