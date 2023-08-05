import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

function useSetOrder() {
  const { auth } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const userId = auth.id;
  const { token } = auth;

  return useMutation({
    mutationKey: ['addOrder'],
    mutationFn: async (date) => {
      const response = await fetch(`${API_URL}/api/order/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ deliveryDate: date }),
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getUserCart');
      toast.success('Your order has been placed ❤️❤️❤️', {
        draggable: true,
        theme: 'colored',
      });
    },
  });
}
export default useSetOrder;
