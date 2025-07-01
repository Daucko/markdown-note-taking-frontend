import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ value, onChange, placeholder = 'Search notes...' }) => {
  const [searchValue, setSearchValue] = useState(value || '');

  useEffect(() => {
    setSearchValue(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      onChange?.(newValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleClear = () => {
    setSearchValue('');
    onChange?.('');
  };

  return (
    <div className="relative">
      <Icon 
        name="Search" 
        size={18} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
      />
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro"
      />
      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
        >
          <Icon name="X" size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;