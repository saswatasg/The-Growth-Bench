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

// Generate beautiful certificate HTML — inspired by Google/AWS/Coursera patterns
export function generateCertificateHTML(data) {
  const scoreDisplay = data.score ? `${data.score}%` : '—';
  const logoUrl = 'https://www.thegrowthbench.com/assets/The_Growth_Bench_Final_Logo_PNG_Pack/02_stacked_logo_black_transparent.png';
  
  return `
    <div style="width: 1056px; height: 816px; background: #F8F7F4; font-family: 'Inter', -apple-system, sans-serif; position: relative; overflow: hidden;">
      <!-- Subtle border -->
      <div style="position: absolute; inset: 8px; border: 1px solid rgba(0,0,0,0.08); pointer-events: none;" />
      
      <!-- Content container -->
      <div style="padding: 48px 64px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative;">
        
        <!-- Logo -->
        <div style="margin-bottom: 20px;">
          <img src="${logoUrl}" alt="The Growth Bench" style="height: 48px; width: auto;" />
        </div>

        <!-- Certificate type -->
        <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #9CA3AF; margin-bottom: 24px; font-weight: 500;">Certificate of Completion</p>

        <!-- Recipient name -->
        <h1 style="font-family: 'Inter', sans-serif; font-size: 36px; font-weight: 700; color: #111; margin: 0 0 8px; line-height: 1.2; letter-spacing: -0.02em;">${data.candidateName}</h1>
        
        <!-- Company -->
        <p style="font-size: 14px; color: #6B7280; margin-bottom: 20px;">${data.companyName}</p>

        <!-- Linking text -->
        <p style="font-size: 13px; color: #9CA3AF; margin-bottom: 6px;">has successfully completed</p>

        <!-- Course name -->
        <h2 style="font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 600; color: #111; margin: 0 0 24px; letter-spacing: -0.01em;">${data.courseName}</h2>

        <!-- Score badge -->
        <div style="display: inline-flex; align-items: center; gap: 16px; background: #111; color: #fff; padding: 10px 28px; margin-bottom: 32px;">
          <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.6);">Score</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 700; line-height: 1;">${scoreDisplay}</span>
        </div>

        <!-- Meta row -->
        <div style="display: flex; gap: 40px; margin-bottom: 32px;">
          <div style="text-align: center;">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9CA3AF; margin-bottom: 4px;">Issued</p>
            <p style="font-size: 13px; color: #111; font-weight: 500;">${data.completionDate}</p>
          </div>
          <div style="width: 1px; background: #E5E5E5;" />
          <div style="text-align: center;">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9CA3AF; margin-bottom: 4px;">Credential ID</p>
            <p style="font-size: 13px; color: #111; font-family: 'JetBrains Mono', monospace; font-weight: 500;">${data.certId}</p>
          </div>
          <div style="width: 1px; background: #E5E5E5;" />
          <div style="text-align: center;">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9CA3AF; margin-bottom: 4px;">Verify</p>
            <p style="font-size: 11px; color: #6B7280; max-width: 160px; word-break: break-all;">thegrowthbench.com/verify</p>
          </div>
        </div>

        <!-- Signature -->
        <div style="margin-top: auto; display: flex; align-items: flex-end; gap: 48px; width: 100%; max-width: 500px; justify-content: center;">
          <div style="text-align: center;">
            <div style="border-bottom: 1px solid #111; width: 140px; margin-bottom: 6px;" />
            <p style="font-size: 12px; color: #111; font-weight: 500;">Saswata Sengupta</p>
            <p style="font-size: 10px; color: #9CA3AF;">Founder, The Growth Bench</p>
          </div>
        </div>

        <!-- Disclosure -->
        <p style="font-size: 9px; color: #C4C4C4; margin-top: 16px; letter-spacing: 0.5px;">
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

    ctx.fillStyle = '#F8F7F4';
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
        const htmlBlob = new Blob([`<!DOCTYPE html><html><head><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');</style></head><body>${html}</body></html>`], { type: 'text/html' });
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
