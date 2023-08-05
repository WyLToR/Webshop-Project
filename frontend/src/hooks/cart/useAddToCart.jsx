import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

function useAddToCart() {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  return useMutation({
    mutationKey: ['newCartItem'],
    mutationFn: async (product) => {
      const resp = await fetch(`${API_URL}/api/cart/${auth.id}`, {
        method: 'POST',
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
      toast.success('Product successfully added to cart 😍', {
        draggable: true,
        theme: 'colored',
      });
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
}
export default useAddToCart;
