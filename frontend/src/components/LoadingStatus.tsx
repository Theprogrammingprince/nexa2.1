import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Loader2 } from 'lucide-react';

interface LoadingStatusProps {
  isLoading: boolean;
  message?: string;
}

const loadingMessages = [
  "Hang on a bit... 🚀",
  "Almost there... ⏳",
  "Getting your data ready... 📦",
  "Just a moment... ✨",
  "Loading your content... 📚",
  "Fetching the good stuff... 🎯",
  "Don't fret, we're getting what you want... 💪",
  "Your data is on its way... 🛤️",
  "Preparing something awesome... 🌟",
  "Hold tight, magic is happening... ✨",
];

const slowNetworkMessages = [
  "Your network seems a bit slow... 🐌",
  "Taking longer than usual... 🕐",
  "Still working on it... ⏰",
  "Network's being sluggish, but we got you... 🔄",
  "Patience is a virtue... we're almost done! 🙏",
];

const LoadingStatus = ({ isLoading, message }: LoadingStatusProps) => {
  const { isDarkMode } = useTheme();
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsSlowNetwork(false);
      return;
    }

    // Change message every 3 seconds
    let messageIdx = 0;
    const messageInterval = setInterval(() => {
      messageIdx = (messageIdx + 1) % loadingMessages.length;
      setCurrentMessage(loadingMessages[messageIdx]);
    }, 3000);

    // Show slow network message after 5 seconds
    const slowNetworkTimeout = setTimeout(() => {
      setIsSlowNetwork(true);
      setCurrentMessage(slowNetworkMessages[0]);
      
      // Cycle through slow network messages
      let slowIndex = 0;
      const slowInterval = setInterval(() => {
        slowIndex = (slowIndex + 1) % slowNetworkMessages.length;
        setCurrentMessage(slowNetworkMessages[slowIndex]);
      }, 4000);

      return () => clearInterval(slowInterval);
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(slowNetworkTimeout);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {/* Animated Spinner */}
      <div className="relative">
        <Loader2 
          className={`w-12 h-12 animate-spin ${
            isSlowNetwork ? 'text-orange-500' : 'text-primary-600'
          }`} 
        />
        {isSlowNetwork && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
        )}
      </div>

      {/* Loading Message */}
      <div className="text-center space-y-2">
        <p 
          className={`text-lg font-medium transition-all duration-500 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-900'
          }`}
          key={currentMessage}
          style={{
            animation: 'fadeInUp 0.5s ease-out',
          }}
        >
          {message || currentMessage}
        </p>
        
        {isSlowNetwork && (
          <p 
            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            style={{
              animation: 'fadeIn 0.5s ease-out',
            }}
          >
            This is taking longer than expected, but we're still on it!
          </p>
        )}
      </div>

      {/* Progress Dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              isSlowNetwork ? 'bg-orange-500' : 'bg-primary-600'
            }`}
            style={{
              animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingStatus;
