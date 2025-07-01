import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'no-tasks', 
  onCreateTask, 
  onClearFilters 
}) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-tasks':
        return {
          icon: 'CheckSquare',
          title: 'No tasks yet',
          description: 'Create your first task to get started with organizing your work.',
          actionText: 'Create Task',
          onAction: onCreateTask
        };
      case 'no-results':
        return {
          icon: 'Search',
          title: 'No tasks found',
          description: 'Try adjusting your search terms or filters to find what you\'re looking for.',
          actionText: 'Clear Filters',
          onAction: onClearFilters
        };
      case 'all-completed':
        return {
          icon: 'CheckCircle2',
          title: 'All tasks completed!',
          description: 'Great job! You\'ve completed all your tasks. Time to create some new ones.',
          actionText: 'Create Task',
          onAction: onCreateTask
        };
      default:
        return {
          icon: 'CheckSquare',
          title: 'No tasks',
          description: 'There are no tasks to display.',
          actionText: 'Create Task',
          onAction: onCreateTask
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-border-light rounded-full flex items-center justify-center mb-4">
        <Icon 
          name={content.icon} 
          size={32} 
          className="text-text-secondary"
        />
      </div>
      
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
        {content.title}
      </h3>
      
      <p className="text-text-secondary mb-6 max-w-md">
        {content.description}
      </p>
      
      {content.onAction && (
        <Button
          variant="primary"
          onClick={content.onAction}
          iconName="Plus"
          iconPosition="left"
        >
          {content.actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;