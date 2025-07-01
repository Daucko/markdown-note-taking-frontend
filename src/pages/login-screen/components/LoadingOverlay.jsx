import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isVisible, message = 'Signing you in...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg p-6 shadow-elevation-3 flex flex-col items-center space-y-4 mx-4 max-w-sm w-full">
        <div className="animate-spin">
          <Icon name="Loader2" size={32} className="text-primary" />
        </div>
        <p className="text-text-primary font-medium text-center">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;