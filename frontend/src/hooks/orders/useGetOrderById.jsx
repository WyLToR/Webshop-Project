import { useQuery } from 'react-query';
import { useContext } from 'react';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useGetOrderById(orderId) {
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { token } = auth;

  return useQuery({
    queryKey: ['getOrderById'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/order/${userId}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    },
  });
}
