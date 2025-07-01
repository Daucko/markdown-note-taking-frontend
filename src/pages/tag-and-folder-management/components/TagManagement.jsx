import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TagCloud from './TagCloud';
import TagDialog from './TagDialog';
import ConfirmDialog from './ConfirmDialog';
import MergeTagsDialog from './MergeTagsDialog';

const TagManagement = ({ tags, onAction, searchQuery }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [viewMode, setViewMode] = useState('cloud'); // 'cloud' or 'list'

  const handleTagSelect = (tagId, isMultiSelect = false) => {
    if (isMultiSelect) {
      setSelectedTags(prev =>
        prev.includes(tagId)
          ? prev.filter(id => id !== tagId)
          : [...prev, tagId]
      );
    } else {
      setSelectedTags([tagId]);
    }
  };

  const handleCreateTag = () => {
    setShowCreateDialog(true);
    setEditingTag(null);
  };

  const handleEditTag = (tag) => {
    setEditingTag(tag);
    setShowEditDialog(true);
  };

  const handleDeleteTag = (tag) => {
    setEditingTag(tag);
    setShowDeleteDialog(true);
  };

  const handleBulkActions = (action) => {
    if (selectedTags?.length === 0) return;

    switch (action) {
      case 'delete':
        setShowDeleteDialog(true);
        break;
      case 'merge':
        if (selectedTags?.length >= 2) {
          setShowMergeDialog(true);
        }
        break;
      default:
        break;
    }
  };

  const confirmCreateTag = (tagData) => {
    onAction?.('create', null, tagData);
    setShowCreateDialog(false);
  };

  const confirmEditTag = (tagData) => {
    onAction?.('edit', editingTag?.id, tagData);
    setShowEditDialog(false);
    setEditingTag(null);
  };

  const confirmDeleteTag = () => {
    if (editingTag) {
      onAction?.('delete', editingTag?.id);
    } else if (selectedTags?.length > 0) {
      selectedTags?.forEach(tagId => {
        onAction?.('delete', tagId);
      });
      setSelectedTags([]);
    }
    setShowDeleteDialog(false);
    setEditingTag(null);
  };

  const confirmMergeTags = (mergeData) => {
    onAction?.('merge', selectedTags, mergeData);
    setShowMergeDialog(false);
    setSelectedTags([]);
  };

  const getTagFrequencyData = () => {
    return tags?.map(tag => ({
      ...tag,
      size: Math.max(12, Math.min(32, 12 + (tag?.usageCount || 0) * 2))
    })) || [];
  };

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  if (tags?.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No tags found
        </h3>
        <p className="text-text-secondary">
          Try adjusting your search terms
        </p>
      </div>
    );
  }

  if (tags?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Tag" size={48} className="mx-auto text-text-secondary mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No tags yet
        </h3>
        <p className="text-text-secondary mb-6">
          Create your first tag to categorize your notes
        </p>
        <Button
          variant="primary"
          iconName="Plus"
          onClick={handleCreateTag}
        >
          Create Tag
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary">
            {tags?.length} tags • {tags?.reduce((acc, tag) => acc + (tag?.usageCount || 0), 0)} total usages
          </div>
          <div className="flex items-center bg-background rounded-lg p-1">
            <button
              onClick={() => setViewMode('cloud')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                viewMode === 'cloud' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Cloud
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                viewMode === 'list' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              List
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {selectedTags?.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                onClick={() => handleBulkActions('delete')}
              >
                Delete ({selectedTags?.length})
              </Button>
              {selectedTags?.length >= 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="GitMerge"
                  onClick={() => handleBulkActions('merge')}
                >
                  Merge
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTags([])}
              >
                Cancel
              </Button>
            </>
          )}
          <Button
            variant="primary"
            size="sm"
            iconName="Plus"
            onClick={handleCreateTag}
          >
            New Tag
          </Button>
        </div>
      </div>

      {/* Tag Display */}
      <div className="bg-surface border border-border rounded-lg p-6">
        {viewMode === 'cloud' ? (
          <TagCloud
            tags={getTagFrequencyData()}
            selectedTags={selectedTags}
            onSelect={handleTagSelect}
            onEdit={handleEditTag}
            onDelete={handleDeleteTag}
          />
        ) : (
          <div className="space-y-2">
            {tags?.map((tag) => (
              <div
                key={tag?.id}
                onClick={() => handleTagSelect(tag?.id, true)}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedTags?.includes(tag?.id)
                    ? 'border-primary bg-primary-light' :'border-border hover:border-primary-light hover:bg-background'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: tag?.color }}
                  />
                  <div>
                    <div className="font-medium text-text-primary">
                      #{tag?.name}
                    </div>
                    {tag?.description && (
                      <div className="text-sm text-text-secondary">
                        {tag?.description}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="text-center">
                    <div className="font-medium text-text-primary">
                      {tag?.usageCount}
                    </div>
                    <div>uses</div>
                  </div>
                  <div className="text-center">
                    <div>Last used</div>
                    <div>{formatDate(tag?.lastUsed)}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTag(tag);
                      }}
                      className="p-1 rounded hover:bg-background transition-colors"
                    >
                      <Icon name="Edit2" size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTag(tag);
                      }}
                      className="p-1 rounded hover:bg-background transition-colors text-error"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Tag Dialog */}
      {showCreateDialog && (
        <TagDialog
          title="Create New Tag"
          tag={null}
          onConfirm={confirmCreateTag}
          onCancel={() => setShowCreateDialog(false)}
        />
      )}

      {/* Edit Tag Dialog */}
      {showEditDialog && (
        <TagDialog
          title="Edit Tag"
          tag={editingTag}
          onConfirm={confirmEditTag}
          onCancel={() => {
            setShowEditDialog(false);
            setEditingTag(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <ConfirmDialog
          title={editingTag ? "Delete Tag" : "Delete Tags"}
          message={
            editingTag
              ? `Are you sure you want to delete the tag "${editingTag?.name}"? This will remove it from ${editingTag?.usageCount} notes.`
              : `Are you sure you want to delete ${selectedTags?.length} tags? This will remove them from all associated notes.`
          }
          confirmText="Delete"
          confirmVariant="danger"
          onConfirm={confirmDeleteTag}
          onCancel={() => {
            setShowDeleteDialog(false);
            setEditingTag(null);
          }}
        />
      )}

      {/* Merge Tags Dialog */}
      {showMergeDialog && (
        <MergeTagsDialog
          tags={tags?.filter(tag => selectedTags?.includes(tag?.id))}
          onConfirm={confirmMergeTags}
          onCancel={() => setShowMergeDialog(false)}
        />
      )}
    </div>
  );
};

export default TagManagement;