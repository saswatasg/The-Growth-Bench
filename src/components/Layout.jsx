import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PreFooterCTA from '@/components/PreFooterCTA';

const HIDE_PREFOOTER = ['/get-started', '/training/claude-practitioner', '/training/claude-practitioner/enroll', '/training/claude-practitioner/verify', '/training/claude-practitioner/assessment'];

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      {!HIDE_PREFOOTER.includes(pathname) && <PreFooterCTA />}
      <Footer />
    </div>
  );
};

export default Layout;
