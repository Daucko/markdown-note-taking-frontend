import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualHeader = ({ title, showBack = false, actions = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const getHeaderContent = () => {
    const pathname = location.pathname;

    switch (pathname) {
      case '/notes-dashboard':
        return {
          title: 'Notes Dashboard',
          showBack: false,
          showSearch: false,
          showLogo: true,
          actions: [
            {
              icon: 'Bell',
              onClick: () => console.log('Notifications clicked'),
              badge: 3
            }
          ]
        };

      case '/notes-list':
        return {
          title: 'Notes',
          showBack: false,
          showSearch: true,
          showLogo: false,
          actions: [
            {
              icon: 'Filter',
              onClick: () => console.log('Filter clicked')
            },
            {
              icon: 'MoreVertical',
              onClick: () => console.log('More options clicked')
            }
          ]
        };

      case '/dashboard':
        return {
          title: 'Dashboard',
          showBack: false,
          showSearch: false,
          showLogo: true,
          actions: [
            {
              icon: 'Bell',
              onClick: () => console.log('Notifications clicked'),
              badge: 3
            }
          ]
        };

      case '/task-list':
        return {
          title: 'Tasks',
          showBack: false,
          showSearch: true,
          showLogo: false,
          actions: [
            {
              icon: 'Filter',
              onClick: () => console.log('Filter clicked')
            },
            {
              icon: 'MoreVertical',
              onClick: () => console.log('More options clicked')
            }
          ]
        };

      case '/task-detail-edit':
        return {
          title: 'Task Details',
          showBack: true,
          showSearch: false,
          showLogo: false,
          actions: [
            {
              icon: 'Edit',
              onClick: () => console.log('Edit clicked')
            },
            {
              icon: 'MoreVertical',
              onClick: () => console.log('More options clicked')
            }
          ]
        };

      case '/user-profile':
        return {
          title: 'Profile',
          showBack: false,
          showSearch: false,
          showLogo: false,
          actions: [
            {
              icon: 'Settings',
              onClick: () => console.log('Settings clicked')
            }
          ]
        };

      default:
        return {
          title: title || 'Notes App',
          showBack: showBack,
          showSearch: false,
          showLogo: !showBack,
          actions: actions
        };
    }
  };

  const headerConfig = getHeaderContent();

  return (
    <header className="sticky top-0 bg-surface border-b border-border z-header">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {headerConfig.showBack ? (
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              onClick={handleBackClick}
              className="p-2 -ml-2"
            />
          ) : headerConfig.showLogo ? (
            <div className="flex items-center space-x-3 lg:hidden">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                Notes App
              </span>
            </div>
          ) : null}

          {/* Title */}
          <h1 className={`text-lg font-heading font-semibold text-text-primary ${
            headerConfig.showLogo ? 'hidden lg:block' : ''
          }`}>
            {headerConfig.title}
          </h1>
        </div>

        {/* Center Section - Search */}
        {headerConfig.showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro"
              />
            </div>
          </div>
        )}

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {headerConfig.showSearch && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              onClick={() => console.log('Mobile search clicked')}
              className="p-2 md:hidden"
            />
          )}

          {headerConfig.actions.map((action, index) => (
            <div key={index} className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName={action.icon}
                onClick={action.onClick}
                className="p-2 hover-lift"
              />
              {action.badge && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {action.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default ContextualHeader;