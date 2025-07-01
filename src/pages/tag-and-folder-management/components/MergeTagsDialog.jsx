import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MergeTagsDialog = ({ tags, onConfirm, onCancel }) => {
  const [formData, setFormData] = useState({
    targetTagId: tags?.[0]?.id || '',
    newName: '',
    newColor: tags?.[0]?.color || '#2563EB',
    newDescription: ''
  });
  const [mergeMode, setMergeMode] = useState('existing'); // 'existing' or 'new'

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mergeData = {
      mode: mergeMode,
      ...(mergeMode === 'existing' 
        ? { targetTagId: formData?.targetTagId }
        : {
          newTag: {
            name: formData?.newName?.trim(),
            color: formData?.newColor,
            description: formData?.newDescription?.trim()
          }
        }
      )
    };

    onConfirm?.(mergeData);
  };

  const getTotalUsageCount = () => {
    return tags?.reduce((acc, tag) => acc + (tag?.usageCount || 0), 0) || 0;
  };

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Merge Tags
          </h2>
          <button
            onClick={onCancel}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tags to Merge */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Tags to merge ({tags?.length}):
            </h3>
            <div className="flex flex-wrap gap-2 p-3 bg-background rounded-lg">
              {tags?.map((tag) => (
                <span
                  key={tag?.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: tag?.color }}
                >
                  #{tag?.name}
                  <span className="ml-1 text-xs opacity-75">
                    ({tag?.usageCount})
                  </span>
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              Total usage count: {getTotalUsageCount()}
            </p>
          </div>

          {/* Merge Options */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">
              Merge into:
            </h3>
            <div className="space-y-3">
              <label className="flex items-start space-x-3">
                <input
                  type="radio"
                  name="mergeMode"
                  value="existing"
                  checked={mergeMode === 'existing'}
                  onChange={(e) => setMergeMode(e.target.value)}
                  className="mt-0.5 text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="font-medium text-text-primary">
                    Existing tag
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    Merge all tags into one of the selected tags
                  </p>
                  {mergeMode === 'existing' && (
                    <select
                      value={formData?.targetTagId}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetTagId: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {tags?.map((tag) => (
                        <option key={tag?.id} value={tag?.id}>
                          #{tag?.name} ({tag?.usageCount} uses)
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="radio"
                  name="mergeMode"
                  value="new"
                  checked={mergeMode === 'new'}
                  onChange={(e) => setMergeMode(e.target.value)}
                  className="mt-0.5 text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="font-medium text-text-primary">
                    New tag
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    Create a new tag and merge all selected tags into it
                  </p>
                  {mergeMode === 'new' && (
                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          placeholder="New tag name"
                          value={formData?.newName}
                          onChange={(e) => setFormData(prev => ({ ...prev, newName: e.target.value }))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          required={mergeMode === 'new'}
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <input
                            type="color"
                            value={formData?.newColor}
                            onChange={(e) => setFormData(prev => ({ ...prev, newColor: e.target.value }))}
                            className="w-8 h-8 border border-border rounded cursor-pointer"
                          />
                          <span className="text-sm text-text-secondary">Color</span>
                        </div>
                      </div>
                      <div>
                        <textarea
                          placeholder="Optional description"
                          value={formData?.newDescription}
                          onChange={(e) => setFormData(prev => ({ ...prev, newDescription: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Warning */}
          <div className="p-3 bg-warning-light border border-warning rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-warning-dark mb-1">
                  This action cannot be undone
                </div>
                <div className="text-warning-dark">
                  All selected tags will be merged, and their individual identities will be lost. 
                  All notes tagged with these tags will be updated to use the target tag.
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="warning"
              className="flex-1"
              disabled={mergeMode === 'new' && !formData?.newName?.trim()}
            >
              Merge Tags
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MergeTagsDialog;