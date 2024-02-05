// AuthWrapper.tsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { robin } from './profil/ProfilPage';

interface AuthWrapperProps {
  children?: React.ReactNode;
  allowedRoles?: string[]; // Liste des rôles autorisés à accéder à la route
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');
  const [userConnected, setUserConnected] = useState(robin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await fetch(`https://festival-jeu-mtp-api.onrender.com/user/${id}`, {
          method: 'GET', // Remplacez 'GET' par la méthode que vous souhaitez utiliser
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const data = await response.json();
        setUserConnected(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!authToken) {
      // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
      navigate('/');
    } else if (allowedRoles && !allowedRoles.includes(userConnected.role || '')) {
      // Redirige vers une page d'erreur ou une page non autorisée si le rôle n'est pas autorisé
      navigate('/accueil');
    }
  }, [authToken, userConnected, navigate, allowedRoles]);

  // Renvoie null si l'utilisateur n'est pas authentifié ou n'a pas le rôle approprié
  if (!authToken || (allowedRoles && !allowedRoles.includes(userConnected.role || ''))) {
    return <Navigate to="/accueil" />;
  }

  // Renvoie les enfants si l'utilisateur est authentifié et a le rôle approprié
  return <Routes>{children}</Routes>;
};

export default AuthWrapper;

