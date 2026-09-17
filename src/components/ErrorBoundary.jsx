import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="bg-canvas pt-32 pb-24">
          <div className="container-site text-center">
            <h1 className="font-display text-heading-xl md:text-display-md text-ink mb-4">Something went wrong</h1>
            <p className="text-body-md text-mute mb-8 max-w-md mx-auto">
              We encountered an unexpected error. Please try refreshing the page, or{' '}
              <a href="mailto:saswatasg@gmail.com" className="text-ink underline">contact us</a> if the problem persists.
            </p>
            <Button size="lg" asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
