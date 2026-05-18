import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }) => {
  React.useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-grow flex flex-col pt-16">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
