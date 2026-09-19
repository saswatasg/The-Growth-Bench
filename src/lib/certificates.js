// Certificate ID generation and rendering utilities

import { generateCertId } from './training';

export { generateCertId };

// Certificate data structure
export function buildCertificateData(cert) {
  return {
    certId: cert.cert_id,
    candidateName: cert.candidate_name,
    companyName: cert.company_name,
    courseName: cert.course_name || 'Claude Practitioner Training',
    score: cert.score || null,
    completionDate: new Date(cert.completion_date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    issuedAt: cert.issued_at ? new Date(cert.issued_at).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) : null,
    status: cert.status,
    verifyUrl: `https://www.thegrowthbench.com/training/claude-practitioner/verify?id=${cert.cert_id}`,
  };
}

// Generate beautiful certificate HTML
export function generateCertificateHTML(data) {
  const scoreDisplay = data.score ? `${data.score}%` : '—';
  return `
    <div style="width: 1056px; height: 816px; background: #111111; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; position: relative;">
      <!-- Outer gold border -->
      <div style="position: absolute; inset: 12px; border: 2px solid #C9A84C; pointer-events: none;" />
      <!-- Inner border -->
      <div style="position: absolute; inset: 18px; border: 1px solid rgba(201,168,76,0.3); pointer-events: none;" />

      <!-- Content area -->
      <div style="background: #ffffff; margin: 24px; padding: 48px 64px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; min-height: calc(100% - 48px);">

        <!-- Logo area -->
        <div style="margin-bottom: 24px;">
          <span style="font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 4px; color: #111;">THE GROWTH BENCH</span>
        </div>

        <!-- Gold divider -->
        <div style="width: 120px; height: 2px; background: linear-gradient(90deg, transparent, #C9A84C, transparent); margin-bottom: 24px;" />

        <!-- Certificate type -->
        <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #C9A84C; margin-bottom: 20px; font-weight: 600;">Certificate of Completion</p>

        <!-- Body -->
        <p style="font-size: 14px; color: #707072; margin-bottom: 8px;">This certifies that</p>
        <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: #111; margin: 8px 0 12px; line-height: 1.1; letter-spacing: 1px;">${data.candidateName}</h1>
        <p style="font-size: 14px; color: #707072; margin-bottom: 6px;">from <strong style="color: #111;">${data.companyName}</strong></p>
        <p style="font-size: 14px; color: #707072; margin-bottom: 20px;">has successfully completed</p>
        <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #111; margin: 0 0 28px; letter-spacing: 1px;">${data.courseName}</h2>

        <!-- Score badge -->
        <div style="display: inline-flex; align-items: center; gap: 12px; background: #f5f5f5; border: 1px solid #e5e5e5; padding: 12px 24px; margin-bottom: 28px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #707072;">Assessment Score</span>
          <span style="font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: #111; line-height: 1;">${scoreDisplay}</span>
        </div>

        <!-- Meta row -->
        <div style="display: flex; gap: 48px; margin-bottom: 28px;">
          <div style="text-align: center;">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #707072; margin-bottom: 4px;">Completion Date</p>
            <p style="font-size: 13px; color: #111; font-weight: 500;">${data.completionDate}</p>
          </div>
          <div style="text-align: center;">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #707072; margin-bottom: 4px;">Certificate ID</p>
            <p style="font-size: 13px; color: #111; font-family: 'JetBrains Mono', monospace; font-weight: 500;">${data.certId}</p>
          </div>
        </div>

        <!-- Gold divider -->
        <div style="width: 120px; height: 1px; background: linear-gradient(90deg, transparent, #C9A84C, transparent); margin-bottom: 24px;" />

        <!-- QR + Signature -->
        <div style="display: flex; gap: 64px; align-items: center; margin-bottom: 20px;">
          <div style="text-align: center;">
            <div style="width: 72px; height: 72px; border: 1px solid #e5e5e5; display: flex; align-items: center; justify-content: center; margin-bottom: 6px; background: #fafafa;">
              <span style="font-size: 9px; color: #707072;">QR Code</span>
            </div>
            <p style="font-size: 9px; color: #707072; letter-spacing: 0.5px;">Scan to verify</p>
          </div>
          <div style="text-align: center;">
            <div style="border-bottom: 1px solid #111; width: 140px; margin-bottom: 6px;" />
            <p style="font-size: 12px; color: #111; font-weight: 500;">Saswata Sengupta</p>
            <p style="font-size: 10px; color: #707072;">Founder, The Growth Bench</p>
          </div>
        </div>

        <!-- Disclosure -->
        <p style="font-size: 9px; color: #999; max-width: 380px; line-height: 1.4; margin-top: auto;">
          Independent program built around Claude. Not affiliated with, endorsed, or issued by Anthropic.
        </p>
      </div>
    </div>
  `;
}

// Download certificate as PNG
export async function downloadCertificatePNG(certData) {
  const data = buildCertificateData(certData);
  const html = generateCertificateHTML(data);

  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1056;
    canvas.height = 816;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, 1056, 816);

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1056" height="816">
        <foreignObject width="1056" height="816">
          ${html}
        </foreignObject>
      </svg>
    `;

    const img = new Image();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    return new Promise((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `certificate-${data.certId}.png`;
          a.click();
          URL.revokeObjectURL(a.href);
          resolve();
        }, 'image/png');
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        const htmlBlob = new Blob([`<!DOCTYPE html><html><head><style>@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');</style></head><body>${html}</body></html>`], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(htmlBlob);
        a.download = `certificate-${data.certId}.html`;
        a.click();
        URL.revokeObjectURL(a.href);
        resolve();
      };
      img.src = url;
    });
  } finally {
    document.body.removeChild(container);
  }
}
