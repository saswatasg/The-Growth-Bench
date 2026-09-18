import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/PageMeta';
import PricingStepper from '@/components/training/PricingStepper';
import RosterTable from '@/components/training/RosterTable';
import { calculatePricing, validateDiscountCode, validateRoster, createOrder, formatINR, MAX_SELF_SERVE_SEATS } from '@/lib/training';
import { createEnrollment, createRosterEntries } from '@/lib/supabase';
import { fadeUp } from '@/lib/motion';

const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'];
const DELIVERY_OPTIONS = ['Virtual', 'On-site', 'Either'];

const TrainingEnroll = () => {
  const [seatCount, setSeatCount] = React.useState(1);
  const [discountCode, setDiscountCode] = React.useState('');
  const [discountError, setDiscountError] = React.useState('');
  const [rosterErrors, setRosterErrors] = React.useState([]);
  const [formErrors, setFormErrors] = React.useState({});
  const [consent, setConsent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [orderResult, setOrderResult] = React.useState(null);

  const [form, setForm] = React.useState({
    companyName: '', contactPerson: '', contactEmail: '', contactPhone: '',
    companySize: '', preferredDelivery: 'virtual',
  });
  const [roster, setRoster] = React.useState([{ name: '', email: '' }]);

  // Sync roster rows with seat count
  React.useEffect(() => {
    if (roster.length < seatCount) {
      const extra = Array.from({ length: seatCount - roster.length }, () => ({ name: '', email: '' }));
      setRoster([...roster, ...extra]);
    } else if (roster.length > seatCount) {
      setRoster(roster.slice(0, seatCount));
    }
  }, [seatCount]);

  const pricing = calculatePricing(seatCount, discountCode);
  const isBulk = seatCount > MAX_SELF_SERVE_SEATS;

  const handleDiscount = (code) => {
    const result = validateDiscountCode(code, seatCount);
    if (result.valid) {
      setDiscountCode(result.code);
      setDiscountError('');
    } else {
      setDiscountError(result.error);
      setDiscountCode('');
    }
  };

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validate company form
    const errors = {};
    if (!form.companyName?.trim()) errors.companyName = 'Company name is required';
    if (!form.contactPerson?.trim()) errors.contactPerson = 'Contact person is required';
    if (!form.contactEmail?.trim()) errors.contactEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) errors.contactEmail = 'Invalid email';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Validate roster
    const rosterErrs = validateRoster(roster);
    setRosterErrors(rosterErrs);
    if (rosterErrs.length > 0) return;

    if (!consent) {
      setRosterErrors([{ row: -1, field: 'consent', message: 'You must confirm consent to proceed' }]);
      return;
    }

    setSubmitting(true);
    try {
      const order = await createOrder({
        ...form,
        seatCount,
        discountCode,
        discount: pricing.discount,
        total: pricing.total,
        roster,
      });

      // Store in Supabase
      try {
        const enrollment = await createEnrollment({
          company_name: form.companyName,
          contact_person: form.contactPerson,
          contact_email: form.contactEmail,
          contact_phone: form.contactPhone,
          company_size: form.companySize,
          preferred_delivery: form.preferredDelivery,
          seat_count: seatCount,
          discount_code: discountCode || null,
          discount_amount_paise: pricing.discount,
          total_paise: pricing.total,
          status: 'confirmed',
        });

        await createRosterEntries(roster.filter(r => r.name && r.email).map(r => ({
          enrollment_id: enrollment.id,
          participant_name: r.name,
          email: r.email,
          consent_given: true,
        })));
      } catch (e) {
        console.warn('Supabase storage failed (mock mode):', e);
      }

      setOrderResult(order);
    } catch (e) {
      console.error('Order failed:', e);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderResult) {
    return (
      <>
        <PageMeta />
        <section className="bg-canvas py-[60px] md:py-[120px]">
          <div className="container-site max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h1 className="font-display text-heading-xl md:text-display-md text-ink leading-none">Enrollment confirmed</h1>
            <p className="text-body-lg text-mute mt-4">
              Thank you, {orderResult.contactPerson}. Your team of {orderResult.seatCount} is enrolled.
            </p>
            <div className="mt-8 p-6 bg-soft-cloud border border-hairline-soft text-left">
              <div className="grid grid-cols-2 gap-4 text-body-sm">
                <div><span className="text-mute">Order ID</span><p className="text-ink font-medium">{orderResult.orderId}</p></div>
                <div><span className="text-mute">Company</span><p className="text-ink font-medium">{orderResult.companyName}</p></div>
                <div><span className="text-mute">Seats</span><p className="text-ink font-medium">{orderResult.seatCount}</p></div>
                <div><span className="text-mute">Total</span><p className="text-ink font-medium">{formatINR(orderResult.total)}</p></div>
              </div>
            </div>
            <p className="text-body-sm text-mute mt-6">A confirmation email is on its way to {orderResult.contactEmail}.</p>

            <div className="mt-8 p-6 bg-canvas border border-hairline-soft text-left">
              <h3 className="text-heading-md text-ink mb-4">What happens next</h3>
              <ul className="space-y-3 text-body-sm text-mute">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                  You'll receive a calendar invite within 24 hours with session links and materials.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                  Each participant will get an email with their assessment link after Day 3.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0 mt-2" />
                  Certificates are issued automatically to participants who pass the assessment.
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/training/claude-practitioner/assessment">
                <Button size="lg">Take Assessment <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </Link>
              <Link to="/training/claude-practitioner">
                <Button variant="outline">Back to program page</Button>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageMeta />

      <section className="bg-canvas py-[60px] md:py-[100px]">
        <div className="container-site">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-body-sm text-mute mb-8">
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <span>/</span>
            <Link to="/training/claude-practitioner" className="hover:text-ink transition-colors">Training</Link>
            <span>/</span>
            <span className="text-ink">Enroll</span>
          </nav>

          <div className="max-w-2xl mb-10">
            <span className="text-label-xs text-mute uppercase tracking-wider">Enroll</span>
            <h1 className="font-display text-heading-xl md:text-display-md text-ink mt-2 leading-none">Enroll your team</h1>
            <p className="text-body-md text-mute mt-4">Claude Practitioner Training — ₹3,499 per person. Fill in your details and employee roster below.</p>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Form */}
            <div className="space-y-10">
              {/* Part A: Company details */}
              <div>
                <h2 className="text-heading-md text-ink mb-4">Company details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-body-sm text-ink mb-1 block">Company name *</label>
                    <input type="text" value={form.companyName} onChange={(e) => handleFormChange('companyName', e.target.value)}
                      className={`w-full px-3 py-2 text-body-sm bg-soft-cloud border ${formErrors.companyName ? 'border-sale' : 'border-hairline-soft'} focus:outline-none focus:border-ink transition-colors`} />
                    {formErrors.companyName && <p className="text-caption-sm text-sale mt-1">{formErrors.companyName}</p>}
                  </div>
                  <div>
                    <label className="text-body-sm text-ink mb-1 block">Contact person *</label>
                    <input type="text" value={form.contactPerson} onChange={(e) => handleFormChange('contactPerson', e.target.value)}
                      className={`w-full px-3 py-2 text-body-sm bg-soft-cloud border ${formErrors.contactPerson ? 'border-sale' : 'border-hairline-soft'} focus:outline-none focus:border-ink transition-colors`} />
                    {formErrors.contactPerson && <p className="text-caption-sm text-sale mt-1">{formErrors.contactPerson}</p>}
                  </div>
                  <div>
                    <label className="text-body-sm text-ink mb-1 block">Contact email *</label>
                    <input type="email" value={form.contactEmail} onChange={(e) => handleFormChange('contactEmail', e.target.value)}
                      className={`w-full px-3 py-2 text-body-sm bg-soft-cloud border ${formErrors.contactEmail ? 'border-sale' : 'border-hairline-soft'} focus:outline-none focus:border-ink transition-colors`} />
                    {formErrors.contactEmail && <p className="text-caption-sm text-sale mt-1">{formErrors.contactEmail}</p>}
                  </div>
                  <div>
                    <label className="text-body-sm text-ink mb-1 block">Phone</label>
                    <input type="tel" value={form.contactPhone} onChange={(e) => handleFormChange('contactPhone', e.target.value)}
                      className="w-full px-3 py-2 text-body-sm bg-soft-cloud border border-hairline-soft focus:outline-none focus:border-ink transition-colors" />
                  </div>
                  <div>
                    <label className="text-body-sm text-ink mb-1 block">Company size</label>
                    <select value={form.companySize} onChange={(e) => handleFormChange('companySize', e.target.value)}
                      className="w-full px-3 py-2 text-body-sm bg-soft-cloud border border-hairline-soft focus:outline-none focus:border-ink transition-colors">
                      <option value="">Select</option>
                      {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-body-sm text-ink mb-1 block">Preferred delivery</label>
                    <div className="flex gap-3">
                      {DELIVERY_OPTIONS.map(opt => (
                        <button key={opt} onClick={() => handleFormChange('preferredDelivery', opt.toLowerCase())}
                          className={`px-4 py-2 text-body-sm border transition-colors ${form.preferredDelivery === opt.toLowerCase()
                            ? 'bg-ink text-canvas border-ink'
                            : 'bg-canvas text-ink border-hairline-soft hover:border-ink'
                          }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Part B: Roster */}
              <div>
                <RosterTable rows={roster} setRows={setRoster} errors={rosterErrors} />
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3">
                <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-ink" />
                <label htmlFor="consent" className="text-body-sm text-mute leading-relaxed">
                  I confirm I have consent from these employees to share their name and email with The Growth Bench for training enrollment. <Link to="/privacy" className="text-ink underline">Privacy Policy</Link>
                </label>
              </div>
              {rosterErrors.find(e => e.field === 'consent') && (
                <p className="text-caption-sm text-sale">{rosterErrors.find(e => e.field === 'consent').message}</p>
              )}

              {/* Submit */}
              <div>
                {isBulk ? (
                  <a href={`mailto:hello@thegrowthbench.com?subject=Bulk training inquiry (${seatCount} seats)`}>
                    <Button size="lg" variant="outline">Contact us for bulk pricing <ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </a>
                ) : (
                  <Button size="lg" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? 'Processing...' : `Proceed to Payment — ${formatINR(pricing.total)}`}
                    {!submitting && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                )}
              </div>
            </div>

            {/* Pricing sidebar */}
            <PricingStepper
              seatCount={seatCount}
              setSeatCount={setSeatCount}
              pricing={pricing}
              onDiscountApply={handleDiscount}
              discountError={discountError}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TrainingEnroll;
