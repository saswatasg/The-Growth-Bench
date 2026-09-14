import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';

const Privacy = () => {
  return (
    <>
      <PageMeta />
      <section className="bg-canvas dark:bg-ink py-section-lg">
        <div className="container-site max-w-3xl mx-auto">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-caption-sm text-mute dark:text-stone mb-6">
            <Link to="/" className="hover:text-ink dark:hover:text-canvas transition-colors no-underline text-mute dark:text-stone">Home</Link>
            <span className="text-mute dark:text-stone">/</span>
            <span className="text-ink dark:text-canvas font-medium">Privacy Policy</span>
          </nav>
          <span className="text-label-xs text-mute dark:text-stone uppercase tracking-wider">Legal</span>
          <h1 className="font-display text-display-md text-ink dark:text-canvas mt-2 mb-3 leading-none">Privacy Policy</h1>
          <p className="text-caption-sm text-mute dark:text-stone mb-10">Last updated: May 2026</p>

          <div className="text-body-md text-mute dark:text-stone leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-heading-lg [&_h2]:text-ink [&_h2]:dark:text-canvas [&_h2]:mt-10 [&_h2]:mb-4 [&_a]:text-ink [&_a]:dark:text-accent [&_a]:underline [&_strong]:text-ink [&_strong]:dark:text-canvas [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
            <h2>1. Who We Are</h2>
            <p>The Growth Bench is a growth consultancy founded by Saswata Sengupta, operating from India. For any privacy-related questions, reach us at <a href="mailto:hello@thegrowthbench.com">hello@thegrowthbench.com</a>.</p>

            <h2>2. Information We Collect</h2>
            <p>We collect only information you voluntarily provide: contact form data (name, email, company, challenge description), communication data (emails, WhatsApp messages), and booking data (via Google Calendar).</p>

            <h2>3. How We Use Your Information</h2>
            <p>To respond to enquiries, prepare for audit calls, and communicate about potential engagement. We do not sell, rent, or trade your personal data.</p>

            <h2>4. Data Sharing</h2>
            <p>We share data only with trusted third-party service providers: Web3Forms (form processing), Google Workspace (email), Google Calendar (bookings).</p>

            <h2>5. Data Retention</h2>
            <p>We retain your data as long as necessary to respond to your enquiry. If we do not enter into a service relationship, we delete your contact form data within 12 months.</p>

            <h2>6. Cookies</h2>
            <p>This website does not use cookies, tracking scripts, or analytics tools. Google Fonts are loaded from Google's servers, which may transmit your IP address as part of the standard HTTP request.</p>

            <h2>7. Your Rights</h2>
            <p>You may request access, rectification, erasure, restriction, or portability of your data by emailing <a href="mailto:hello@thegrowthbench.com">hello@thegrowthbench.com</a>. We will respond within 30 days.</p>

            <h2>8. Contact</h2>
            <p>Email: <a href="mailto:hello@thegrowthbench.com">hello@thegrowthbench.com</a> | WhatsApp: +91 9836312162</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
