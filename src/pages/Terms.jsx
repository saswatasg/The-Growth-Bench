import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';

const Terms = () => {
  return (
    <>
      <PageMeta />
      <section className="bg-canvas py-section-lg">
        <div className="container-site max-w-3xl mx-auto">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-caption-sm text-mute mb-6">
            <Link to="/" className="hover:text-ink transition-colors no-underline text-mute">Home</Link>
            <span className="text-mute">/</span>
            <span className="text-ink font-medium">Terms of Service</span>
          </nav>
          <span className="text-label-xs text-mute uppercase tracking-wider">Legal</span>
          <h1 className="font-display text-display-md text-ink mt-2 mb-3 leading-none">Terms of Service</h1>
          <p className="text-caption-sm text-mute mb-10">Last updated: May 2026</p>

          <div className="text-body-md text-mute leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-heading-lg [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-4 [&_a]:text-ink [&_a]:underline [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
            <h2>1. Introduction</h2>
            <p>These Terms govern your use of <a href="https://thegrowthbench.com">thegrowthbench.com</a> and the services provided by The Growth Bench. By using our Site or submitting an enquiry, you agree to these Terms.</p>

            <h2>2. Services</h2>
            <p>We provide growth consulting services including strategy, performance marketing, CRO, website development, lead systems, UI/UX design, and marketing strategy. Specific scope is defined in a separate engagement agreement.</p>

            <h2>3. Free Audit Call</h2>
            <p>The initial 30-minute audit call is free with no obligation. Recommendations are preliminary based on information provided during the call and do not constitute a binding proposal.</p>

            <h2>4. Intellectual Property</h2>
            <p>Deliverables created specifically for you are transferred upon full payment. We retain the right to display completed work in our portfolio. We retain ownership of our proprietary methodologies and frameworks.</p>

            <h2>5. Confidentiality</h2>
            <p>All client information is treated as confidential and will not be shared with third parties except as necessary to deliver services or as required by law.</p>

            <h2>6. Limitation of Liability</h2>
            <p>Services are provided on a best-efforts basis. We cannot guarantee specific outcomes. Our total liability is limited to the amount paid for the specific service giving rise to the claim.</p>

            <h2>7. Payment & Termination</h2>
            <p>Payment terms are specified in the engagement agreement. Either party may terminate with 30 days' written notice.</p>

            <h2>8. Governing Law</h2>
            <p>These Terms are governed by the laws of India.</p>

            <h2>9. Contact</h2>
            <p><a href="mailto:hi@saswatasg.com">hi@saswatasg.com</a></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;
