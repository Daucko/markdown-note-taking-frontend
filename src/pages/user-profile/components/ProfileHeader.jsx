import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const ProfileHeader = ({ user, onAvatarUpdate }) => {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const handleAvatarClick = () => {
    setIsEditingAvatar(true);
    // In a real app, this would open file picker
    setTimeout(() => {
      setIsEditingAvatar(false);
      onAvatarUpdate && onAvatarUpdate();
    }, 1000);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border hover-lift cursor-pointer" onClick={handleAvatarClick}>
            <Image
              src={user.avatar}
              alt={`${user.name}'s profile picture`}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handleAvatarClick}
            className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-elevation-2 hover-lift transition-micro"
            disabled={isEditingAvatar}
          >
            {isEditingAvatar ? (
              <Icon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <Icon name="Camera" size={16} />
            )}
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-heading font-semibold text-text-primary mb-1">
            {user.name}
          </h1>
          <p className="text-text-secondary mb-2">{user.email}</p>
          <div className="flex items-center justify-center sm:justify-start space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>Joined {user.joinDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CheckSquare" size={16} />
              <span>{user.tasksCompleted} tasks completed</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex space-x-6 sm:space-x-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-semibold text-primary">
              {user.activeTasks}
            </div>
            <div className="text-xs text-text-secondary">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-semibold text-success">
              {user.completedTasks}
            </div>
            <div className="text-xs text-text-secondary">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;