import { useMutation } from 'react-query';
import { useContext } from 'react';
import jwtDecode from 'jwt-decode';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';
import AuthService from '../../services/auth-services';

function useUpdateUserData(id, tokenParam) {
  const { setAuth } = useContext(AuthContext);
  return useMutation({
    mutationKey: ['updateUserData'],
    mutationFn: async (form) => {
      const response = await fetch(`${API_URL}/api/user/basedata/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${tokenParam}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      const user = jwtDecode(data);
      localStorage.setItem('token', data);
      localStorage.setItem('user', JSON.stringify(user));
      setAuth(AuthService.getUserData());
    },
    onError: (err) => {
      console.error('Something wrong with send data', err);
    },
  });
}

export default useUpdateUserData;
