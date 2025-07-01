import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  isSelected, 
  onSelect, 
  isBulkMode 
}) => {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success';
      case 'overdue':
        return 'text-error';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'completed';
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 transition-micro hover-lift ${
      isSelected ? 'ring-2 ring-primary border-primary' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Checkbox for bulk selection */}
          {isBulkMode && (
            <button
              onClick={() => onSelect(task.id)}
              className="mt-1 p-1 rounded hover:bg-border-light transition-micro"
            >
              <Icon 
                name={isSelected ? "CheckSquare" : "Square"} 
                size={18} 
                className={isSelected ? "text-primary" : "text-text-secondary"}
              />
            </button>
          )}

          {/* Task completion checkbox */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className="mt-1 p-1 rounded hover:bg-border-light transition-micro"
          >
            <Icon 
              name={task.status === 'completed' ? "CheckCircle2" : "Circle"} 
              size={18} 
              className={task.status === 'completed' ? "text-success" : "text-text-secondary"}
            />
          </button>

          {/* Task content */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-text-primary mb-1 ${
              task.status === 'completed' ? 'line-through opacity-60' : ''
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Task metadata */}
            <div className="flex items-center flex-wrap gap-2 text-xs">
              {/* Due date */}
              <div className={`flex items-center space-x-1 ${
                isOverdue() ? 'text-error' : 'text-text-secondary'
              }`}>
                <Icon name="Calendar" size={12} />
                <span>{formatDate(task.dueDate)}</span>
              </div>

              {/* Priority badge */}
              <span className={`px-2 py-1 rounded-full border text-xs font-medium ${
                getPriorityColor(task.priority)
              }`}>
                {task.priority}
              </span>

              {/* Category tag */}
              {task.category && (
                <span className="px-2 py-1 bg-border-light text-text-secondary rounded-full text-xs">
                  {task.category}
                </span>
              )}

              {/* Status indicator */}
              <div className={`flex items-center space-x-1 ${getStatusColor(task.status)}`}>
                <div className={`w-2 h-2 rounded-full ${
                  task.status === 'completed' ? 'bg-success' :
                  isOverdue() ? 'bg-error' : 'bg-warning'
                }`} />
                <span className="capitalize">{task.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {!isBulkMode && (
          <div className="flex items-center space-x-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={() => onEdit(task)}
              className="p-2 hover:bg-border-light"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={() => onDelete(task.id)}
              className="p-2 hover:bg-red-50 hover:text-error"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;