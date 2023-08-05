import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useUpdateUserRole() {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const adminUserId = auth.id;
  const { token } = auth;

  return useMutation({
    mutationKey: ['updateUserRole'],
    mutationFn: async ({ isAdmin, userId }) => {
      const data = await fetch(`${API_URL}/api/user/admin/permission/${adminUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isAdmin, userId }),
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getAllUsers');
      toast.success('User role updated successfully!');
    },
    onError: () => {
      toast.error('Ooops! Something went wrong!');
    },
  });
}
