import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../../../components/AppIcon';

const NoteCard = ({
  note,
  isSelected = false,
  isSelectionMode = false,
  onLongPress,
  onSelect,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isSelectionMode) {
      onSelect?.();
    } else {
      navigate('/task-detail-edit', {
        state: {
          mode: 'edit',
          type: 'note',
          noteId: note?.id,
        },
      });
    }
  };

  const handleLongPress = () => {
    if (!isSelectionMode) {
      onLongPress?.();
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    // Handle favorite toggle
    console.log('Toggle favorite for note:', note?.id);
  };

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleLongPress}
      className={`bg-surface border rounded-lg p-4 cursor-pointer transition-all hover-lift ${
        isSelected
          ? 'border-primary bg-primary-light shadow-elevation-1'
          : 'border-border hover:border-primary-light'
      } ${isSelectionMode ? 'select-none' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-text-primary truncate mb-1">
            {note?.title}
          </h3>
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <span>Modified {formatDate(note?.modifiedAt)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-2">
          {isSelectionMode && (
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isSelected ? 'bg-primary border-primary' : 'border-border'
              }`}
            >
              {isSelected && (
                <Icon name="Check" size={12} color="white" strokeWidth={3} />
              )}
            </div>
          )}

          {!isSelectionMode && (
            <button
              onClick={handleFavoriteClick}
              className={`p-1 rounded-full transition-colors ${
                note?.isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-text-secondary hover:text-red-500'
              }`}
            >
              <Icon
                name="Heart"
                size={16}
                fill={note?.isFavorite ? 'currentColor' : 'none'}
              />
            </button>
          )}
        </div>
      </div>

      {/* Content Preview */}
      <div className="mb-3">
        <p className="text-sm text-text-secondary line-clamp-3">
          {note?.preview ||
            note?.content?.replace(/[#*`]/g, '').substring(0, 150)}
        </p>
      </div>

      {/* Tags */}
      {note?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note?.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background text-text-secondary"
            >
              #{tag}
            </span>
          ))}
          {note?.tags?.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background text-text-secondary">
              +{note?.tags?.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="FileText" size={14} />
          <span>{note?.content?.length || 0} characters</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span>Created {formatDate(note?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
