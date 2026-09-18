// Training business logic — pricing, discounts, validation

export const BASE_PRICE_PAISE = 349900; // ₹3,499 in paise
export const MAX_SELF_SERVE_SEATS = 8;
export const PASS_THRESHOLD = 80; // percent
export const MAX_ATTEMPTS = 2;
export const TIMER_MINUTES = 40;
export const QUESTION_COUNT = 20;

// Discount codes — hardcoded config
export const DISCOUNT_CODES = [
  { code: 'CLAUDE500', type: 'flat', value: 50000, expiresAt: null }, // ₹500 off per person (₹3,499 → ₹2,999)
];

export function validateDiscountCode(code, seatCount) {
  if (!code) return { valid: false, error: 'Enter a discount code' };
  const normalized = code.trim().toUpperCase();
  const discount = DISCOUNT_CODES.find(d => d.code === normalized);
  if (!discount) return { valid: false, error: 'Invalid discount code' };
  if (discount.expiresAt && new Date(discount.expiresAt) < new Date()) {
    return { valid: false, error: 'This code has expired' };
  }
  const subtotal = BASE_PRICE_PAISE * seatCount;
  let discountAmount = 0;
  if (discount.type === 'percent') {
    discountAmount = Math.round(subtotal * discount.value / 100);
  } else {
    discountAmount = discount.value * seatCount;
  }
  return {
    valid: true,
    code: discount.code,
    type: discount.type,
    value: discount.value,
    discountAmount,
    total: subtotal - discountAmount,
  };
}

export function calculatePricing(seatCount, discountCode) {
  const subtotal = BASE_PRICE_PAISE * seatCount;
  if (discountCode) {
    const result = validateDiscountCode(discountCode, seatCount);
    if (result.valid) {
      return { subtotal, discount: result.discountAmount, total: result.total, discountCode: result.code };
    }
  }
  return { subtotal, discount: 0, total: subtotal, discountCode: null };
}

export function formatINR(paise) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function generateCertId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I, O, 0, 1 for clarity
  let id = 'GB-CPT-';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRoster(rows) {
  const errors = [];
  const emails = new Set();
  rows.forEach((row, i) => {
    if (!row.name?.trim()) errors.push({ row: i, field: 'name', message: 'Name is required' });
    if (!row.email?.trim()) {
      errors.push({ row: i, field: 'email', message: 'Email is required' });
    } else if (!validateEmail(row.email)) {
      errors.push({ row: i, field: 'email', message: 'Invalid email format' });
    } else if (emails.has(row.email.trim().toLowerCase())) {
      errors.push({ row: i, field: 'email', message: 'Duplicate email' });
    }
    emails.add(row.email?.trim().toLowerCase());
  });
  return errors;
}

// Mock order creation — swap for Razorpay later
export async function createOrder(enrollmentData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    orderId: `TGB-${Date.now()}`,
    status: 'confirmed',
    ...enrollmentData,
    createdAt: new Date().toISOString(),
  };
}

// Web3Forms email notification
export async function sendConfirmationEmail(orderData) {
  const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_KEY'; // Replace with actual key
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New Training Enrollment: ${orderData.companyName}`,
        from_name: 'The Growth Bench Training',
        company: orderData.companyName,
        contact: orderData.contactPerson,
        email: orderData.contactEmail,
        phone: orderData.contactPhone,
        seats: orderData.seatCount,
        total: formatINR(orderData.total),
        roster: orderData.roster?.map(r => `${r.name} <${r.email}>`).join(', '),
      }),
    });
  } catch (e) {
    console.error('Email notification failed:', e);
  }
}

// Certificate issuance email
export async function sendCertificateEmail(certData) {
  const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_KEY'; // Replace with actual key
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Your Claude Practitioner Certificate — ${certData.certId}`,
        from_name: 'The Growth Bench Training',
        to: certData.email,
        candidate: certData.candidateName,
        certId: certData.certId,
        verifyUrl: `https://www.thegrowthbench.com/training/claude-practitioner/verify?id=${certData.certId}`,
      }),
    });
  } catch (e) {
    console.error('Certificate email failed:', e);
  }
}
