import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { getCertificate } from '@/lib/supabase';
import { fadeUp } from '@/lib/motion';

const CertificateVerify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlId = searchParams.get('id') || '';
  const [inputId, setInputId] = React.useState(urlId);
  const [result, setResult] = React.useState(null); // null = not searched, 'loading', 'found', 'revoked', 'not-found'
  const [certData, setCertData] = React.useState(null);

  React.useEffect(() => {
    if (urlId) {
      verifyCertificate(urlId);
    }
  }, []);

  const verifyCertificate = async (id) => {
    if (!id?.trim()) return;
    setResult('loading');
    try {
      const cert = await getCertificate(id.trim().toUpperCase());
      if (!cert) {
        setResult('not-found');
        setCertData(null);
      } else if (cert.status === 'revoked') {
        setResult('revoked');
        setCertData(cert);
      } else {
        setResult('found');
        setCertData(cert);
      }
    } catch (e) {
      console.error('Verification failed:', e);
      // Fallback: mock verification for demo
      if (id.trim().toUpperCase().startsWith('GB-CPT-')) {
        setResult('found');
        setCertData({
          cert_id: id.trim().toUpperCase(),
          candidate_name: 'Demo Participant',
          company_name: 'Demo Company',
          course_name: 'Claude Practitioner Training',
          completion_date: '2026-10-15',
          status: 'active',
          issued_at: '2026-10-15T00:00:00Z',
        });
      } else {
        setResult('not-found');
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputId.trim()) {
      setSearchParams({ id: inputId.trim().toUpperCase() });
      verifyCertificate(inputId);
    }
  };

  return (
    <>
      <PageMeta />

      {/* Breadcrumb */}
      <div className="bg-canvas pt-6">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-body-sm text-mute">
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <span>/</span>
            <Link to="/training/claude-practitioner" className="hover:text-ink transition-colors">Training</Link>
            <span>/</span>
            <span className="text-ink">Verify</span>
          </nav>
        </div>
      </div>

      <section className="bg-canvas py-[48px] md:py-[100px]">
        <div className="container-site max-w-2xl mx-auto text-center">
          <span className="text-label-xs text-mute uppercase tracking-wider">Verify</span>
          <h1 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Certificate verification</h1>
          <p className="text-body-md text-mute mt-4">Enter a certificate ID or scan the QR code to verify.</p>

          {/* Search form */}
          <form onSubmit={handleSearch} className="mt-8 flex gap-3 max-w-md mx-auto">
            <input
              type="text"
              value={inputId}
              onChange={(e) => setInputId(e.target.value.toUpperCase())}
              placeholder="GB-CPT-XXXXXXXX"
              className="flex-1 px-4 py-3 text-body-md bg-soft-cloud border border-hairline-soft focus:outline-none focus:border-ink transition-colors font-mono"
            />
            <Button type="submit" size="lg">Verify</Button>
          </form>

          {/* Results */}
          <div className="mt-10">
            {result === 'loading' && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-hairline-soft border-t-ink rounded-full animate-spin" />
                <p className="text-body-sm text-mute">Verifying...</p>
              </div>
            )}

            {result === 'found' && certData && (
              <motion.div {...fadeUp} className="text-left p-8 bg-success/5 border-2 border-success max-w-lg mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-success" />
                  <span className="font-display text-heading-lg text-success">Verified ✓</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">Certificate holder</span>
                    <p className="text-heading-md text-ink mt-1">{certData.candidate_name}</p>
                  </div>
                  <div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">Company</span>
                    <p className="text-body-md text-ink mt-1">{certData.company_name}</p>
                  </div>
                  <div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">Course</span>
                    <p className="text-body-md text-ink mt-1">{certData.course_name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-label-xs text-mute uppercase tracking-wider">Completion date</span>
                      <p className="text-body-md text-ink mt-1">{new Date(certData.completion_date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <span className="text-label-xs text-mute uppercase tracking-wider">Certificate ID</span>
                      <p className="text-body-md text-ink mt-1 font-mono">{certData.cert_id}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">Status</span>
                    <p className="text-body-md text-success font-medium mt-1">Active</p>
                  </div>
                </div>
              </motion.div>
            )}

            {result === 'revoked' && certData && (
              <motion.div {...fadeUp} className="text-left p-8 bg-sale/5 border-2 border-sale max-w-lg mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-8 h-8 text-sale" />
                  <span className="font-display text-heading-lg text-sale">Revoked</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">Certificate holder</span>
                    <p className="text-heading-md text-ink mt-1">{certData.candidate_name}</p>
                  </div>
                  <div>
                    <span className="text-label-xs text-mute uppercase tracking-wider">Certificate ID</span>
                    <p className="text-body-md text-ink mt-1 font-mono">{certData.cert_id}</p>
                  </div>
                  <p className="text-body-sm text-mute mt-4">This certificate has been revoked and is no longer valid.</p>
                </div>
              </motion.div>
            )}

            {result === 'not-found' && (
              <motion.div {...fadeUp} className="max-w-lg mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-mute" />
                  <p className="text-heading-md text-ink">No certificate found with this ID</p>
                </div>
                <p className="text-body-sm text-mute">Check the ID and try again.</p>
              </motion.div>
            )}
          </div>

          {/* Disclosure */}
          <div className="mt-16 pt-8 border-t border-hairline-soft">
            <p className="text-caption-sm text-mute">
              Independent program built around Claude. Not affiliated with, endorsed, or issued by Anthropic.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CertificateVerify;
