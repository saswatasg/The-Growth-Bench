// Razorpay client-side utilities
// key_id is safe to expose — it's a public identifier used by Checkout.js
// key_secret NEVER leaves the server

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
const API_URL = import.meta.env.VITE_API_URL || '';

// Load Razorpay Checkout.js script dynamically (singleton)
let razorpayPromise = null;

export function loadRazorpayScript() {
  if (razorpayPromise) return razorpayPromise;

  razorpayPromise = new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
      } else {
        razorpayPromise = null;
        reject(new Error('Razorpay loaded but window.Razorpay not found'));
      }
    };
    script.onerror = () => {
      razorpayPromise = null;
      reject(new Error('Failed to load Razorpay Checkout.js'));
    };
    document.body.appendChild(script);
  });

  return razorpayPromise;
}

// Create order via server
export async function createRazorpayOrder({ seatCount, discountCode }) {
  const res = await fetch(`${API_URL}/api/razorpay/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seatCount, discountCode: discountCode || '' }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create order');
  }

  return res.json(); // { orderId, amount, currency }
}

// Verify payment via server
export async function verifyRazorpayPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  const res = await fetch(`${API_URL}/api/razorpay/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Payment verification failed');
  }

  return res.json(); // { verified: true, paymentId }
}

// Open Razorpay checkout popup
export function openRazorpayCheckout({ orderId, amount, currency, contactPerson, contactEmail, contactPhone }) {
  return new Promise((resolve, reject) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount,
      currency,
      name: 'The Growth Bench',
      description: 'Claude Practitioner Training',
      order_id: orderId,
      handler: (response) => resolve(response),
      prefill: {
        name: contactPerson || '',
        email: contactEmail || '',
        contact: contactPhone || '',
      },
      theme: {
        color: '#111111',
      },
      modal: {
        ondismiss: () => reject(new Error('PAYMENT_CANCELLED')),
        confirm_close: true,
      },
      retry: {
        enabled: true,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      reject(new Error(response.error?.description || 'Payment failed'));
    });
    rzp.open();
  });
}
