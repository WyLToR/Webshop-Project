import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { token } = auth;

  return useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: async ({ categoryId, category }) => {
      const response = await fetch(`${API_URL}/api/category/${userId}/${categoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category }),
      });
      const data = await response.json();
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
