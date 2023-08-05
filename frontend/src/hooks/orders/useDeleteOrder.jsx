import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { token } = auth;

  return useMutation({
    mutationKey: ['deleteOrder'],
    mutationFn: async ({ orderId }) => {
      const data = await fetch(`${API_URL}/api/order/admin/delete/${userId}/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getAllOrders');
      toast.success('Order deleted successfully');
    },
    onError: () => {
      toast.error('Ooops! Something went wrong!');
    },
  });
}
