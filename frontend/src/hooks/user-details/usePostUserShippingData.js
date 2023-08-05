import { useMutation, useQueryClient } from 'react-query';
import { API_URL } from '../../constants/backendConfig';

function useUpdateUserShippingAdress(id, token) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUserShippingAdress'],
    mutationFn: async (form) => {
      const response = await fetch(`${API_URL}/api/user/orderdata/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries('getUserShippingAdress');
    },
  });
}

export default useUpdateUserShippingAdress;
