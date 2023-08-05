import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { token } = auth;

  return useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: async ({ deletingUserId }) => {
      const data = await fetch(`${API_URL}/api/user/admin/${userId}/${deletingUserId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getAllUsers');
      toast.success('User deleted successfully');
    },
    onError: () => {
      toast.error('Ooops! Something went wrong!');
    },
  });
}
