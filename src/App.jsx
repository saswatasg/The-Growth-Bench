import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { AuthProvider } from '@/context/AuthContext';
import { BookingModalProvider } from '@/context/BookingModalContext';
import Layout from '@/components/Layout';
import RoutesConfig from '@/config/RoutesConfig';
import ScrollToTop from '@/components/ScrollToTop';
import Preloader from '@/components/Preloader';
import CookieConsent from '@/components/CookieConsent';
import ExitIntent from '@/components/ExitIntent';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
      <AuthProvider>
        <BookingModalProvider>
        <ScrollToTop />
        <Preloader />
        <Layout>
          <RoutesConfig />
        </Layout>
        <CookieConsent />
        <ExitIntent />
        <StickyMobileCTA />
        <Toaster />
        </BookingModalProvider>
      </AuthProvider>
      </MotionConfig>
    </HelmetProvider>
  );
}

export default App;
