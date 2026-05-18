import React from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/PageMeta';

const Privacy = () => {
  return (
    <>
      <PageMeta />

      <section className="section-light pt-32 pb-24">
        <div className="container-site max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors no-underline">Home</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium" aria-current="page">Privacy Policy</span>
            </nav>
            <div className="section-eyebrow">LEGAL</div>
            <h1 className="mb-8">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-12">Last updated: May 2025</p>

            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-dark prose-p:text-body prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <h2>1. Who We Are</h2>
              <p>
                The Growth Bench ("we", "our", "us") is a growth consultancy operating from India. 
                We provide growth strategy, performance marketing, CRO, website development, and related services to D2C brands and startups. 
                Our website is <a href="https://thegrowthbench.com">thegrowthbench.com</a>.
              </p>
              <p>
                For any privacy-related questions, you can reach us at{' '}
                <a href="mailto:hello@thegrowthbench.com">hello@thegrowthbench.com</a>.
              </p>

              <h2>2. Information We Collect</h2>
              <p>We collect only the information you voluntarily provide to us:</p>
              <ul>
                <li><strong>Contact form data:</strong> When you submit the form on our Work With Us page, we collect your name, email address, company name, monthly revenue range, a description of your growth challenge, and how you found us.</li>
                <li><strong>Communication data:</strong> If you email us directly or contact us via WhatsApp, we retain the content of those communications.</li>
                <li><strong>Booking data:</strong> When you book a call via Google Calendar, Google collects the information you provide in that form. Please refer to Google's privacy policy for details.</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect solely for the following purposes:</p>
              <ul>
                <li>To respond to your enquiry and follow up regarding our services</li>
                <li>To prepare for our initial audit call and understand your business context</li>
                <li>To communicate with you about potential engagement</li>
                <li>To improve our website and service offerings based on the challenges we hear about</li>
              </ul>

              <h2>4. Legal Basis (GDPR)</h2>
              <p>If you are in the European Economic Area (EEA), our legal basis for processing your data is:</p>
              <ul>
                <li><strong>Consent:</strong> You provide data voluntarily through our contact form</li>
                <li><strong>Legitimate interest:</strong> We process your data to respond to your business enquiry and evaluate a potential service relationship</li>
              </ul>

              <h2>5. Data Sharing</h2>
              <p>We do not sell, rent, or trade your personal data. We share data only with trusted third-party service providers who help us operate our business:</p>
              <ul>
                <li><strong>Web3Forms:</strong> Our contact form submissions are processed through Web3Forms and forwarded to our email. Web3Forms acts as a data processor and does not use your data for any purpose other than forwarding your message.</li>
                <li><strong>Google Workspace (Gmail):</strong> We receive form submissions via email through Google's services.</li>
                <li><strong>Google Calendar:</strong> Bookings made through our embedded calendar widget are processed by Google.</li>
                <li><strong>WhatsApp:</strong> If you contact us via WhatsApp, your data is processed according to Meta's privacy policy.</li>
              </ul>

              <h2>6. Data Retention</h2>
              <p>We retain your information for as long as necessary to:</p>
              <ul>
                <li>Respond to your enquiry and follow up regarding potential engagement</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
              </ul>
              <p>If we do not enter into a service relationship, we delete your contact form data within 12 months of your last communication.</p>

              <h2>7. Cookies</h2>
              <p>This website does not use cookies, tracking scripts, or analytics tools. We do not collect any browsing data or behavioral information. Google Fonts are loaded from Google's servers, which may result in your IP address being transmitted to Google as part of the standard HTTP request.</p>

              <h2>8. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the data we hold about you</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your data</li>
                <li><strong>Restriction:</strong> Request限制 of processing</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
              </ul>
              <p>To exercise any of these rights, email us at <a href="mailto:hello@thegrowthbench.com">hello@thegrowthbench.com</a>. We will respond within 30 days.</p>

              <h2>9. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your data, including HTTPS encryption on our website and restricted access to form submission data.</p>

              <h2>10. Third-Party Links</h2>
              <p>Our website contains links to third-party services (Google Calendar, WhatsApp, LinkedIn). We are not responsible for the privacy practices of these services. We encourage you to review their privacy policies before providing them with your data.</p>

              <h2>11. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this page periodically.</p>

              <h2>12. Contact</h2>
              <p>For any questions about this privacy policy or our data practices, contact us at:</p>
              <ul>
                <li>Email: <a href="mailto:hello@thegrowthbench.com">hello@thegrowthbench.com</a></li>
                <li>WhatsApp: +91 8777875140</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
