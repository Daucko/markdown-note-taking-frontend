import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileSidebar = ({ activeSection, onSectionChange }) => {
  const sections = [
    {
      id: 'personal',
      label: 'Personal Information',
      icon: 'User',
      description: 'Name, email, and contact details'
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: 'Settings',
      description: 'Password and security settings'
    },
    {
      id: 'preferences',
      label: 'App Preferences',
      icon: 'Palette',
      description: 'Theme, language, and defaults'
    },
    {
      id: 'data',
      label: 'Data Management',
      icon: 'Database',
      description: 'Export and backup options'
    }
  ];

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24">
        <div className="bg-surface border border-border rounded-lg shadow-elevation-1 p-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Profile Settings
          </h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full text-left p-3 rounded-lg transition-micro hover-lift ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-text-secondary hover:text-text-primary hover:bg-background'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={section.icon} 
                    size={20} 
                    className={activeSection === section.id ? 'text-primary-foreground' : 'text-text-secondary'}
                  />
                  <div>
                    <div className={`text-sm font-medium ${
                      activeSection === section.id ? 'text-primary-foreground' : 'text-text-primary'
                    }`}>
                      {section.label}
                    </div>
                    <div className={`text-xs mt-1 ${
                      activeSection === section.id ? 'text-primary-foreground/80' : 'text-text-secondary'
                    }`}>
                      {section.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;