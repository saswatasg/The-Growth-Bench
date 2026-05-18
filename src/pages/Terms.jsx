import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';

const Terms = () => {
  return (
    <>
      <PageMeta />

      <section className="section-light pt-32 pb-24">
        <div className="container-site max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium" aria-current="page">Terms of Service</span>
            </nav>
            <div className="section-eyebrow">LEGAL</div>
            <h1 className="mb-8">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-12">Last updated: May 2025</p>

            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-dark prose-p:text-body prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <h2>1. Introduction</h2>
              <p>
                These Terms of Service ("Terms") govern your use of the website{' '}
                <a href="https://thegrowthbench.com">thegrowthbench.com</a> (the "Site") 
                and the services provided by The Growth Bench ("we", "our", "us"). 
                By using our Site or submitting an enquiry through our contact form, 
                you agree to these Terms.
              </p>

              <h2>2. Services Description</h2>
              <p>
                The Growth Bench provides growth consulting services including but not limited to: 
                growth strategy, performance marketing (Google Ads, Meta Ads), conversion rate 
                optimisation (CRO), website design and development, lead system setup, UI/UX design, 
                and marketing strategy. The specific scope of services is defined in a separate 
                engagement agreement for each client.
              </p>

              <h2>3. Enquiries and Free Audit Call</h2>
              <p>
                The initial 30-minute audit call is offered free of charge with no obligation. 
                During this call, we will review your current setup and provide our assessment. 
                Any recommendations made during the audit call are preliminary and based on the 
                information provided during the call. They do not constitute a binding proposal or guarantee of results.
              </p>

              <h2>4. Client Obligations</h2>
              <p>If we enter into an engagement, you agree to:</p>
              <ul>
                <li>Provide accurate and complete information about your business</li>
                <li>Grant necessary access to your platforms, analytics, and advertising accounts</li>
                <li>Respond to communications in a timely manner</li>
                <li>Provide feedback and approvals as needed for project progression</li>
                <li>Make timely payments as per the agreed payment schedule</li>
              </ul>

              <h2>5. Intellectual Property</h2>
              <p>
                All intellectual property rights in the deliverables created specifically for you 
                during an engagement (including strategy documents, ad creatives, website designs, 
                and reports) are transferred to you upon full payment. We retain the right to 
                display completed work in our portfolio and case studies unless otherwise agreed 
                in writing.
              </p>
              <p>
                We retain ownership of our proprietary methodologies, frameworks, tools, and 
                pre-existing intellectual property used in delivering our services.
              </p>

              <h2>6. Confidentiality</h2>
              <p>
                We treat all client information as confidential and will not share it with third 
                parties except as necessary to deliver our services or as required by law. 
                This includes business data, revenue figures, campaign performance data, and 
                any other proprietary information shared during our engagement.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                The Growth Bench provides services on a best-efforts basis. While we are committed 
                to delivering results, we cannot guarantee specific outcomes (including but not 
                limited to ROAS targets, revenue growth, or conversion rates) as these depend on 
                numerous factors outside our control, including market conditions, competition, 
                and client execution.
              </p>
              <p>
                Our total liability for any claim arising from our services is limited to the 
                amount paid by you for the specific service giving rise to the claim. We are not 
                liable for any indirect, incidental, or consequential damages.
              </p>

              <h2>8. Payment Terms</h2>
              <p>
                Payment terms are specified in the engagement agreement for each client. 
                We offer a 7-day free trial for eligible engagements. If you choose to discontinue 
                within the trial period, you are not charged. Standard payment terms include 
                monthly retainers and project-based pricing as agreed in writing.
              </p>

              <h2>9. Termination</h2>
              <p>
                Either party may terminate an engagement with 30 days' written notice. 
                In case of termination, you will be billed for services rendered up to the 
                termination date. Any unpaid invoices remain due after termination.
              </p>

              <h2>10. No Guarantee of Results</h2>
              <p>
                While we share case studies and testimonials of past results, these represent 
                specific outcomes achieved with specific clients under specific circumstances. 
                They are not guarantees of future results. Every business is different, and 
                actual results will vary based on numerous factors.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes arising from these 
                Terms or our services shall be subject to the exclusive jurisdiction of the courts 
                in India.
              </p>

              <h2>12. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms at any time. Changes will be posted 
                on this page with an updated "Last updated" date. Continued use of our Site 
                or services after changes constitutes acceptance of the new Terms.
              </p>

              <h2>13. Contact</h2>
              <p>
                For questions about these Terms, contact us at{' '}
                <a href="mailto:hello@thegrowthbench.com">hello@thegrowthbench.com</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Terms;
