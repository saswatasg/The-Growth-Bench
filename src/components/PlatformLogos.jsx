import React from 'react';

const CDN = 'https://cdn.simpleicons.org';

const platforms = [
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Meta Ads', slug: 'meta' },
  { name: 'Google Ads', slug: 'googleads' },
  { name: 'Amazon', slug: 'amazon' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Webflow', slug: 'webflow' },
  { name: 'Figma', slug: 'figma' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'GA4', slug: 'googleanalytics' },
  { name: 'WhatsApp', slug: 'whatsapp' },
  { name: 'Instagram', slug: 'instagram' },
  { name: 'Zoho', slug: 'zoho' },
  { name: 'Klaviyo', slug: 'klaviyo' },
  { name: 'Mailchimp', slug: 'mailchimp' },
  { name: 'Hotjar', slug: 'hotjar' },
];

export default function PlatformLogos() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
      {platforms.map((p) => (
        <img
          key={p.slug}
          src={`${CDN}/${p.slug}/707072`}
          alt={p.name}
          title={p.name}
          className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300"
          loading="lazy"
        />
      ))}
    </div>
  );
}
