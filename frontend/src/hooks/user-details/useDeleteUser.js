import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import AuthService from '../../services/auth-services';

function useDeleteUser(id, token, setAuth) {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/api/user/active/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      setAuth({
        user: undefined,
        token: undefined,
      });
      AuthService.logOut();
      navigate('/');
      toast.success('Account has been deleted!');
    },
  });
}

export default useDeleteUser;
