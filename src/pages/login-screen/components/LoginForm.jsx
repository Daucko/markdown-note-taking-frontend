import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, error }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password or show modal
    console.log('Forgot password clicked');
  };

  const handleCreateAccount = () => {
    navigate('/register-screen');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          disabled={isLoading}
          className={`w-full ${validationErrors.email ? 'border-error focus:ring-error' : ''}`}
        />
        {validationErrors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {validationErrors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            disabled={isLoading}
            className={`w-full pr-10 ${validationErrors.password ? 'border-error focus:ring-error' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            <Icon 
              name={showPassword ? 'EyeOff' : 'Eye'} 
              size={18} 
              className="text-text-secondary hover:text-text-primary transition-micro"
            />
          </button>
        </div>
        {validationErrors.password && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {validationErrors.password}
          </p>
        )}
      </div>

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-micro"
          disabled={isLoading}
        >
          Forgot Password?
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-md p-3">
          <div className="flex items-center">
            <Icon name="AlertCircle" size={18} className="text-error mr-2" />
            <p className="text-sm text-error">{error}</p>
          </div>
        </div>
      )}

      {/* Sign In Button */}
      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        disabled={isLoading}
        className="w-full py-3"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      {/* Create Account Button */}
      <div className="text-center">
        <p className="text-sm text-text-secondary mb-3">
          Don't have an account?
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={handleCreateAccount}
          disabled={isLoading}
          className="w-full"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;