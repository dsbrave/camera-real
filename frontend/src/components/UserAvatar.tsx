import React from 'react';
import Image from 'next/image';

interface UserAvatarProps {
  photo?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function UserAvatar({ photo, name, size = 'md', className = '' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-32 h-32 text-4xl'
  };

  const hasValidPhoto = photo && photo !== "/images/default-avatar.png" && photo !== "";

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center ${className}`}>
      {hasValidPhoto ? (
        <Image 
          src={photo} 
          alt={name} 
          width={size === 'xl' ? 128 : size === 'lg' ? 48 : size === 'md' ? 40 : 32}
          height={size === 'xl' ? 128 : size === 'lg' ? 48 : size === 'md' ? 40 : 32}
          className="w-full h-full object-cover" 
        />
      ) : (
        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
          <span className={`text-white font-bold ${sizeClasses[size].split(' ')[2]}`}>
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
} 