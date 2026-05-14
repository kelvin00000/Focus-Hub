import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/authentication';

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userCheck = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      }
    });
    return userCheck;
  }, [navigate]);
};
