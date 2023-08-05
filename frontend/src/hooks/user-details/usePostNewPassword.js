import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';

function useChangePassword(id, token) {
  return useMutation({
    mutationKey: ['changePassword'],
    mutationFn: async (form) => {
      console.log('ez lefut?');
      const response = await fetch(`${API_URL}/api/user/password/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      toast.success('Password has changed!');
    },
    onError: () => {
      toast.error('Password change has failed!');
    },
  });
}

export default useChangePassword;
