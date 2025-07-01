import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingTasks = () => {
  const navigate = useNavigate();

  const upcomingTasks = [
    {
      id: 1,
      title: 'Client presentation preparation',
      dueDate: '2024-12-20',
      priority: 'high',
      category: 'Work',
      progress: 75
    },
    {
      id: 2,
      title: 'Website deployment checklist',
      dueDate: '2024-12-21',
      priority: 'medium',
      category: 'Development',
      progress: 40
    },
    {
      id: 3,
      title: 'Team meeting agenda',
      dueDate: '2024-12-22',
      priority: 'low',
      category: 'Management',
      progress: 20
    },
    {
      id: 4,
      title: 'Database backup verification',
      dueDate: '2024-12-23',
      priority: 'high',
      category: 'Maintenance',
      progress: 0
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1) return `${diffDays} days`;
    return 'Overdue';
  };

  const handleTaskClick = (taskId) => {
    navigate('/task-detail-edit', { state: { taskId, mode: 'edit' } });
  };

  const handleViewAllTasks = () => {
    navigate('/task-list');
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Upcoming Tasks
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={handleViewAllTasks}
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {upcomingTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleTaskClick(task.id)}
            className="p-4 border border-border rounded-lg hover:bg-gray-50 cursor-pointer transition-micro"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-medium text-text-primary flex-1 pr-2">
                {task.title}
              </h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Tag" size={12} />
                  <span>{task.category}</span>
                </div>
              </div>
              <span>{task.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;