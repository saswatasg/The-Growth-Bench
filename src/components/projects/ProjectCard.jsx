import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const generateId = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const ProjectCard = ({ title, description, tags, result, caseStudyUrl, index }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (caseStudyUrl) {
      navigate(caseStudyUrl);
    }
  };

  const isClickable = !!caseStudyUrl;
  const cardId = generateId(title);

  return (
    <motion.div
      id={cardId}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={handleCardClick}
      className={`glass-card flex flex-col h-full transition-all duration-300 ${
        isClickable ? 'cursor-pointer group' : ''
      }`}
    >
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">{description}</p>

        {tags && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-muted text-muted-foreground text-[11px] font-medium">{tag}</span>
            ))}
          </div>
        )}

        {result && (
          <p className="text-[13px] font-semibold text-primary mb-3 pb-3 border-b border-border/20">{result}</p>
        )}

        {isClickable && (
          <div className="mt-auto pt-1 flex items-center text-primary font-medium text-[13px]">
            View case study <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
