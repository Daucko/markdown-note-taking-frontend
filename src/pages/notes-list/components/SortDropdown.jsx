import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'modified', label: 'Recently Modified', icon: 'Clock' },
    { value: 'created', label: 'Recently Created', icon: 'Plus' },
    { value: 'title', label: 'Title (A-Z)', icon: 'AlphabeticalVariant' },
    { value: 'favorites', label: 'Favorites First', icon: 'Heart' }
  ];

  const currentOption = sortOptions?.find(option => option?.value === value) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-background border border-border rounded-md hover:bg-border-light transition-colors"
      >
        <Icon name={currentOption?.icon} size={16} className="text-text-secondary" />
        <span className="text-sm font-medium text-text-primary hidden lg:inline">
          {currentOption?.label}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-md shadow-elevation-2 z-dropdown">
          <div className="py-1">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleOptionClick(option?.value)}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-background transition-colors ${
                  value === option?.value ? 'bg-primary-light text-primary' : 'text-text-primary'
                }`}
              >
                <Icon name={option?.icon} size={16} />
                <span className="text-sm font-medium">{option?.label}</span>
                {value === option?.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;