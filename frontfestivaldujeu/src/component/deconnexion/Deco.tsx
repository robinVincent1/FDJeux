import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Deco = () => {
  const nav = useNavigate();

  useEffect(() => {

    localStorage.removeItem('token');
    nav('/');
  });


  return (
    <div>
    </div>
  );
};
