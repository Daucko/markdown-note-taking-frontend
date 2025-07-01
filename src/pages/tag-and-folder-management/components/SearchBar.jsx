import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange?.('');
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon name="Search" size={16} className="text-text-secondary" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder-text-secondary"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
        >
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;