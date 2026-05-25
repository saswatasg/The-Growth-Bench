import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';

const NotFound = () => {
  return (
    <>
      <PageMeta title="404 - Page Not Found | The Growth Bench" description="The page you are looking for does not exist or has been moved." noindex={true} />
      <section className="bg-canvas">
        <div className="container-site min-h-[70vh] flex flex-col items-center justify-center py-16 text-center">
          <h1 className="font-display text-display-xl text-hairline leading-none mb-6">404</h1>
          <h2 className="font-display text-display-md text-ink mb-4">Page Not Found</h2>
          <p className="text-body-md text-mute max-w-md mb-8">
            The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
          <Button asChild size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default NotFound;
