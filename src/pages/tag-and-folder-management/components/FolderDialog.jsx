import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FolderDialog = ({ title, folder, folders, onConfirm, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentId: null
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (folder) {
      setFormData({
        name: folder?.name || '',
        description: folder?.description || '',
        parentId: folder?.parentId || null
      });
    }
  }, [folder]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Folder name is required';
    } else if (formData?.name?.trim().length < 2) {
      newErrors.name = 'Folder name must be at least 2 characters';
    } else if (formData?.name?.trim().length > 50) {
      newErrors.name = 'Folder name must be less than 50 characters';
    }

    // Check for duplicate names in the same parent
    const siblingFolders = folders?.filter(f => 
      f?.parentId === formData?.parentId && f?.id !== folder?.id
    ) || [];
    
    if (siblingFolders?.some(f => f?.name?.toLowerCase() === formData?.name?.trim().toLowerCase())) {
      newErrors.name = 'A folder with this name already exists in the same location';
    }

    if (formData?.description && formData?.description?.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirm?.({
        ...formData,
        name: formData?.name?.trim(),
        description: formData?.description?.trim()
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getFlatFolderList = (folderList, depth = 0) => {
    let result = [];
    folderList?.forEach(f => {
      // Don't include the current folder or its descendants in parent options
      if (folder && (f?.id === folder?.id || isDescendant(f, folder?.id))) {
        return;
      }
      
      result.push({
        ...f,
        depth,
        displayName: '  '.repeat(depth) + f?.name
      });
      
      if (f?.children?.length > 0) {
        result = result.concat(getFlatFolderList(f?.children, depth + 1));
      }
    });
    return result;
  };

  const isDescendant = (folder, ancestorId) => {
    if (folder?.parentId === ancestorId) return true;
    const parent = folders?.find(f => f?.id === folder?.parentId);
    return parent ? isDescendant(parent, ancestorId) : false;
  };

  const flatFolders = getFlatFolderList(folders);

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            {title}
          </h2>
          <button
            onClick={onCancel}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Folder Name */}
          <div>
            <label htmlFor="folderName" className="block text-sm font-medium text-text-primary mb-2">
              Folder Name *
            </label>
            <input
              id="folderName"
              type="text"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter folder name"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors?.name ? 'border-error' : 'border-border'
              }`}
              maxLength={50}
            />
            {errors?.name && (
              <p className="mt-1 text-sm text-error">{errors?.name}</p>
            )}
          </div>

          {/* Parent Folder */}
          <div>
            <label htmlFor="parentFolder" className="block text-sm font-medium text-text-primary mb-2">
              Parent Folder
            </label>
            <select
              id="parentFolder"
              value={formData?.parentId || ''}
              onChange={(e) => handleInputChange('parentId', e.target.value || null)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Root (No parent)</option>
              {flatFolders?.map((f) => (
                <option key={f?.id} value={f?.id}>
                  {f?.displayName}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="folderDescription" className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              id="folderDescription"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Optional description"
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                errors?.description ? 'border-error' : 'border-border'
              }`}
              maxLength={200}
            />
            <div className="flex justify-between mt-1">
              {errors?.description && (
                <p className="text-sm text-error">{errors?.description}</p>
              )}
              <p className="text-xs text-text-secondary ml-auto">
                {formData?.description?.length || 0}/200
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
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
              variant="primary"
              className="flex-1"
            >
              {folder ? 'Save Changes' : 'Create Folder'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderDialog;