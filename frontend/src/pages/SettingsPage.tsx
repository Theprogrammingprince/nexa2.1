import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';
import { settingsAPI, profileImageAPI } from '../services/api';
import ProfileAvatar from '../components/ProfileAvatar';
import toast, { Toaster } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Camera,
  Save,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

const SettingsPage = () => {
  const { isDarkMode } = useTheme();
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    level: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    testReminders: true,
    scoreUpdates: true,
    systemUpdates: false
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'Africa/Lagos',
    theme: localStorage.getItem('theme') || 'light'
  });

  // Load user data from profile
  useEffect(() => {
    if (profile) {
      setProfileData({
        fullName: profile.full_name || '',
        email: user?.email || '',
        phone: profile.phone || '',
        studentId: profile.student_id || '',
        department: profile.department || '',
        level: profile.level || ''
      });
      setAvatarUrl(profile.avatar_url || null);
    }
    // Load user settings
    loadUserSettings();
  }, [profile, user]);

  const loadUserSettings = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setNotifications({
          emailNotifications: data.email_notifications ?? true,
          testReminders: data.test_reminders ?? true,
          scoreUpdates: data.score_updates ?? true,
          systemUpdates: data.system_updates ?? false
        });
        
        setPreferences({
          language: data.language || 'en',
          timezone: data.timezone || 'Africa/Lagos',
          theme: data.theme || localStorage.getItem('theme') || 'light'
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] });
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File too large. Maximum size is 5MB.');
      return;
    }

    setUploadingImage(true);
    try {
      const result = await profileImageAPI.uploadImage(file);
      setAvatarUrl(result.avatar_url);
      toast.success('✅ Profile image uploaded successfully!');
      
      // Reload profile to get updated avatar
      window.location.reload();
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!confirm('Are you sure you want to remove your profile image?')) return;

    setUploadingImage(true);
    try {
      await profileImageAPI.deleteImage();
      setAvatarUrl(null);
      toast.success('✅ Profile image removed successfully!');
      
      // Reload profile
      window.location.reload();
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const result = await settingsAPI.updateProfile({
        fullName: profileData.fullName,
        phone: profileData.phone,
        department: profileData.department,
        level: profileData.level
      });

      if (result.error) throw new Error(result.error);
      toast.success('✅ Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    try {
      await settingsAPI.updatePassword(passwordData.newPassword);
      toast.success('✅ Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Use upsert to handle both insert and update
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          email_notifications: notifications.emailNotifications,
          test_reminders: notifications.testReminders,
          score_updates: notifications.scoreUpdates,
          system_updates: notifications.systemUpdates,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast.success('✅ Notification preferences saved!');
    } catch (error: any) {
      console.error('Error saving notifications:', error);
      toast.error('Failed to save preferences: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Use upsert to handle both insert and update
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          language: preferences.language,
          timezone: preferences.timezone,
          theme: preferences.theme,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Save theme to localStorage
      localStorage.setItem('theme', preferences.theme);
      window.dispatchEvent(new Event('themeChange'));
      
      toast.success('✅ Preferences saved successfully!');
    } catch (error: any) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setPreferences({ ...preferences, theme: newTheme });
    // Immediately apply theme
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('themeChange'));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <DashboardLayout currentPage="/settings">

          {/* Tabs */}
          <div className={`flex flex-wrap gap-2 sm:gap-4 mb-8 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-4 px-3 sm:px-4 font-medium transition-colors text-sm sm:text-base ${
                activeTab === 'profile'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className={`inline mr-1 sm:mr-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} size={18} />
              <span className={`hidden sm:inline ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-4 px-3 sm:px-4 font-medium transition-colors text-sm sm:text-base ${
                activeTab === 'security'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Lock className={`inline mr-1 sm:mr-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} size={18} />
              <span className={`hidden sm:inline ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Security</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`pb-4 px-3 sm:px-4 font-medium transition-colors text-sm sm:text-base ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bell className={`inline mr-1 sm:mr-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} size={18} />
              <span className={`hidden sm:inline ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`pb-4 px-3 sm:px-4 font-medium transition-colors text-sm sm:text-base ${
                activeTab === 'preferences'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe className={`inline mr-1 sm:mr-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} size={18} />
              <span className={`hidden sm:inline ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Preferences</span>
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-3xl shadow-lg`}>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <ProfileAvatar 
                    avatarUrl={avatarUrl}
                    fullName={profileData.fullName}
                    size="xl"
                    className="w-24 h-24"
                  />
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute bottom-0 right-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 cursor-pointer ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Camera size={16} />
                  </label>
                  {avatarUrl && (
                    <button
                      onClick={handleDeleteImage}
                      disabled={uploadingImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 disabled:opacity-50"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{profileData.fullName || 'User'}</h2>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{profileData.email}</p>
                  {uploadingImage && (
                    <p className="text-sm text-primary-600 mt-1">Uploading...</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gray-900 border-2 border-gray-700 text-gray-500' : 'bg-gray-50 border-2 border-gray-300 text-gray-500'} cursor-not-allowed`}
                    disabled
                    readOnly
                  />
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    Email cannot be changed
                  </p>
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Department</label>
                  <select
                    name="department"
                    value={profileData.department}
                    onChange={handleProfileChange}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                  >
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Mass Communication</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Level</label>
                  <select
                    name="level"
                    value={profileData.level}
                    onChange={handleProfileChange}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                  >
                    <option>100 Level</option>
                    <option>200 Level</option>
                    <option>300 Level</option>
                    <option>400 Level</option>
                  </select>
                </div>
              </div>

              <div className={`flex gap-4 mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
                >
                  <Save size={20} />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className={`px-8 py-3 rounded-lg transition-all flex items-center gap-2 font-semibold ${isDarkMode ? 'border-2 border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  <X size={20} />
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-2xl shadow-lg`}>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Change Password</h2>
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 pr-12 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                    >
                      {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 pr-12 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                      placeholder="Enter new password (min. 6 characters)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                    >
                      {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-3 pr-12 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                    >
                      {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
              <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={handleSavePassword}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg flex items-center gap-2"
                >
                  <Save size={20} />
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>
          )}

{/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-2xl shadow-lg`}>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className={`flex items-center justify-between p-5 rounded-xl transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-650' 
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                  }`}>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} capitalize`}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                        Receive notifications about {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all border ${ // Border 1px remains
                        value 
                            ? 'bg-gradient-to-r from-primary-600 to-primary-700 border-primary-800 shadow-md' // **FIX: Darker primary gradient and stronger shadow**
                            : isDarkMode 
                                ? 'bg-gray-600 border-gray-500 shadow-inner' // OFF state Dark Mode
                                : 'bg-gray-400 border-gray-500 shadow-inner' // OFF state Light Mode
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full shadow-lg transition-transform ${
                          value 
                                ? isDarkMode 
                                    ? 'translate-x-8 bg-white' // Dark Mode ON: White thumb
                                    : 'translate-x-8 bg-black' // Light Mode ON: Black thumb
                            : 'translate-x-1 bg-white'      
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={handleSaveNotifications}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold shadow-lg flex items-center gap-2"
                >
                  <Save size={20} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-2xl shadow-lg`}>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>General Preferences</h2>
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Language</label>
                  <select
                    name="language"
                    value={preferences.language}
                    onChange={handlePreferenceChange}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="yo">Yoruba</option>
                    <option value="ig">Igbo</option>
                    <option value="ha">Hausa</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Timezone</label>
                  <select
                    name="timezone"
                    value={preferences.timezone}
                    onChange={handlePreferenceChange}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                  >
                    <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Theme</label>
                  <select
                    name="theme"
                    value={preferences.theme}
                    onChange={handleThemeChange}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-2 border-gray-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900'}`}
                  >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </select>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                    Choose your preferred color scheme. Changes apply immediately.
                  </p>
                </div>
              </div>
              <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={handleSavePreferences}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-semibold shadow-lg flex items-center gap-2"
                >
                  <Save size={20} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}
      </DashboardLayout>
    </>
  );
};

export default SettingsPage;
