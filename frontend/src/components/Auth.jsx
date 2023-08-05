import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Auth({ children }) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const url = window.location.pathname;
    if (!auth?.email) navigate('/');
    if (!auth?.isAdmin && /admin/.test(url)) navigate('/');
  });
  return children;
}
