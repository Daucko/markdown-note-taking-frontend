import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/notes-dashboard',
      icon: 'LayoutDashboard',
      badge: null
    },
    {
      label: 'Notes',
      path: '/notes-list',
      icon: 'FileText',
      badge: null
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User',
      badge: null
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-navigation">
        <div className="flex items-center justify-around h-14">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleTabClick(item.path)}
                className={`flex flex-col items-center justify-center px-3 py-2 min-w-0 flex-1 transition-micro ${
                  active
                    ? 'text-primary' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium truncate ${
                  active ? 'text-primary' : 'text-text-secondary'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-border z-navigation">
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center px-6 py-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-heading font-semibold text-text-primary">
                Notes App
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => handleTabClick(item.path)}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-micro hover-lift ${
                      active
                        ? 'bg-primary text-primary-foreground shadow-elevation-1'
                        : 'text-text-secondary hover:text-text-primary hover:bg-border-light'
                    }`}
                  >
                    <div className="relative">
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        strokeWidth={active ? 2.5 : 2}
                      />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="ml-3 font-medium">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;