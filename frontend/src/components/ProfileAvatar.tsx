import { useState } from 'react';
import { User } from 'lucide-react';

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  fullName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isDarkMode?: boolean;
}

const ProfileAvatar = ({ avatarUrl, fullName, size = 'md', className = '', isDarkMode = false }: ProfileAvatarProps) => {
  const [imageError, setImageError] = useState(false);

  // Get first letter of name for fallback
  const getInitial = () => {
    if (!fullName) return '?';
    return fullName.charAt(0).toUpperCase();
  };

  // Generate consistent color based on the first letter
  const getColorFromInitial = () => {
    const initial = getInitial();
    const colors = [
      { bg: 'bg-red-500', text: 'text-white' },
      { bg: 'bg-orange-500', text: 'text-white' },
      { bg: 'bg-amber-500', text: 'text-white' },
      { bg: 'bg-yellow-500', text: 'text-gray-900' },
      { bg: 'bg-lime-500', text: 'text-gray-900' },
      { bg: 'bg-green-500', text: 'text-white' },
      { bg: 'bg-emerald-500', text: 'text-white' },
      { bg: 'bg-teal-500', text: 'text-white' },
      { bg: 'bg-cyan-500', text: 'text-gray-900' },
      { bg: 'bg-sky-500', text: 'text-white' },
      { bg: 'bg-blue-500', text: 'text-white' },
      { bg: 'bg-indigo-500', text: 'text-white' },
      { bg: 'bg-violet-500', text: 'text-white' },
      { bg: 'bg-purple-500', text: 'text-white' },
      { bg: 'bg-fuchsia-500', text: 'text-white' },
      { bg: 'bg-pink-500', text: 'text-white' },
      { bg: 'bg-rose-500', text: 'text-white' },
    ];
    
    // Use char code to get consistent index
    const charCode = initial.charCodeAt(0);
    const index = charCode % colors.length;
    return colors[index];
  };

  const avatarColor = getColorFromInitial();

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

  // If we have an avatar URL and it hasn't errored, show the image
  if (avatarUrl && !imageError) {
    return (
      <img
        src={avatarUrl}
        alt={fullName || 'Profile'}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
        onError={() => setImageError(true)}
      />
    );
  }

  // Fallback to initial if image failed or no avatarUrl but we have fullName
  if (fullName) {
    return (
      <div className={`${sizeClasses[size]} rounded-full ${avatarColor.bg} flex items-center justify-center ${avatarColor.text} font-semibold ${className}`}>
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