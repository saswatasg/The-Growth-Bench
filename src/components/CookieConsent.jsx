import React, { useState, useEffect } from 'react';

const KEY = 'tgb-consent';
const GA_ID = 'G-WWJB6P5LGK';

function loadGA() {
  if (document.querySelector('script[data-tgb-ga]')) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.setAttribute('data-tgb-ga', '1');
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
}

// Analytics only runs after an explicit opt-in. No banner choice = no tracking.
const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (!v) {
        setShow(true);
      } else if (v === 'accepted') {
        loadGA();
      }
    } catch {
      setShow(true);
    }
  }, []);

  const choose = (v) => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    if (v === 'accepted') loadGA();
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
      className="fixed bottom-20 inset-x-4 md:bottom-6 md:left-auto md:right-6 md:max-w-sm z-[90] bg-ink text-canvas p-5 shadow-2xl"
    >
      <p className="text-body-sm leading-relaxed">
        We measure visits to improve the site — only if you agree.
      </p>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => choose('accepted')}
          className="h-11 px-5 rounded-full bg-canvas text-ink text-button-sm font-medium hover:bg-soft-cloud transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => choose('declined')}
          className="text-caption-sm text-stone underline underline-offset-2 hover:text-canvas transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canvas/40 py-2 px-1"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
