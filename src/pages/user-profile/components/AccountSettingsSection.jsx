import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AccountSettingsSection = ({ settings, onUpdate }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async () => {
    if (!validatePassword()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsLoading(false);
      alert('Password updated successfully!');
    }, 1000);
  };

  const handleNotificationToggle = (type) => {
    onUpdate && onUpdate({
      ...settings,
      notifications: {
        ...settings.notifications,
        [type]: !settings.notifications[type]
      }
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would show a proper modal
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion initiated. You will receive a confirmation email.');
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1">
      <div className="flex items-center space-x-3 p-6 border-b border-border">
        <Icon name="Settings" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Account Settings
        </h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Password Change Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium text-text-primary">Password</h3>
            {!isChangingPassword && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Key"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </Button>
            )}
          </div>

          {isChangingPassword ? (
            <div className="space-y-4 p-4 bg-background rounded-lg border border-border">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  placeholder="Enter current password"
                  className={passwordErrors.currentPassword ? 'border-error' : ''}
                />
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-sm text-error">{passwordErrors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  placeholder="Enter new password"
                  className={passwordErrors.newPassword ? 'border-error' : ''}
                />
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-sm text-error">{passwordErrors.newPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  placeholder="Confirm new password"
                  className={passwordErrors.confirmPassword ? 'border-error' : ''}
                />
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">{passwordErrors.confirmPassword}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
                <Button
                  variant="primary"
                  onClick={handlePasswordSubmit}
                  loading={isLoading}
                  className="sm:w-auto"
                >
                  Update Password
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordErrors({});
                  }}
                  disabled={isLoading}
                  className="sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-text-secondary text-sm">
              Last changed 30 days ago
            </p>
          )}
        </div>

        {/* Notification Preferences */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">
            Email Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Task Reminders</p>
                <p className="text-xs text-text-secondary">Get notified about upcoming due dates</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('taskReminders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.taskReminders ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.taskReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Weekly Summary</p>
                <p className="text-xs text-text-secondary">Receive weekly task completion reports</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('weeklySummary')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.weeklySummary ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.weeklySummary ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Team Updates</p>
                <p className="text-xs text-text-secondary">Notifications about team task changes</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('teamUpdates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.teamUpdates ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.teamUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-border pt-6">
          <h3 className="text-md font-medium text-error mb-4">Danger Zone</h3>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-error mb-1">
                  Delete Account
                </h4>
                <p className="text-sm text-red-700 mb-3">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSection;