import React from 'react';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import LoginRedirect from './components/LoginRedirect';

const RegisterScreen = () => {
  return (
    <AuthenticationLayout
      title="Create Account"
      subtitle="Join Task Manager to organize your work and boost productivity"
    >
      <div className="space-y-6">
        {/* Registration Form */}
        <RegistrationForm />

        {/* Social Registration Options */}
        <SocialRegistration />

        {/* Login Redirect */}
        <LoginRedirect />
      </div>
    </AuthenticationLayout>
  );
};

export default RegisterScreen;