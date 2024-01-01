// AuthWrapper.tsx
import React, { useEffect } from 'react';
import { Routes, useNavigate } from 'react-router-dom';

interface AuthWrapperProps {
  children?: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    if (!authToken) {
      // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/');
    }
  }, [authToken, navigate]);

  // Renvoie null si l'utilisateur n'est pas authentifié, ce qui empêchera le rendu des enfants
  return authToken ? <Routes>{children}</Routes> : null;
};

export default AuthWrapper;
