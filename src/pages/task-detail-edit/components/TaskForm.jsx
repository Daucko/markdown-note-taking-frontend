import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TaskForm = ({ task, onSave, onCancel, mode = 'edit' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    tags: [],
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate || '',
        status: task.status || 'pending',
        tags: task.tags || [],
      });
    }
  }, [task, mode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      onSave(formData);
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Task Title *
        </label>
        <Input
          type="text"
          placeholder="Enter task title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={errors.title ? 'border-error' : ''}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.title}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Description
        </label>
        <textarea
          placeholder="Enter task description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro resize-none ${
            errors.description ? 'border-error' : 'border-border'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.description}
          </p>
        )}
        <p className="mt-1 text-xs text-text-secondary">
          {formData.description.length}/500 characters
        </p>
      </div>

      {/* Due Date Field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Due Date
        </label>
        <Input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleInputChange('dueDate', e.target.value)}
          className={errors.dueDate ? 'border-error' : ''}
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.dueDate}
          </p>
        )}
      </div>

      {/* Status Field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro bg-surface"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          className="flex-1 sm:flex-none sm:min-w-32"
        >
          {mode === 'create' ? 'Create Task' : 'Save Changes'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 sm:flex-none sm:min-w-32"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
