import React from 'react';

import Button from '../../../components/ui/Button';

const BulkActionBar = ({ 
  selectedCount, 
  onMarkComplete, 
  onMarkIncomplete, 
  onDelete, 
  onCancel,
  onSelectAll,
  totalCount 
}) => {
  const allSelected = selectedCount === totalCount;

  return (
    <div className="fixed top-16 left-0 right-0 lg:left-64 bg-primary text-primary-foreground shadow-elevation-2 z-30 transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onCancel}
            className="p-2 text-primary-foreground hover:bg-white/10"
          />
          <span className="font-medium">
            {selectedCount} task{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            className="text-primary-foreground hover:bg-white/10 text-sm"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </Button>

          <div className="w-px h-6 bg-white/20" />

          <Button
            variant="ghost"
            size="sm"
            iconName="Check"
            onClick={onMarkComplete}
            className="p-2 text-primary-foreground hover:bg-white/10"
            title="Mark as Complete"
          />

          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={onMarkIncomplete}
            className="p-2 text-primary-foreground hover:bg-white/10"
            title="Mark as Incomplete"
          />

          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={onDelete}
            className="p-2 text-primary-foreground hover:bg-red-500/20"
            title="Delete Selected"
          />
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;