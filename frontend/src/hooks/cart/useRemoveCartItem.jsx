import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

function useRemoveCartItem() {
  const { auth } = useContext(AuthContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['removeCartItem'],
    mutationFn: async (product) => {
      const resp = await fetch(`${API_URL}/api/cart/${auth.id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${auth.token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await resp.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getUserCart');
      toast.warning('Item deleted from cart 🤯', {
        draggable: true,
        theme: 'colored',
      });
    },
    onError: () => {
      toast.error('Problem in deleting from cart');
    },
  });
}
export default useRemoveCartItem;
