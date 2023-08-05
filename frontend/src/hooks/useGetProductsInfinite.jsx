import { useInfiniteQuery } from 'react-query';
import { API_URL } from '../constants/backendConfig';

export default function useGetProductsInfinite(params, limit) {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`${API_URL}/api/product/infinite?pageLimit=${limit}&page=${pageParam}&${params}`);
      return response.json();
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === limit) return pages.length + 1;
      return undefined;
    },

  });
}
