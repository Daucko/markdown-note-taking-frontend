import React from 'react';
import Icon from '../../../components/AppIcon';


const AppPreferencesSection = ({ preferences, onUpdate }) => {
  const handlePreferenceChange = (key, value) => {
    onUpdate && onUpdate({
      ...preferences,
      [key]: value
    });
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: 'Sun' },
    { value: 'dark', label: 'Dark', icon: 'Moon' },
    { value: 'system', label: 'System', icon: 'Monitor' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' }
  ];

  const timeFormatOptions = [
    { value: '12', label: '12-hour (AM/PM)' },
    { value: '24', label: '24-hour' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-blue-600' },
    { value: 'medium', label: 'Medium', color: 'text-amber-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1">
      <div className="flex items-center space-x-3 p-6 border-b border-border">
        <Icon name="Palette" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          App Preferences
        </h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Theme Selection */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">Theme</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themeOptions.map((theme) => (
              <button
                key={theme.value}
                onClick={() => handlePreferenceChange('theme', theme.value)}
                className={`p-4 rounded-lg border-2 transition-micro hover-lift ${
                  preferences.theme === theme.value
                    ? 'border-primary bg-blue-50' :'border-border bg-background hover:border-border-light'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon 
                    name={theme.icon} 
                    size={24} 
                    className={preferences.theme === theme.value ? 'text-primary' : 'text-text-secondary'}
                  />
                  <span className={`text-sm font-medium ${
                    preferences.theme === theme.value ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {theme.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Format */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">Date Format</h3>
          <div className="space-y-2">
            {dateFormatOptions.map((format) => (
              <label key={format.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="dateFormat"
                  value={format.value}
                  checked={preferences.dateFormat === format.value}
                  onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{format.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Time Format */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">Time Format</h3>
          <div className="space-y-2">
            {timeFormatOptions.map((format) => (
              <label key={format.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="timeFormat"
                  value={format.value}
                  checked={preferences.timeFormat === format.value}
                  onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{format.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Default Task Priority */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">Default Task Priority</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {priorityOptions.map((priority) => (
              <button
                key={priority.value}
                onClick={() => handlePreferenceChange('defaultPriority', priority.value)}
                className={`p-3 rounded-lg border-2 transition-micro hover-lift ${
                  preferences.defaultPriority === priority.value
                    ? 'border-primary bg-blue-50' :'border-border bg-background hover:border-border-light'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    priority.value === 'low' ? 'bg-blue-500' :
                    priority.value === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    preferences.defaultPriority === priority.value ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {priority.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Language Preference */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">Language</h3>
          <select
            value={preferences.language}
            onChange={(e) => handlePreferenceChange('language', e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
          </select>
        </div>

        {/* Auto-save Preference */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-medium text-text-primary">Auto-save Tasks</h3>
              <p className="text-sm text-text-secondary mt-1">
                Automatically save task changes as you type
              </p>
            </div>
            <button
              onClick={() => handlePreferenceChange('autoSave', !preferences.autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.autoSave ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreferencesSection;