import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PreFooterCTA from '@/components/PreFooterCTA';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <PreFooterCTA />
      <Footer />
    </div>
  );
};

export default Layout;
