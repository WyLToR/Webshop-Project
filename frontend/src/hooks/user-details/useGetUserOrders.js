import { useQuery } from 'react-query';
import { API_URL } from '../../constants/backendConfig';

function useGetUserOrder(id, token, usp) {
  return useQuery({
    queryKey: ['getUserOrders', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/order/${id}?${usp.toString()}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    },
  });
}

export default useGetUserOrder;
