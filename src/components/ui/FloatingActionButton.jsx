import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

const FloatingActionButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate('/task-detail-edit', { state: { mode: 'create', type: 'note' } });
  };

  // Show FAB on notes list screen
  if (location.pathname !== '/notes-list') {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-fab">
      <Button
        variant="primary"
        size="lg"
        iconName="Plus"
        onClick={handleCreateNote}
        className="w-14 h-14 rounded-full shadow-elevation-3 hover:shadow-hover scale-feedback animate-scale-in"
      />
    </div>
  );
};

export default FloatingActionButton;