import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <RegisterForm onSuccess={() => navigate('/login')} />
    </div>
  );
};

export default Register;
