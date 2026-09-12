import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/context/AuthContext';
import { BookingModalProvider } from '@/context/BookingModalContext';
import Layout from '@/components/Layout';
import RoutesConfig from '@/config/RoutesConfig';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import PageMeta from '@/components/PageMeta';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BookingModalProvider>
        <ScrollToTop />
        <PageMeta />
        <Layout>
          <RoutesConfig />
        </Layout>
        <Toaster />
        </BookingModalProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
