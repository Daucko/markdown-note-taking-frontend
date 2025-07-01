import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate('/task-detail-edit', { state: { mode: 'create' } });
  };

  const handleViewAllTasks = () => {
    navigate('/task-list');
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <Button
          variant="primary"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={handleAddTask}
          className="justify-center"
        >
          Add New Task
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="List"
          iconPosition="left"
          onClick={handleViewAllTasks}
          className="justify-center"
        >
          View All Tasks
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;