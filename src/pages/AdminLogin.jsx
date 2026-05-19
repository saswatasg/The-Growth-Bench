import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

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
    <section className="section-light min-h-screen flex items-center justify-center pt-16">
      <div className="container-site">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-center mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">Enter the admin password to manage blog content.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="input w-full text-center text-lg"
            />
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? 'Verifying...' : 'Sign In'} <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminLogin;