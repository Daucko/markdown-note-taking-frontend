import React from 'react';
import Icon from '../../../components/AppIcon';

const TaskMetadata = ({ task }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-background';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-primary bg-primary/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-background';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return 'Briefcase';
      case 'personal': return 'User';
      case 'shopping': return 'ShoppingCart';
      case 'health': return 'Heart';
      case 'finance': return 'DollarSign';
      case 'education': return 'BookOpen';
      default: return 'Tag';
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-text-primary">Task Details</h3>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">Status</label>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task?.status)}`}>
          <Icon 
            name={task?.status === 'completed' ? 'CheckCircle' : task?.status === 'in-progress' ? 'Clock' : 'Circle'} 
            size={16} 
            className="mr-2" 
          />
          {task?.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ') : 'Pending'}
        </div>
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">Priority</label>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task?.priority)}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            task?.priority === 'high' ? 'bg-error' :
            task?.priority === 'medium' ? 'bg-warning' : 'bg-success'
          }`} />
          {task?.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">Category</label>
        <div className="flex items-center text-text-primary">
          <Icon name={getCategoryIcon(task?.category)} size={16} className="mr-2" />
          <span className="text-sm">
            {task?.category ? task.category.charAt(0).toUpperCase() + task.category.slice(1) : 'Personal'}
          </span>
        </div>
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">Due Date</label>
        <div className={`flex items-center ${isOverdue(task?.dueDate) ? 'text-error' : 'text-text-primary'}`}>
          <Icon 
            name={isOverdue(task?.dueDate) ? 'AlertTriangle' : 'Calendar'} 
            size={16} 
            className="mr-2" 
          />
          <span className="text-sm">
            {formatDate(task?.dueDate)}
            {isOverdue(task?.dueDate) && (
              <span className="ml-2 text-xs font-medium">(Overdue)</span>
            )}
          </span>
        </div>
      </div>

      {/* Created Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">Created</label>
        <div className="flex items-center text-text-primary">
          <Icon name="Plus" size={16} className="mr-2" />
          <span className="text-sm">
            {formatDate(task?.createdAt || new Date().toISOString())}
          </span>
        </div>
      </div>

      {/* Last Modified */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">Last Modified</label>
        <div className="flex items-center text-text-primary">
          <Icon name="Edit" size={16} className="mr-2" />
          <span className="text-sm">
            {formatDate(task?.updatedAt || new Date().toISOString())}
          </span>
        </div>
      </div>

      {/* Tags */}
      {task?.tags && task.tags.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Tags</label>
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
              >
                <Icon name="Tag" size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">Progress</label>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-primary">
              {task?.status === 'completed' ? '100%' : 
               task?.status === 'in-progress' ? '50%' : '0%'}
            </span>
            <span className="text-text-secondary">
              {task?.status === 'completed' ? 'Complete' : 
               task?.status === 'in-progress' ? 'In Progress' : 'Not Started'}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                task?.status === 'completed' ? 'bg-success w-full' :
                task?.status === 'in-progress' ? 'bg-primary w-1/2' : 'bg-border w-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskMetadata;