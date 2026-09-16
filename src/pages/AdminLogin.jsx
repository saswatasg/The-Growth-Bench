import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) { setError('Enter password'); return; }
    setLoading(true);
    const ok = await login(password);
    setLoading(false);
    if (ok) navigate('/admin'); else setError('Incorrect password');
  };

  return (
    <>
      <PageMeta title="Admin | The Growth Bench" description="Admin sign-in." noindex={true} />
    <section className="bg-canvas min-h-screen flex items-center justify-center pt-16">
      <div className="container-site">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-full bg-soft-cloud flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-ink" />
          </div>
          <h1 className="font-display text-heading-xl md:text-display-md text-ink text-center mb-2">Admin Access</h1>
          <p className="text-body-sm text-mute text-center mb-8">Enter the admin password to manage blog content.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-3 text-body-md text-ink bg-canvas border border-hairline-soft rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 text-center"
              aria-label="Password"
            />
            {error && <p className="text-body-sm text-sale text-center">{error}</p>}
            <Button type="submit" size="lg" disabled={loading} className="w-full justify-center">
              {loading ? 'Verifying...' : 'Sign In'} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default AdminLogin;
