import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/context/AuthContext';
import { BookingModalProvider } from '@/context/BookingModalContext';
import Layout from '@/components/Layout';
import RoutesConfig from '@/config/RoutesConfig';
import ScrollToTop from '@/components/ScrollToTop';
import ChatWidget from '@/components/ChatWidget';
import ParallaxShapes from '@/components/ParallaxShapes';
import CursorGlow from '@/components/CursorGlow';
import { Toaster } from '@/components/ui/sonner';
import { useGradientBackground } from '@/hooks/useGradientBackground';
import PageMeta from '@/components/PageMeta';

function App() {
  useGradientBackground();

  return (
    <HelmetProvider>
      <AuthProvider>
        <BookingModalProvider>
        <ScrollToTop />
        <PageMeta />
        <ParallaxShapes />
        <div className="noise-overlay" aria-hidden="true" />
        <CursorGlow />
        <Layout>
          <RoutesConfig />
        </Layout>
        <ChatWidget />
        <Toaster />
        </BookingModalProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
