import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onApply, onClose, notes = [] }) => {
  const [localFilters, setLocalFilters] = useState(filters || {
    tags: [],
    dateRange: null,
    favorites: false
  });

  useEffect(() => {
    setLocalFilters(filters || {
      tags: [],
      dateRange: null,
      favorites: false
    });
  }, [filters]);

  // Get unique tags from notes
  const tags = [...new Set(notes?.flatMap(note => note?.tags || []).filter(Boolean))];

  const handleTagToggle = (tag) => {
    setLocalFilters(prev => ({
      ...prev,
      tags: prev?.tags?.includes(tag)
        ? prev?.tags?.filter(t => t !== tag)
        : [...(prev?.tags || []), tag]
    }));
  };

  const handleFavoritesToggle = () => {
    setLocalFilters(prev => ({
      ...prev,
      favorites: !prev?.favorites
    }));
  };

  const handleApply = () => {
    onApply?.(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      tags: [],
      dateRange: null,
      favorites: false
    };
    setLocalFilters(resetFilters);
    onApply?.(resetFilters);
  };

  const hasActiveFilters = 
    localFilters?.tags?.length > 0 || 
    localFilters?.favorites ||
    localFilters?.dateRange;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6">
      {/* Mobile Header */}
      {onClose && (
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Filter Notes
          </h3>
          <button
            onClick={onClose}
            className="p-2 -m-2 text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-primary hover:text-primary-hover font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Tags */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Tags</h4>
          <div className="space-y-2">
            {tags?.map((tag) => (
              <label key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters?.tags?.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="ml-2 text-sm text-text-secondary">
                  {tag}
                  <span className="ml-1 text-xs text-text-secondary">
                    ({notes?.filter(note => (note?.tags || []).includes(tag))?.length})
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Favorites */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Favorites</h4>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localFilters?.favorites}
              onChange={handleFavoritesToggle}
              className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
            />
            <span className="ml-2 text-sm text-text-secondary">
              Show only favorites
              <span className="ml-1 text-xs text-text-secondary">
                ({notes?.filter(note => note?.isFavorite)?.length})
              </span>
            </span>
          </label>
        </div>

        {/* Date Range */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Date Range</h4>
          <select
            value={localFilters?.dateRange || ''}
            onChange={(e) => setLocalFilters(prev => ({
              ...prev,
              dateRange: e.target.value || null
            }))}
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          >
            <option value="">All time</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="year">This year</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6 lg:hidden">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!hasActiveFilters}
          className="flex-1"
        >
          Reset
        </Button>
        <Button
          variant="primary"
          onClick={handleApply}
          className="flex-1"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;