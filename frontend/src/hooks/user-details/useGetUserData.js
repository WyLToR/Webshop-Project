import { useQuery } from 'react-query';
import { API_URL } from '../../constants/backendConfig';

function useGetUser({ id, token }) {
  return useQuery({
    queryKey: ['getUserData', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    },
  });
}

export default useGetUser;
