import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConfirmDialog = ({ 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            {title}
          </h2>
          <button
            onClick={onCancel}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-text-secondary mb-6">
            {message}
          </p>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              {cancelText}
            </Button>
            <Button
              variant={confirmVariant}
              onClick={onConfirm}
              className="flex-1"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;