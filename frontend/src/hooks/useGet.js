import { useQuery } from 'react-query';
import { API_URL } from '../constants/backendConfig';

function useGet(endpoint, token) {
  return useQuery({
    queryKey: ['getData'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        headers: token && {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    },
  });
}

export default useGet;
