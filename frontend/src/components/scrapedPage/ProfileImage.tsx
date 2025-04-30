import React from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.classList.add('bg-blue-100', 'flex', 'items-center', 'justify-center');
            const initials = document.createElement('span');
            initials.classList.add('text-blue-600', 'font-semibold');
            initials.textContent = alt.split(' ').map(name => name[0]).join('');
            parent.appendChild(initials);
          }
        }}
      />
    </div>
  );
};

export default ProfileImage;