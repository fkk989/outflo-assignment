import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface ExternalLinkProps {
  href: string;
  className?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, className = '' }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`text-gray-500 hover:text-blue-600 inline-flex items-center transition-colors duration-200 ${className}`}
    >
      <ExternalLinkIcon size={16} className="ml-1" />
    </a>
  );
};

export default ExternalLink;