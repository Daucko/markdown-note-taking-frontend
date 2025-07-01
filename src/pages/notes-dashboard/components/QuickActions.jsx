import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    // Navigate to note creation page (will be implemented later)
    navigate('/task-detail-edit', { state: { mode: 'create', type: 'note' } });
  };

  const handleViewAllNotes = () => {
    navigate('/notes-list');
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <Button
          variant="primary"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={handleCreateNote}
          className="justify-center"
        >
          Create New Note
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="FileText"
          iconPosition="left"
          onClick={handleViewAllNotes}
          className="justify-center"
        >
          View All Notes
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;