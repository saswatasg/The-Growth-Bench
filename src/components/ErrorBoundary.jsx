import React from 'react';
import { Link } from 'react-router-dom';

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
        <section className="section-light pt-32 pb-24">
          <div className="container-site text-center">
            <h1 className="mb-4">Something went wrong</h1>
            <p className="text-body mb-8 max-w-md mx-auto">
              We encountered an unexpected error. Please try refreshing the page, or{' '}
              <a href="mailto:hello@thegrowthbench.com" className="text-primary underline">contact us</a> if the problem persists.
            </p>
            <Link to="/" className="btn-primary no-underline">Go Home</Link>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;