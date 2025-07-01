import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../../../components/AppIcon';

const FolderTreeItem = ({ 
  folder, 
  depth = 0, 
  selectedFolders, 
  expandedFolders, 
  onSelect, 
  onExpand, 
  onRename, 
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  draggedFolder 
}) => {
  const isSelected = selectedFolders?.includes(folder?.id);
  const isExpanded = expandedFolders?.has(folder?.id);
  const hasChildren = folder?.children?.length > 0;
  const isDraggedOver = draggedFolder && draggedFolder?.id !== folder?.id;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect?.(folder?.id, e.ctrlKey || e.metaKey);
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      onExpand?.(folder?.id);
    }
  };

  const handleDragStart = (e) => {
    onDragStart?.(folder);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver?.(e);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop?.(folder);
  };

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  return (
    <div className="select-none">
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`group flex items-center p-3 cursor-pointer transition-all hover:bg-background ${
          isSelected ? 'bg-primary-light border-l-2 border-primary' : ''
        } ${isDraggedOver ? 'border-t-2 border-primary' : ''}`}
        style={{ paddingLeft: `${12 + depth * 24}px` }}
      >
        {/* Expand/Collapse Button */}
        <button
          onClick={handleExpand}
          className="mr-2 p-1 rounded hover:bg-background transition-colors"
        >
          {hasChildren ? (
            <Icon 
              name={isExpanded ? "ChevronDown" : "ChevronRight"} 
              size={16} 
              className="text-text-secondary"
            />
          ) : (
            <div className="w-4 h-4" />
          )}
        </button>

        {/* Folder Icon */}
        <Icon 
          name={isExpanded ? "FolderOpen" : "Folder"} 
          size={16} 
          className="mr-3 text-text-secondary"
        />

        {/* Folder Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-text-primary truncate">
              {folder?.name}
            </span>
            <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded-full">
              {folder?.noteCount || 0}
            </span>
          </div>
          <div className="text-xs text-text-secondary">
            Modified {formatDate(folder?.lastModified)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename?.(folder);
            }}
            className="p-1 rounded hover:bg-background transition-colors"
            title="Rename"
          >
            <Icon name="Edit2" size={14} className="text-text-secondary" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(folder);
            }}
            className="p-1 rounded hover:bg-background transition-colors"
            title="Delete"
          >
            <Icon name="Trash2" size={14} className="text-error" />
          </button>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {folder?.children?.map((child) => (
            <FolderTreeItem
              key={child?.id}
              folder={child}
              depth={depth + 1}
              selectedFolders={selectedFolders}
              expandedFolders={expandedFolders}
              onSelect={onSelect}
              onExpand={onExpand}
              onRename={onRename}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              draggedFolder={draggedFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderTree = ({ 
  folders, 
  selectedFolders, 
  expandedFolders, 
  onSelect, 
  onExpand, 
  onRename, 
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  draggedFolder 
}) => {
  return (
    <div className="divide-y divide-border">
      {folders?.map((folder) => (
        <FolderTreeItem
          key={folder?.id}
          folder={folder}
          selectedFolders={selectedFolders}
          expandedFolders={expandedFolders}
          onSelect={onSelect}
          onExpand={onExpand}
          onRename={onRename}
          onDelete={onDelete}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          draggedFolder={draggedFolder}
        />
      ))}
    </div>
  );
};

export default FolderTree;