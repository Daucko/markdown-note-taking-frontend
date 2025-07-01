import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, placeholder = "Search tasks..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative">
      {/* Mobile Search */}
      <div className="md:hidden">
        {!isExpanded ? (
          <Button
            variant="ghost"
            size="sm"
            iconName="Search"
            onClick={() => setIsExpanded(true)}
            className="p-2"
          />
        ) : (
          <div className="flex items-center space-x-2 bg-surface border border-border rounded-lg px-3 py-2">
            <Icon name="Search" size={18} className="text-text-secondary" />
            <Input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="flex-1 border-0 bg-transparent focus:ring-0 p-0"
              autoFocus
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={handleClear}
                className="p-1"
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => {
                setIsExpanded(false);
                handleClear();
              }}
              className="p-1"
            />
          </div>
        )}
      </div>

      {/* Desktop Search */}
      <div className="hidden md:block relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-10 w-full md:w-80"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;