import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { token } = auth;

  return useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: async ({ productId }) => {
      const data = await fetch(`${API_URL}/api/product/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getAllProducts');
      toast.success('Product deleted successfully');
    },
    onError: () => {
      toast.error('Ooops! Something went wrong!');
    },
  });
}
