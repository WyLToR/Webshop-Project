import { useQuery } from 'react-query';
import { API_URL } from '../../constants/backendConfig';

export default function useGetProducts(usp) {
  return useQuery({
    queryKey: ['getAllProducts'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/product?${usp.toString()}`);
      const data = await response.json();
      return data;
    },
  });
}
