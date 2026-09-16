import React, { useEffect, useRef } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const FaqSection = ({
  label = 'Questions, answered',
  title = 'What founders ask first.',
  items = [],
  schema = true,
  className = '',
}) => {
  const scriptRef = useRef(null);

  useEffect(() => {
    if (!schema || !items.length) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": items.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    });
    document.head.appendChild(script);
    scriptRef.current = script;
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, [items, schema]);

  return (
    <section className={`bg-canvas py-[100px] md:py-[120px] ${className}`}>
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl mb-12">
          {label && <span className="text-label-xs text-mute uppercase tracking-wider">{label}</span>}
          <h2 className="font-display text-display-md text-ink mt-2 leading-none">{title}</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-t border-hairline-soft"
            >
              <AccordionTrigger className="text-left py-6 px-2 hover:no-underline group cursor-pointer [&[data-state=open]>svg]:rotate-180">
                <span className="text-heading-md text-ink pr-8 group-hover:text-mute transition-colors">{item.q}</span>
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-6">
                <p className="text-body-md text-mute leading-relaxed max-w-3xl">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
          <div className="border-t border-hairline-soft" />
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
