import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/PageMeta';
import { WHATSAPP_URL } from '@/lib/constants';

const Privacy = () => {
  return (
    <>
      <PageMeta />
      <section className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site max-w-3xl mx-auto">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-caption-sm text-mute mb-6">
            <Link to="/" className="hover:text-ink transition-colors no-underline text-mute">Home</Link>
            <span className="text-mute">/</span>
            <span className="text-ink font-medium">Privacy Policy</span>
          </nav>
          <span className="text-label-xs text-mute uppercase tracking-wider">Legal</span>
          <h1 className="font-display text-heading-xl md:text-display-md text-ink mt-2 mb-3 leading-none">Privacy Policy</h1>
          <p className="text-caption-sm text-mute mb-10">Last updated: September 2026</p>

          <div className="text-body-md text-mute leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-heading-lg [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-heading-md [&_h3]:text-ink [&_h3]:mt-6 [&_h3]:mb-3 [&_a]:text-ink [&_a]:underline [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1">
            <h2>1. Who We Are</h2>
            <p>The Growth Bench is a growth consultancy operating from India. For any privacy-related questions, reach us at <a href="mailto:saswatasg@gmail.com">saswatasg@gmail.com</a> or <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>

            <h2>2. Information We Collect</h2>
            <h3>Information you provide</h3>
            <ul>
              <li>Contact form data: name, email, company name, challenge description</li>
              <li>Scorecard responses: business metrics, revenue band, funnel health answers</li>
              <li>Communication data: emails, WhatsApp messages, call notes</li>
              <li>Booking data: name, email, and scheduling preferences via Google Calendar</li>
            </ul>
            <h3>Information collected automatically</h3>
            <ul>
              <li>Server logs: IP address, browser type, pages visited, referral source</li>
              <li>Google Fonts requests: your IP address is transmitted to Google's servers as part of the standard font-loading request</li>
            </ul>
            <p>We do not use cookies, tracking pixels, or analytics tools on this website.</p>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>Respond to enquiries and prepare for audit calls</li>
              <li>Deliver scorecard results and follow up on engagement interest</li>
              <li>Communicate about potential or active service engagements</li>
              <li>Improve our website and services</li>
            </ul>
            <p>We do not sell, rent, or trade your personal data to third parties.</p>

            <h2>4. Data Sharing</h2>
            <p>We share data only with trusted service providers necessary to operate our business:</p>
            <ul>
              <li><strong>Web3Forms</strong> — form processing and lead capture</li>
              <li><strong>Google Workspace</strong> — email communications</li>
              <li><strong>Google Calendar</strong> — booking and scheduling</li>
              <li><strong>WhatsApp (Meta)</strong> — business messaging</li>
            </ul>
            <p>These providers have their own privacy policies. We share only the minimum data necessary for each service.</p>

            <h2>5. Data Retention</h2>
            <ul>
              <li><strong>Contact form data:</strong> deleted within 12 months if no service relationship is established</li>
              <li><strong>Scorecard data:</strong> retained indefinitely in anonymised form for aggregate analysis</li>
              <li><strong>Client engagement data:</strong> retained for the duration of the engagement plus 3 years for legal and tax purposes</li>
              <li><strong>Server logs:</strong> rotated automatically, typically retained for 30 days</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>This website does not use cookies. We do not set first-party or third-party cookies, tracking pixels, or fingerprinting scripts. A cookie consent banner is displayed as a precaution and to comply with evolving regulations, but no cookies are actually set by this website.</p>

            <h2>7. Data Security</h2>
            <p>We take reasonable measures to protect your data:</p>
            <ul>
              <li>HTTPS encryption for all website traffic</li>
              <li>Access restricted to authorised team members only</li>
              <li>No payment data is collected or stored on this website</li>
              <li>Third-party services (Web3Forms, Google) maintain their own security certifications</li>
            </ul>
            <p>No method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but take reasonable steps to protect your information.</p>

            <h2>8. Your Rights</h2>
            <p>Under applicable data protection laws (including India's Digital Personal Data Protection Act, 2023), you may:</p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Request data portability</li>
            </ul>
            <p>To exercise these rights, email <a href="mailto:saswatasg@gmail.com">saswatasg@gmail.com</a>. We will respond within 30 days.</p>

            <h2>9. Third-Party Links</h2>
            <p>Our website contains links to external sites (Google Calendar, WhatsApp, social media platforms). We are not responsible for the privacy practices of these sites. We encourage you to read their privacy policies.</p>

            <h2>10. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the website after changes constitutes acceptance of the updated policy.</p>

            <h2>11. Contact</h2>
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

export default Privacy;
