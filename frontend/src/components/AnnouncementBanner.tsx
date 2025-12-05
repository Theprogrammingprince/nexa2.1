import { useState, useEffect } from 'react';
import { X, ExternalLink, Megaphone } from 'lucide-react';
import { adminExtendedAPI } from '../services/api';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'maintenance' | 'feature' | 'event' | 'urgent';
  priority: 'low' | 'normal' | 'high';
  image_url?: string;
  link_url?: string;
  link_text?: string;
}

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      console.log('📢 Fetching landing page announcements...');
      // Fetch announcements targeting landing page
      const { announcements: data } = await adminExtendedAPI.getAnnouncements('landing');
      console.log('📢 Announcements fetched:', data);
      if (data && data.length > 0) {
        setAnnouncements(data);
        console.log('✅ Set announcements:', data.length);
      } else {
        console.log('ℹ️ No announcements found for landing page');
      }
    } catch (error) {
      console.error('❌ Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = (id: string) => {
    setDismissed(prev => new Set([...prev, id]));
    if (currentIndex < announcements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Filter out dismissed announcements
  const visibleAnnouncements = announcements.filter(a => !dismissed.has(a.id));
  
  if (loading || visibleAnnouncements.length === 0) {
    return null;
  }

  const currentAnnouncement = visibleAnnouncements[currentIndex];
  if (!currentAnnouncement) return null;

  const getBackgroundColor = () => {
    switch (currentAnnouncement.type) {
      case 'urgent':
        return 'bg-red-600';
      case 'maintenance':
        return 'bg-yellow-600';
      case 'feature':
        return 'bg-blue-600';
      case 'event':
        return 'bg-purple-600';
      default:
        return 'bg-teal-600';
    }
  };

  return (
    <div className={`${getBackgroundColor()} text-white py-3 px-4 relative`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Megaphone className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm">{currentAnnouncement.title}</p>
            <p className="text-sm opacity-90 line-clamp-1">{currentAnnouncement.content}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {currentAnnouncement.link_url && (
            <a
              href={currentAnnouncement.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-white text-gray-900 rounded text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-1"
            >
              {currentAnnouncement.link_text || 'Learn More'}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <button
            onClick={() => handleDismiss(currentAnnouncement.id)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
