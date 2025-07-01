import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import LoginForm from './components/LoginForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import LoadingOverlay from './components/LoadingOverlay';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: 'demo@taskmanager.com',
    password: 'demo123'
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');
    setShowLoadingOverlay(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock authentication logic
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Simulate successful login
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          email: formData.email,
          name: 'Demo User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }));
        
        setShowLoadingOverlay(false);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid email or password. Please use demo@taskmanager.com / demo123');
      }
    } catch (err) {
      setError(err.message);
      setShowLoadingOverlay(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setShowLoadingOverlay(true);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful Google login
      localStorage.setItem('authToken', 'mock-google-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        id: 2,
        email: 'user@gmail.com',
        name: 'Google User',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }));
      
      setShowLoadingOverlay(false);
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed. Please try again.');
      setShowLoadingOverlay(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    setShowLoadingOverlay(true);
    
    try {
      // Simulate Apple OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful Apple login
      localStorage.setItem('authToken', 'mock-apple-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        id: 3,
        email: 'user@icloud.com',
        name: 'Apple User',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }));
      
      setShowLoadingOverlay(false);
      navigate('/dashboard');
    } catch (err) {
      setError('Apple login failed. Please try again.');
      setShowLoadingOverlay(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthenticationLayout
        title="Welcome Back"
        subtitle="Sign in to your account to continue"
      >
        <div className="space-y-6">
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />
          
          <SocialLoginButtons
            onGoogleLogin={handleGoogleLogin}
            onAppleLogin={handleAppleLogin}
            isLoading={isLoading}
          />
        </div>
      </AuthenticationLayout>

      <LoadingOverlay 
        isVisible={showLoadingOverlay}
        message="Signing you in..."
      />
    </>
  );
};

export default LoginScreen;