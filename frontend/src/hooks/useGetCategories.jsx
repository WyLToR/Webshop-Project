import { useQuery } from 'react-query';
import { API_URL } from '../constants/backendConfig';

function useGetCategory() {
  return useQuery({
    queryKey: ['getCategories'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/category?pageLimit=200`);
      const categoryData = await response.json();
      return categoryData;
    },
  });
}

export default useGetCategory;
