import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Camera,
  Save,
  X
} from 'lucide-react';

const SettingsPage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
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
        email: profile.email || user?.email || '',
        phone: profile.phone || '',
        studentId: profile.student_id || '',
        department: profile.department || '',
        level: profile.level || ''
      });
    }
  }, [profile, user]);

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

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.fullName,
          phone: profileData.phone,
          student_id: profileData.studentId,
          department: profileData.department,
          level: profileData.level
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully!');
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
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;
      toast.success('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notifications);
    toast.success('Notification preferences updated!');
  };

  const handleSavePreferences = () => {
    console.log('Saving preferences:', preferences);
    // Save theme to localStorage
    localStorage.setItem('theme', preferences.theme);
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('themeChange'));
    toast.success('Preferences updated!');
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
      <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-bold">NEXA</span>
          </div>
        </div>
        <nav className="flex-1 px-4">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg mb-2 transition-colors">
            <span>← Back to Dashboard</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-4 px-4 font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="inline mr-2" size={18} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-4 px-4 font-medium transition-colors ${
                activeTab === 'security'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Lock className="inline mr-2" size={18} />
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`pb-4 px-4 font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bell className="inline mr-2" size={18} />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`pb-4 px-4 font-medium transition-colors ${
                activeTab === 'preferences'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe className="inline mr-2" size={18} />
              Preferences
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl p-8 max-w-3xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {profileData.fullName ? profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName || 'User'}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={profileData.studentId}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    name="department"
                    value={profileData.department}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Mass Communication</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    name="level"
                    value={profileData.level}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option>100 Level</option>
                    <option>200 Level</option>
                    <option>300 Level</option>
                    <option>400 Level</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md"
                >
                  <Save size={20} />
                  {loading ? 'Saving...' : 'Save Profile Changes'}
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 font-semibold"
                >
                  <X size={20} />
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl p-8 max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSavePassword}
                  disabled={loading}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md flex items-center gap-2"
                >
                  <Save size={20} />
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl p-8 max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive notifications about {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveNotifications}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-md flex items-center gap-2"
                >
                  <Save size={20} />
                  Save Notification Preferences
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="bg-white rounded-2xl p-8 max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">General Preferences</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    name="language"
                    value={preferences.language}
                    onChange={handlePreferenceChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="yo">Yoruba</option>
                    <option value="ig">Igbo</option>
                    <option value="ha">Hausa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    name="timezone"
                    value={preferences.timezone}
                    onChange={handlePreferenceChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    name="theme"
                    value={preferences.theme}
                    onChange={handleThemeChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Choose your preferred color scheme. Changes apply immediately.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSavePreferences}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-md flex items-center gap-2"
                >
                  <Save size={20} />
                  Save General Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      </div>
    </>
  );
};

export default SettingsPage;
