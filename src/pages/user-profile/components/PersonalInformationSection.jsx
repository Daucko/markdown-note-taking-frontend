import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PersonalInformationSection = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onUpdate && onUpdate(formData);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="User" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Personal Information
          </h2>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-error' : ''}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error">{errors.name}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary py-2">{user.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-error' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error">{errors.email}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary py-2">{user.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'border-error' : ''}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error">{errors.phone}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary py-2">{user.phone || 'Not provided'}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6 pt-6 border-t border-border">
            <Button
              variant="primary"
              onClick={handleSave}
              loading={isLoading}
              className="sm:w-auto"
            >
              Save Changes
            </Button>
            <Button
              variant="ghost"
              onClick={handleCancel}
              disabled={isLoading}
              className="sm:w-auto"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInformationSection;