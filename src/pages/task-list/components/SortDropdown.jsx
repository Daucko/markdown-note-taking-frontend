import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date', icon: 'Calendar' },
    { value: 'createdAt', label: 'Created Date', icon: 'Clock' },
    { value: 'title', label: 'Alphabetical', icon: 'AlphabeticalSort' },
    { value: 'status', label: 'Status', icon: 'CheckCircle' },
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === currentSort.field);
    return option ? option.label : 'Sort by';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (field) => {
    const newDirection =
      currentSort.field === field && currentSort.direction === 'asc'
        ? 'desc'
        : 'asc';
    onSortChange({ field, direction: newDirection });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <Icon name="ArrowUpDown" size={16} />
        <span className="hidden sm:inline">{getCurrentSortLabel()}</span>
        <Icon
          name="ChevronDown"
          size={16}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevation-2 z-50">
          <div className="py-2">
            {sortOptions.map((option) => {
              const isActive = currentSort.field === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-border-light transition-micro ${
                    isActive ? 'text-primary bg-primary/5' : 'text-text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={option.icon} size={16} />
                    <span>{option.label}</span>
                  </div>
                  {isActive && (
                    <Icon
                      name={
                        currentSort.direction === 'asc'
                          ? 'ArrowUp'
                          : 'ArrowDown'
                      }
                      size={14}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
