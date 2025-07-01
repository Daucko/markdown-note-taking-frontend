import React from 'react';

const TagCloud = ({ tags, selectedTags, onSelect, onEdit, onDelete }) => {
  const handleTagClick = (tagId, e) => {
    e.preventDefault();
    onSelect?.(tagId, e.ctrlKey || e.metaKey);
  };

  const handleContextMenu = (e, tag) => {
    e.preventDefault();
    // You could implement a context menu here
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px] p-4">
      {tags?.map((tag) => {
        const isSelected = selectedTags?.includes(tag?.id);
        const fontSize = Math.max(14, Math.min(24, tag?.size || 16));
        
        return (
          <button
            key={tag?.id}
            onClick={(e) => handleTagClick(tag?.id, e)}
            onContextMenu={(e) => handleContextMenu(e, tag)}
            className={`group relative inline-flex items-center px-3 py-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isSelected
                ? 'bg-primary text-primary-foreground shadow-elevation-2'
                : 'bg-background hover:bg-surface border border-border hover:border-primary-light'
            }`}
            style={{
              fontSize: `${fontSize}px`,
              backgroundColor: isSelected ? tag?.color : undefined,
              borderColor: !isSelected ? tag?.color + '40' : undefined,
            }}
          >
            <span className="font-medium">#{tag?.name}</span>
            <span className="ml-2 text-xs opacity-70">
              {tag?.usageCount}
            </span>
            
            {/* Hover Actions */}
            <div className="absolute -top-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(tag);
                }}
                className="w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center text-xs hover:bg-surface transition-colors shadow-elevation-1"
                title="Edit tag"
              >
                ✏️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(tag);
                }}
                className="w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center text-xs hover:bg-surface transition-colors shadow-elevation-1 text-error"
                title="Delete tag"
              >
                🗑️
              </button>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default TagCloud;