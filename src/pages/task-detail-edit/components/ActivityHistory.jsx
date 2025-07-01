import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityHistory = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'created': return 'Plus';
      case 'updated': return 'Edit';
      case 'status_changed': return 'CheckCircle';
      case 'priority_changed': return 'AlertTriangle';
      case 'due_date_changed': return 'Calendar';
      case 'comment_added': return 'MessageCircle';
      case 'attachment_added': return 'Paperclip';
      case 'attachment_removed': return 'Trash2';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'created': return 'text-success';
      case 'updated': return 'text-primary';
      case 'status_changed': return 'text-success';
      case 'priority_changed': return 'text-warning';
      case 'due_date_changed': return 'text-primary';
      case 'comment_added': return 'text-primary';
      case 'attachment_added': return 'text-primary';
      case 'attachment_removed': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      type: 'created',
      description: 'Task created',
      user: 'John Doe',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    },
    {
      id: 2,
      type: 'priority_changed',
      description: 'Priority changed from Low to High',
      user: 'John Doe',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() // 1 hour ago
    },
    {
      id: 3,
      type: 'comment_added',
      description: 'Added a comment',
      user: 'Jane Smith',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 minutes ago
    },
    {
      id: 4,
      type: 'attachment_added',
      description: 'Added attachment: project-specs.pdf',
      user: 'John Doe',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 minutes ago
    },
    {
      id: 5,
      type: 'status_changed',
      description: 'Status changed from Pending to In Progress',
      user: 'John Doe',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() // 5 minutes ago
    }
  ];

  const displayActivities = activities.length > 0 ? activities : mockActivities;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-text-primary">Activity History</h3>

      {displayActivities.length > 0 ? (
        <div className="space-y-3">
          {displayActivities.map((activity, index) => (
            <div key={activity.id} className="flex space-x-3">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-primary' : 'bg-background border-2 border-border'
                }`}>
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={16} 
                    className={index === 0 ? 'text-white' : getActivityColor(activity.type)}
                  />
                </div>
                {index < displayActivities.length - 1 && (
                  <div className="w-px h-8 bg-border mt-1" />
                )}
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {activity.description}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      by {activity.user}
                    </p>
                  </div>
                  <span className="text-xs text-text-secondary whitespace-nowrap ml-2">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto text-text-secondary mb-3" />
          <p className="text-text-secondary">No activity yet</p>
          <p className="text-sm text-text-secondary">Activity will appear here as you work on this task</p>
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;