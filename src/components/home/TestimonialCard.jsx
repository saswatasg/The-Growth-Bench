import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-3xl text-primary/20 font-serif leading-none mb-2">&ldquo;</div>
        <p className="text-[14px] text-foreground/80 leading-relaxed italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border/20">
        <img src={testimonial.image} alt={testimonial.alt} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
        <div>
          <div className="text-[13px] font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-[12px] text-muted-foreground">{testimonial.title}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
