import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (user: { role: string }) => {
    switch (user.role) {
      case 'PATIENT':
        navigate('/patient');
        break;
      case 'DOCTOR':
        navigate('/doctor');   // ✅ Correct path
        break;
      case 'ADMIN':
        navigate('/admin');
        break;
      default:
        navigate('/login'); // fallback
    }
  };

  return (
    <div>
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
