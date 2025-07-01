import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirect = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login-screen');
  };

  return (
    <div className="text-center">
      <p className="text-sm text-text-secondary">
        Already have an account?{' '}
        <button
          onClick={handleSignInClick}
          className="font-medium text-primary hover:text-primary/80 transition-micro focus:outline-none focus:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default LoginRedirect;