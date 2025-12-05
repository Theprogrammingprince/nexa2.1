import { User } from 'lucide-react';

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  fullName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const ProfileAvatar = ({ avatarUrl, fullName, size = 'md', className = '' }: ProfileAvatarProps) => {
  // Get first letter of name for fallback
  const getInitial = () => {
    if (!fullName) return '?';
    return fullName.charAt(0).toUpperCase();
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={fullName || 'Profile'}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
        onError={(e) => {
          // Fallback to initial if image fails to load
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML = `<div class="${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold ${className}">${getInitial()}</div>`;
          }
        }}
      />
    );
  }

  // Fallback to initial
  if (fullName) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold ${className}`}>
        {getInitial()}
      </div>
    );
  }

  // Fallback to user icon
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center ${className}`}>
      <User className={`${iconSizes[size]} text-gray-600 dark:text-gray-300`} />
    </div>
  );
};

export default ProfileAvatar;
