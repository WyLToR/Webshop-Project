import { useQueryClient, useMutation } from 'react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useCreateCategory() {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { token } = auth;

  return useMutation({
    mutationKey: ['createCategory'],
    mutationFn: async ({ category }) => {
      const response = await fetch(`${API_URL}/api/category/${userId}`, {
        method: 'POST',
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
