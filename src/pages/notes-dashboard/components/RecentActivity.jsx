import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities = [] }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'created':
        return 'PlusCircle';
      case 'modified':
        return 'Edit';
      case 'deleted':
        return 'Trash2';
      case 'favorited':
        return 'Heart';
      default:
        return 'FileText';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'created':
        return 'text-green-600';
      case 'modified':
        return 'text-blue-600';
      case 'deleted':
        return 'text-red-600';
      case 'favorited':
        return 'text-pink-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleActivityClick = (activity) => {
    // Navigate to note detail/edit page
    navigate('/task-detail-edit', { 
      state: { 
        mode: 'edit', 
        type: 'note',
        noteId: activity?.id 
      } 
    });
  };

  const handleViewAllActivity = () => {
    navigate('/notes-list');
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Recent Activity
        </h3>
        <button
          onClick={handleViewAllActivity}
          className="text-primary text-sm font-medium hover:text-primary-hover transition-colors"
        >
          View All
        </button>
      </div>

      {activities?.length === 0 ? (
        <div className="text-center py-6">
          <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary text-sm">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities?.slice(0, 5).map((activity) => (
            <div
              key={activity?.id}
              onClick={() => handleActivityClick(activity)}
              className="flex items-start space-x-3 p-3 rounded-md hover:bg-background cursor-pointer transition-colors"
            >
              <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {activity?.title}
                </p>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                  {activity?.content}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {activity?.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;