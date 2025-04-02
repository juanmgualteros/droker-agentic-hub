'use client';

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
};

export function UserAvatar({ name, size = 'md', className = '' }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div 
      className={`${sizeMap[size]} flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold ${className}`}
    >
      {initials}
    </div>
  );
} 