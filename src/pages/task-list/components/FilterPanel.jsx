import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onApplyFilters, 
  onResetFilters 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Filter Panel */}
      <div className={`
        lg:relative lg:bg-transparent lg:shadow-none lg:rounded-none lg:p-0
        fixed bottom-0 left-0 right-0 bg-surface rounded-t-xl shadow-elevation-3 z-50
        lg:block lg:w-full lg:h-auto
        ${isOpen ? 'block' : 'hidden'}
      `}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Filter Tasks
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="p-2"
          />
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block mb-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Filters
          </h3>
        </div>

        {/* Filter Content */}
        <div className="p-4 lg:p-0 space-y-6 max-h-96 lg:max-h-none overflow-y-auto">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Status
            </label>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={filters.status === option.value}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Priority
            </label>
            <div className="space-y-2">
              {priorityOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={option.value}
                    checked={filters.priority === option.value}
                    onChange={(e) => onFilterChange('priority', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Category
            </label>
            <div className="space-y-2">
              {categoryOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={filters.category === option.value}
                    onChange={(e) => onFilterChange('category', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Due Date Range
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">From</label>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => onFilterChange('dateFrom', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">To</label>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => onFilterChange('dateTo', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 lg:p-0 lg:mt-6 border-t lg:border-t-0 border-border bg-surface lg:bg-transparent">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onResetFilters}
              className="flex-1 lg:flex-none"
            >
              Reset
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onApplyFilters();
                onClose();
              }}
              className="flex-1 lg:flex-none"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;