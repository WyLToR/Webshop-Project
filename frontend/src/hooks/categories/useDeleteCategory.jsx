import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { token } = auth;

  return useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: async ({ categoryId }) => {
      const data = await fetch(`${API_URL}/api/category/${userId}/${categoryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getAllCategories');
      toast.success('Category created successfully');
    },
    onError: () => {
      toast.error('Ooops! Something went wrong!');
    },
  });
}
