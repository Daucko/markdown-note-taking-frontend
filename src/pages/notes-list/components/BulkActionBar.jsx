import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActionBar = ({ selectedCount, onAction, onCancel }) => {
  const actions = [
    {
      id: 'favorite',
      label: 'Favorite',
      icon: 'Heart',
      variant: 'outline',
    },
    {
      id: 'tag',
      label: 'Tag',
      icon: 'Tag',
      variant: 'outline',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'Trash2',
      variant: 'destructive',
    },
  ];

  return (
    <div className="lg:ml-64 bg-primary text-primary-foreground p-4 sticky top-16 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="p-2 -m-2 text-primary-foreground hover:bg-primary-dark rounded-md transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
          <span className="font-medium">
            {selectedCount} note{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {actions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.variant}
              size="sm"
              iconName={action?.icon}
              onClick={() => onAction?.(action?.id)}
              className={`${
                action?.variant === 'destructive'
                  ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
                  : 'bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-dark'
              }`}
            >
              <span className="hidden sm:inline ml-2">{action?.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;
