import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';

const NotFound = () => {
  return (
    <>
      <PageMeta 
        title="404 - Page Not Found | The Growth Bench" 
        description="The page you are looking for does not exist or has been moved."
        noindex={true}
      />
      <section className="section-off">
        <div className="container-site min-h-[70vh] flex flex-col items-center justify-center py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
              <FileQuestion className="w-12 h-12" />
            </div>
            <h1 className="mb-4">Page Not Found</h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
            </p>
            <Button asChild size="lg" variant="default">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
