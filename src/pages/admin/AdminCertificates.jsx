import React from 'react';
import { motion } from 'framer-motion';
import { Search, Award, XCircle, Download, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import { listCertificates, issueCertificate, revokeCertificate, listEnrollments, listAuditLog, addAuditLog, exportCertificatesCSV } from '@/lib/supabase';
import { generateCertId, formatINR } from '@/lib/training';
import { fadeUp } from '@/lib/motion';

const AdminCertificates = () => {
  const [tab, setTab] = React.useState('enrollments'); // enrollments | certificates | audit
  const [enrollments, setEnrollments] = React.useState([]);
  const [certificates, setCertificates] = React.useState([]);
  const [auditLog, setAuditLog] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === 'enrollments') {
        const { data } = await listEnrollments({ limit: 100 });
        setEnrollments(data || []);
      } else if (tab === 'certificates') {
        const { data } = await listCertificates({ limit: 100 });
        setCertificates(data || []);
      } else {
        const data = await listAuditLog({ limit: 100 });
        setAuditLog(data || []);
      }
    } catch (e) {
      console.warn('Load failed (mock mode):', e);
    }
    setLoading(false);
  };

  const handleIssueCert = async (rosterEntry, enrollment) => {
    const certId = generateCertId();
    try {
      await issueCertificate({
        cert_id: certId,
        roster_id: rosterEntry.id,
        enrollment_id: enrollment.id,
        candidate_name: rosterEntry.participant_name,
        company_name: enrollment.company_name,
        completion_date: new Date().toISOString().split('T')[0],
        issued_by: 'admin',
      });
      await addAuditLog({
        cert_id: certId,
        action: 'issued',
        performed_by: 'admin',
        details: { candidate: rosterEntry.participant_name, company: enrollment.company_name },
      });
      loadData();
    } catch (e) {
      console.warn('Issue failed (mock mode):', e);
    }
  };

  const handleRevoke = async (certId) => {
    if (!confirm('Revoke this certificate? This cannot be undone.')) return;
    try {
      await revokeCertificate(certId, 'admin');
      await addAuditLog({ cert_id: certId, action: 'revoked', performed_by: 'admin', details: {} });
      loadData();
    } catch (e) {
      console.warn('Revoke failed (mock mode):', e);
    }
  };

  const handleExportCSV = async () => {
    try {
      const csv = await exportCertificatesCSV();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificates.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn('Export failed:', e);
    }
  };

  const filteredCertificates = certificates.filter(c =>
    !search || c.candidate_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.company_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.cert_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageMeta />

      <section className="bg-canvas py-[48px] md:py-[80px]">
        <div className="container-site">
          <div className="mb-8">
            <span className="text-label-xs text-mute uppercase tracking-wider">Admin</span>
            <h1 className="font-display text-heading-xl text-ink mt-2 leading-none">Certificate Management</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 border-b border-hairline-soft">
            {[
              { key: 'enrollments', label: 'Enrollments', icon: Users },
              { key: 'certificates', label: 'Certificates', icon: Award },
              { key: 'audit', label: 'Audit Log', icon: Search },
            ].map(t => {
              const Icon = t.icon;
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-body-sm font-medium border-b-2 transition-colors ${
                    tab === t.key ? 'border-ink text-ink' : 'border-transparent text-mute hover:text-ink'
                  }`}>
                  <Icon className="w-4 h-4" /> {t.label}
                </button>
              );
            })}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-hairline-soft border-t-ink rounded-full animate-spin" />
            </div>
          )}

          {/* Enrollments tab */}
          {tab === 'enrollments' && (
            <div>
              {enrollments.length === 0 ? (
                <p className="text-body-md text-mute py-12 text-center">No enrollments yet.</p>
              ) : (
                <div className="space-y-4">
                  {enrollments.map(e => (
                    <div key={e.id} className="p-6 bg-soft-cloud border border-hairline-soft">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-heading-md text-ink">{e.company_name}</h3>
                          <p className="text-body-sm text-mute mt-1">{e.contact_person} · {e.contact_email}</p>
                          <p className="text-body-sm text-mute">{e.seat_count} seats · {formatINR(e.total_paise)} · {e.preferred_delivery}</p>
                        </div>
                        <span className="text-label-xs text-success uppercase">{e.status}</span>
                      </div>
                      {e.roster?.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-hairline-soft">
                          <p className="text-label-xs text-mute uppercase tracking-wider mb-2">Roster</p>
                          <div className="grid grid-cols-2 gap-2">
                            {e.roster.map(r => (
                              <div key={r.id} className="flex items-center justify-between text-body-sm">
                                <span className="text-ink">{r.participant_name} <span className="text-mute">({r.email})</span></span>
                                <button onClick={() => handleIssueCert(r, e)}
                                  aria-label={`Issue certificate to ${r.participant_name}`}
                                  className="text-caption-sm text-ink hover:text-mute transition-colors ml-2 px-2 py-1">
                                  Issue cert
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Certificates tab */}
          {tab === 'certificates' && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 max-w-md">
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, company, or ID..."
                    className="w-full px-4 py-2 text-body-sm bg-soft-cloud border border-hairline-soft focus:outline-none focus:border-ink transition-colors" />
                </div>
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="w-4 h-4 mr-2" /> Export CSV
                </Button>
              </div>

              {filteredCertificates.length === 0 ? (
                <p className="text-body-md text-mute py-12 text-center">No certificates found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-body-sm">
                    <thead>
                      <tr className="border-b border-hairline-soft text-left">
                        <th className="py-3 pr-4 text-label-xs text-mute uppercase">ID</th>
                        <th className="py-3 pr-4 text-label-xs text-mute uppercase">Name</th>
                        <th className="py-3 pr-4 text-label-xs text-mute uppercase">Company</th>
                        <th className="py-3 pr-4 text-label-xs text-mute uppercase">Date</th>
                        <th className="py-3 pr-4 text-label-xs text-mute uppercase">Status</th>
                        <th className="py-3 text-label-xs text-mute uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCertificates.map(c => (
                        <tr key={c.cert_id} className="border-b border-hairline-soft">
                          <td className="py-3 pr-4 font-mono text-ink">{c.cert_id}</td>
                          <td className="py-3 pr-4 text-ink">{c.candidate_name}</td>
                          <td className="py-3 pr-4 text-mute">{c.company_name}</td>
                          <td className="py-3 pr-4 text-mute">{c.completion_date}</td>
                          <td className="py-3 pr-4">
                            <span className={`text-label-xs uppercase ${c.status === 'active' ? 'text-success' : 'text-sale'}`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3">
                            {c.status === 'active' && (
                              <button onClick={() => handleRevoke(c.cert_id)}
                                className="text-caption-sm text-sale hover:text-ink transition-colors">
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Audit log tab */}
          {tab === 'audit' && (
            <div>
              {auditLog.length === 0 ? (
                <p className="text-body-md text-mute py-12 text-center">No audit entries yet.</p>
              ) : (
                <div className="space-y-2">
                  {auditLog.map(entry => (
                    <div key={entry.id} className="flex items-center gap-4 text-body-sm py-3 border-b border-hairline-soft">
                      <span className="text-mute w-48">{new Date(entry.created_at).toLocaleString()}</span>
                      <span className={`text-label-xs uppercase w-16 ${entry.action === 'revoked' ? 'text-sale' : 'text-success'}`}>{entry.action}</span>
                      <span className="font-mono text-ink">{entry.cert_id}</span>
                      <span className="text-mute">by {entry.performed_by}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminCertificates;
