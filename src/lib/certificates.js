// Certificate ID generation and PDF rendering utilities

import { generateCertId } from './training';

export { generateCertId };

// Certificate data structure for PDF generation
export function buildCertificateData(cert) {
  return {
    certId: cert.cert_id,
    candidateName: cert.candidate_name,
    companyName: cert.company_name,
    courseName: cert.course_name || 'Claude Practitioner Training',
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

// Generate certificate HTML for PDF rendering
export function generateCertificateHTML(data) {
  return `
    <div style="width: 1056px; height: 816px; padding: 64px; font-family: Inter, sans-serif; background: #fff; color: #111; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative;">
      <!-- Border -->
      <div style="position: absolute; inset: 24px; border: 2px solid #111; pointer-events: none;" />

      <!-- Logo -->
      <div style="margin-bottom: 32px;">
        <span style="font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; color: #111;">THE GROWTH BENCH</span>
      </div>

      <!-- Title -->
      <p style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #707072; margin-bottom: 16px;">Certificate of Completion</p>

      <!-- Body -->
      <p style="font-size: 16px; color: #707072; margin-bottom: 8px;">This certifies that</p>
      <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 40px; color: #111; margin: 8px 0 16px; line-height: 1.1;">${data.candidateName}</h1>
      <p style="font-size: 16px; color: #707072; margin-bottom: 8px;">from <strong style="color: #111;">${data.companyName}</strong> has successfully completed</p>
      <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #111; margin: 16px 0 32px;">${data.courseName}</h2>

      <!-- Meta -->
      <div style="display: flex; gap: 48px; margin-bottom: 32px;">
        <div style="text-align: center;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #707072; margin-bottom: 4px;">Completion Date</p>
          <p style="font-size: 14px; color: #111;">${data.completionDate}</p>
        </div>
        <div style="text-align: center;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #707072; margin-bottom: 4px;">Certificate ID</p>
          <p style="font-size: 14px; color: #111; font-family: monospace;">${data.certId}</p>
        </div>
      </div>

      <!-- QR + Signature -->
      <div style="display: flex; gap: 64px; align-items: center; margin-bottom: 32px;">
        <div style="text-align: center;">
          <div style="width: 80px; height: 80px; border: 1px solid #e5e5e5; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
            <span style="font-size: 10px; color: #707072;">QR Code</span>
          </div>
          <p style="font-size: 10px; color: #707072;">Scan to verify</p>
        </div>
        <div style="text-align: center;">
          <div style="border-bottom: 1px solid #111; width: 160px; margin-bottom: 8px;" />
          <p style="font-size: 12px; color: #707072;">Saswata Sengupta</p>
          <p style="font-size: 11px; color: #707072;">Founder, The Growth Bench</p>
        </div>
      </div>

      <!-- Disclosure -->
      <p style="font-size: 10px; color: #707072; max-width: 400px; line-height: 1.4;">
        Independent program built around Claude. Not affiliated with, endorsed, or issued by Anthropic.
      </p>
    </div>
  `;
}

// Download certificate as PNG (using html2canvas-like approach via SVG foreignObject)
export async function downloadCertificatePNG(certData) {
  const data = buildCertificateData(certData);
  const html = generateCertificateHTML(data);

  // Create a temporary container
  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);

  try {
    // Use the Canvas API to render
    const canvas = document.createElement('canvas');
    canvas.width = 1056;
    canvas.height = 816;
    const ctx = canvas.getContext('2d');

    // Draw white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1056, 816);

    // Use SVG foreignObject to render HTML to canvas
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
        // Fallback: download as HTML
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
