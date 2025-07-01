import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TagDialog = ({ title, tag, onConfirm, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    color: '#2563EB',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const colorOptions = [
    '#2563EB', // blue
    '#059669', // emerald
    '#D97706', // amber
    '#DC2626', // red
    '#7C3AED', // violet
    '#E11D48', // rose
    '#0891B2', // cyan
    '#65A30D', // lime
    '#C2410C', // orange
    '#9333EA', // purple
  ];

  useEffect(() => {
    if (tag) {
      setFormData({
        name: tag?.name || '',
        color: tag?.color || '#2563EB',
        description: tag?.description || ''
      });
    }
  }, [tag]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Tag name is required';
    } else if (formData?.name?.trim().length < 2) {
      newErrors.name = 'Tag name must be at least 2 characters';
    } else if (formData?.name?.trim().length > 30) {
      newErrors.name = 'Tag name must be less than 30 characters';
    } else if (!/^[a-zA-Z0-9-_]+$/.test(formData?.name?.trim())) {
      newErrors.name = 'Tag name can only contain letters, numbers, hyphens, and underscores';
    }

    if (formData?.description && formData?.description?.length > 100) {
      newErrors.description = 'Description must be less than 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirm?.({
        ...formData,
        name: formData?.name?.trim().toLowerCase(),
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
          {/* Tag Name */}
          <div>
            <label htmlFor="tagName" className="block text-sm font-medium text-text-primary mb-2">
              Tag Name *
            </label>
            <div className="relative">
              <input
                id="tagName"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter tag name"
                className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors?.name ? 'border-error' : 'border-border'
                }`}
                maxLength={30}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-text-secondary">#</span>
              </div>
            </div>
            {errors?.name && (
              <p className="mt-1 text-sm text-error">{errors?.name}</p>
            )}
            <p className="mt-1 text-xs text-text-secondary">
              Use lowercase letters, numbers, hyphens, and underscores only
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions?.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleInputChange('color', color)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    formData?.color === color
                      ? 'border-text-primary scale-110' :'border-border hover:border-text-secondary'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="color"
                value={formData?.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-8 h-8 border border-border rounded cursor-pointer"
              />
              <span className="text-sm text-text-secondary">
                Or choose custom color
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="tagDescription" className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              id="tagDescription"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Optional description"
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                errors?.description ? 'border-error' : 'border-border'
              }`}
              maxLength={100}
            />
            <div className="flex justify-between mt-1">
              {errors?.description && (
                <p className="text-sm text-error">{errors?.description}</p>
              )}
              <p className="text-xs text-text-secondary ml-auto">
                {formData?.description?.length || 0}/100
              </p>
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preview
            </label>
            <div
              className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: formData?.color }}
            >
              #{formData?.name || 'tag-name'}
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
              {tag ? 'Save Changes' : 'Create Tag'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagDialog;