import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { AuthProvider } from '@/context/AuthContext';
import { BookingModalProvider } from '@/context/BookingModalContext';
import { SoundProvider } from '@/components/SoundManager';
import Layout from '@/components/Layout';
import RoutesConfig from '@/config/RoutesConfig';
import ScrollToTop from '@/components/ScrollToTop';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import CookieConsent from '@/components/CookieConsent';
import ExitIntent from '@/components/ExitIntent';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <HelmetProvider>
      <SoundProvider>
      <MotionConfig reducedMotion="user">
      <AuthProvider>
        <BookingModalProvider>
        <ScrollToTop />
        <Preloader />
        <CustomCursor />
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
      </SoundProvider>
    </HelmetProvider>
  );
}

export default App;
