import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ searchQuery, hasFilters }) => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate('/task-detail-edit', { state: { mode: 'create', type: 'note' } });
  };

  const handleClearFilters = () => {
    // This would be handled by the parent component
    window.location.reload();
  };

  if (searchQuery || hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          No notes found
        </h3>
        <p className="text-text-secondary text-center mb-6 max-w-md">
          {searchQuery 
            ? `No notes match "${searchQuery}". Try adjusting your search terms.`
            : 'No notes match your current filters. Try adjusting your filter criteria.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Clear {searchQuery ? 'Search' : 'Filters'}
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateNote}
            iconName="Plus"
            iconPosition="left"
          >
            Create New Note
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Icon name="FileText" size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        No notes yet
      </h3>
      <p className="text-text-secondary text-center mb-6 max-w-md">
        Start capturing your thoughts, ideas, and important information in markdown format. 
        Your first note is just a click away!
      </p>
      <Button
        variant="primary"
        onClick={handleCreateNote}
        iconName="Plus"
        iconPosition="left"
        size="lg"
      >
        Create Your First Note
      </Button>
    </div>
  );
};

export default EmptyState;