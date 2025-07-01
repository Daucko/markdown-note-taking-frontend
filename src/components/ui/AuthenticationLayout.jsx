import React from 'react';
import Icon from '../AppIcon';

const AuthenticationLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-elevation-2">
              <Icon name="CheckSquare" size={28} color="white" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-heading font-semibold text-text-primary">
                Task Manager
              </h1>
            </div>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-heading font-semibold text-text-primary">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-4 shadow-elevation-2 sm:rounded-lg sm:px-10 border border-border">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-text-secondary">
          © 2024 Task Manager. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthenticationLayout;