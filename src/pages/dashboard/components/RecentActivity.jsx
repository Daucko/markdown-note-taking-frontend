import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'task_completed',
      title: 'Website redesign mockups',
      description: 'Task marked as completed',
      timestamp: '2 hours ago',
      icon: 'CheckCircle',
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'task_created',
      title: 'Client presentation slides',
      description: 'New task created',
      timestamp: '4 hours ago',
      icon: 'Plus',
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'task_updated',
      title: 'Database optimization',
      description: 'Tag changed to High',
      timestamp: '6 hours ago',
      icon: 'Edit',
      color: 'text-amber-600'
    },
    {
      id: 4,
      type: 'task_overdue',
      title: 'Monthly report submission',
      description: 'Task is now overdue',
      timestamp: '1 day ago',
      icon: 'AlertCircle',
      color: 'text-red-600'
    },
    {
      id: 5,
      type: 'task_completed',
      title: 'Code review for feature branch',
      description: 'Task marked as completed',
      timestamp: '2 days ago',
      icon: 'CheckCircle',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${activity.color}`}>
              <Icon name={activity.icon} size={16} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {activity.title}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {activity.description}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;