import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('@/pages/Home'));
const Services = React.lazy(() => import('@/pages/Services'));
const About = React.lazy(() => import('@/pages/About'));
const CaseStudies = React.lazy(() => import('@/pages/CaseStudies'));
const Insights = React.lazy(() => import('@/pages/Insights'));
const BlogPost = React.lazy(() => import('@/pages/BlogPost'));
const WorkWithUs = React.lazy(() => import('@/pages/WorkWithUs'));
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
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/past-projects" element={<CaseStudies />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<BlogPost />} />
        <Route path="/work-with-us" element={<WorkWithUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesConfig;
