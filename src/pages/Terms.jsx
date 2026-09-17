import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';
import { WHATSAPP_URL } from '@/lib/constants';

const Terms = () => {
  return (
    <>
      <PageMeta />
      <section className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site max-w-3xl mx-auto">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-caption-sm text-mute mb-6">
            <Link to="/" className="hover:text-ink transition-colors no-underline text-mute">Home</Link>
            <span className="text-mute">/</span>
            <span className="text-ink font-medium">Terms of Service</span>
          </nav>
          <span className="text-label-xs text-mute uppercase tracking-wider">Legal</span>
          <h1 className="font-display text-heading-xl md:text-display-md text-ink mt-2 mb-3 leading-none">Terms of Service</h1>
          <p className="text-caption-sm text-mute mb-10">Last updated: September 2026</p>

          <div className="text-body-md text-mute leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-heading-lg [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-heading-md [&_h3]:text-ink [&_h3]:mt-6 [&_h3]:mb-3 [&_a]:text-ink [&_a]:underline [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
            <h2>1. Introduction</h2>
            <p>These Terms of Service ("Terms") govern your use of <a href="https://www.thegrowthbench.com">thegrowthbench.com</a> ("Site") and the services provided by The Growth Bench ("we," "us," "our"). By accessing our Site or submitting an enquiry, you agree to these Terms.</p>

            <h2>2. Services</h2>
            <p>We provide growth consulting services including:</p>
            <ul>
              <li>AI Implementation (agentic automation for ops, support, content, follow-ups)</li>
              <li>Growth Strategy (funnel audit, ICP definition, 90-day roadmap)</li>
              <li>Website & Development (Next.js, Webflow, Shopify, conversion-first builds)</li>
              <li>Ads (Meta, Google, Amazon, LinkedIn — full-funnel paid media)</li>
              <li>CRO (structured experimentation, A/B testing)</li>
              <li>Lead Systems (CRM, nurture sequences, scoring)</li>
              <li>UI/UX Design (research to Figma to dev handoff)</li>
              <li>Content & Email (strategy, flows, campaigns)</li>
              <li>Analytics (GA4, GTM, attribution, dashboards)</li>
            </ul>
            <p>Specific scope, deliverables, and timelines are defined in a separate engagement agreement.</p>

            <h2>3. Free Audit Call</h2>
            <p>The initial 30-minute audit call is free with no obligation. Recommendations shared during the call are preliminary, based on information you provide, and do not constitute a binding proposal or guarantee of results.</p>

            <h2>4. Scorecards</h2>
            <p>Our AI Readiness Scorecard and Growth Audit Scorecard are free diagnostic tools. Results are automated assessments based on your inputs and should not be treated as professional advice. Actual recommendations require a full audit engagement.</p>

            <h2>5. Intellectual Property</h2>
            <ul>
              <li><strong>Client deliverables:</strong> transferred to you upon full payment for the specific engagement</li>
              <li><strong>Portfolio rights:</strong> we retain the right to display completed work in our portfolio and case studies, unless otherwise agreed in writing</li>
              <li><strong>Our methodologies:</strong> we retain ownership of proprietary frameworks, processes, and tools used to deliver services</li>
              <li><strong>Website content:</strong> all content on this Site (text, design, code) is owned by The Growth Bench and may not be reproduced without permission</li>
            </ul>

            <h2>6. Confidentiality</h2>
            <p>All client information shared during engagements is treated as confidential. We will not share your business data, strategies, or proprietary information with third parties except as necessary to deliver services (e.g., sharing ad account access with platform specialists) or as required by law.</p>

            <h2>7. Results & Guarantees</h2>
            <p>We do not guarantee specific outcomes. Growth results depend on many factors outside our control including market conditions, product quality, budget, and execution speed. Case studies and metrics on this Site represent past results and are not predictive of future performance. Individual results will vary.</p>

            <h2>8. Limitation of Liability</h2>
            <p>Services are provided on a best-efforts basis. Our total liability for any claim arising from our services is limited to the amount you paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, consequential, or punitive damages.</p>

            <h2>9. Payment & Termination</h2>
            <ul>
              <li>Payment terms (amounts, schedules, methods) are specified in the engagement agreement</li>
              <li>Either party may terminate with 30 days' written notice</li>
              <li>Upon termination, you pay for work completed up to the termination date</li>
              <li>We deliver all completed work and transfer access to your accounts upon final payment</li>
            </ul>

            <h2>10. Third-Party Services</h2>
            <p>Our services may involve third-party platforms (Google, Meta, Shopify, etc.). Your use of these platforms is subject to their own terms of service. We are not responsible for the actions, policies, or downtime of third-party platforms.</p>

            <h2>11. Website Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Site for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to our systems</li>
              <li>Copy, reproduce, or distribute Site content without permission</li>
              <li>Use automated tools to scrape or collect data from the Site</li>
            </ul>

            <h2>12. Governing Law & Disputes</h2>
            <p>These Terms are governed by the laws of India. Any disputes arising from these Terms or our services shall be resolved through good-faith negotiation first, then mediation, then binding arbitration in India.</p>

            <h2>13. Changes to These Terms</h2>
            <p>We may update these Terms from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Site after changes constitutes acceptance of the updated Terms.</p>

            <h2>14. Severability</h2>
            <p>If any provision of these Terms is found to be unenforceable, the remaining provisions remain in full force and effect.</p>

            <h2>15. Contact</h2>
            <p>
              Email: <a href="mailto:saswatasg@gmail.com">saswatasg@gmail.com</a><br />
              WhatsApp: <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">+91 9836312162</a>
            </p>

            <div className="mt-8 pt-6 border-t border-hairline-soft">
              <Link to="/get-started" className="text-body-sm text-ink underline underline-offset-2 hover:text-mute transition-colors">Get started with a free audit call →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;
