import { useQuery } from 'react-query';
import { API_URL } from '../../constants/backendConfig';

export default function useGetProductById({ productId }) {
  return useQuery({
    queryKey: ['getProductById', productId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/product/${productId}`);
      const data = await response.json();
      return data;
    },
  });
}
