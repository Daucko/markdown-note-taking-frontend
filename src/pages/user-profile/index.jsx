import React, { useState } from 'react';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileHeader from './components/ProfileHeader';
import PersonalInformationSection from './components/PersonalInformationSection';
import AccountSettingsSection from './components/AccountSettingsSection';
import AppPreferencesSection from './components/AppPreferencesSection';
import DataManagementSection from './components/DataManagementSection';
import ProfileSidebar from './components/ProfileSidebar';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('personal');

  // Mock user data
  const [userData, setUserData] = useState({
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinDate: 'March 2022',
    tasksCompleted: 127,
    activeTasks: 8,
    completedTasks: 89,
  });

  // Mock account settings
  const [accountSettings, setAccountSettings] = useState({
    notifications: {
      taskReminders: true,
      weeklySummary: false,
      teamUpdates: true,
    },
  });

  // Mock app preferences
  const [appPreferences, setAppPreferences] = useState({
    theme: 'light',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    language: 'en',
    autoSave: true,
  });

  const handleUserUpdate = (updatedData) => {
    setUserData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleAccountSettingsUpdate = (updatedSettings) => {
    setAccountSettings(updatedSettings);
  };

  const handlePreferencesUpdate = (updatedPreferences) => {
    setAppPreferences(updatedPreferences);
  };

  const handleAvatarUpdate = () => {
    // Mock avatar update
    console.log('Avatar updated');
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
  };

  const handleBackup = () => {
    console.log('Creating account backup');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInformationSection
            user={userData}
            onUpdate={handleUserUpdate}
          />
        );
      case 'account':
        return (
          <AccountSettingsSection
            settings={accountSettings}
            onUpdate={handleAccountSettingsUpdate}
          />
        );
      case 'preferences':
        return (
          <AppPreferencesSection
            preferences={appPreferences}
            onUpdate={handlePreferencesUpdate}
          />
        );
      case 'data':
        return (
          <DataManagementSection
            onExport={handleExport}
            onBackup={handleBackup}
          />
        );
      default:
        return (
          <PersonalInformationSection
            user={userData}
            onUpdate={handleUserUpdate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />

      <div className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Profile Header - Always visible */}
          <div className="mb-8">
            <ProfileHeader
              user={userData}
              onAvatarUpdate={handleAvatarUpdate}
            />
          </div>

          {/* Mobile Section Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {[
                { id: 'personal', label: 'Personal', icon: 'User' },
                { id: 'account', label: 'Account', icon: 'Settings' },
                { id: 'preferences', label: 'Preferences', icon: 'Palette' },
                { id: 'data', label: 'Data', icon: 'Database' },
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-micro ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface text-text-secondary border border-border hover:text-text-primary'
                  }`}
                >
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar - Desktop only */}
            <div className="lg:col-span-4">
              <ProfileSidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">{renderActiveSection()}</div>
          </div>
        </div>
      </div>

      <BottomTabNavigation />

      {/* Bottom padding for mobile navigation */}
      <div className="h-16 lg:hidden" />
    </div>
  );
};

export default UserProfile;
