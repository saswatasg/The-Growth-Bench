import React, { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from '@/components/AdminRoute';
import PageTransition from '@/components/PageTransition';

const Home = React.lazy(() => import('@/pages/Home'));
const Services = React.lazy(() => import('@/pages/Services'));
const About = React.lazy(() => import('@/pages/About'));
const Proof = React.lazy(() => import('@/pages/Proof'));
const Resources = React.lazy(() => import('@/pages/Resources'));
const GetStarted = React.lazy(() => import('@/pages/GetStarted'));
const BlogPost = React.lazy(() => import('@/pages/BlogPost'));
const CartRecovery = React.lazy(() => import('@/pages/solutions/CartRecovery'));
const AIScorecard = React.lazy(() => import('@/pages/AIScorecard'));
const GrowthScorecard = React.lazy(() => import('@/pages/GrowthScorecard'));
const Privacy = React.lazy(() => import('@/pages/Privacy'));
const Terms = React.lazy(() => import('@/pages/Terms'));
const AdminLogin = React.lazy(() => import('@/pages/AdminLogin'));
const AdminDashboard = React.lazy(() => import('@/pages/AdminDashboard'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

const PageLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] w-full gap-4">
    <div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
    <div className="w-32 h-4 rounded bg-muted animate-pulse"></div>
    <div className="w-24 h-3 rounded bg-muted animate-pulse"></div>
  </div>
);

const RoutesConfig = () => {
  return (
    <ErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <PageTransition>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/proof" element={<Proof />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:slug" element={<BlogPost />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/solutions/recover-abandoned-carts" element={<CartRecovery />} />
        <Route path="/ai-scorecard" element={<AIScorecard />} />
        <Route path="/growth-scorecard" element={<GrowthScorecard />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        {/* Redirects from old routes */}
        <Route path="/case-studies" element={<Navigate to="/proof" replace />} />
        <Route path="/compare" element={<Navigate to="/proof" replace />} />
        <Route path="/insights" element={<Navigate to="/resources" replace />} />
        <Route path="/insights/:slug" element={<Navigate to="/resources" replace />} />
        <Route path="/pricing" element={<Navigate to="/get-started" replace />} />
        <Route path="/work-with-us" element={<Navigate to="/get-started" replace />} />
        <Route path="/past-projects" element={<Navigate to="/proof" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </PageTransition>
    </Suspense>
    </ErrorBoundary>
  );
};

export default RoutesConfig;
