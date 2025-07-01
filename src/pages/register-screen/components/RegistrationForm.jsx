import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance validation
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'bg-error' };
      case 2:
      case 3:
        return { label: 'Medium', color: 'bg-warning' };
      case 4:
      case 5:
        return { label: 'Strong', color: 'bg-success' };
      default:
        return { label: 'Weak', color: 'bg-error' };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
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
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name Field */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
          Full Name
        </label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          className={`w-full ${errors.fullName ? 'border-error' : ''}`}
          required
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full ${errors.email ? 'border-error' : ''}`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.email}
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
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pr-10 ${errors.password ? 'border-error' : ''}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-micro"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-border-light rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.color}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${
                strengthInfo.color === 'bg-error' ? 'text-error' :
                strengthInfo.color === 'bg-warning' ? 'text-warning' : 'text-success'
              }`}>
                {strengthInfo.label}
              </span>
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full pr-10 ${errors.confirmPassword ? 'border-error' : ''}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-micro"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3">
        <Input
          id="acceptTerms"
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="acceptTerms" className="text-sm text-text-secondary leading-relaxed">
          I agree to the{' '}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Terms of Service
          </a>
          {' '}and{' '}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Privacy Policy
          </a>
        </label>
      </div>
      {errors.terms && (
        <p className="text-sm text-error flex items-center">
          <Icon name="AlertCircle" size={16} className="mr-1" />
          {errors.terms}
        </p>
      )}

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-error/10 border border-error/20 rounded-md p-3">
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-2" />
            {errors.submit}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;