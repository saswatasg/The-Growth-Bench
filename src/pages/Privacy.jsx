import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';

const Privacy = () => {
  return (
    <>
      <PageMeta />
      <section className="bg-canvas py-section-lg">
        <div className="container-site max-w-3xl mx-auto">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-caption-sm text-mute mb-6">
            <Link to="/" className="hover:text-ink transition-colors no-underline text-mute">Home</Link>
            <span className="text-mute">/</span>
            <span className="text-ink font-medium">Privacy Policy</span>
          </nav>
          <span className="text-label-xs text-mute uppercase tracking-wider">Legal</span>
          <h1 className="font-display text-display-md text-ink mt-2 mb-3 leading-none">Privacy Policy</h1>
          <p className="text-caption-sm text-mute mb-10">Last updated: May 2026</p>

          <div className="text-body-md text-mute leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-heading-lg [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-4 [&_a]:text-ink [&_a]:underline [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
            <h2>1. Who We Are</h2>
            <p>The Growth Bench is a growth consultancy founded by Saswata Sengupta, operating from India. For any privacy-related questions, reach us at <a href="mailto:hi@saswatasg.com">hi@saswatasg.com</a>.</p>

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
            <p>You may request access, rectification, erasure, restriction, or portability of your data by emailing <a href="mailto:hi@saswatasg.com">hi@saswatasg.com</a>. We will respond within 30 days.</p>

            <h2>8. Contact</h2>
            <p>Email: <a href="mailto:hi@saswatasg.com">hi@saswatasg.com</a> | WhatsApp: +91 8777875140</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
