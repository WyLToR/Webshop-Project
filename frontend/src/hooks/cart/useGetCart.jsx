import { useContext } from 'react';
import { useQuery } from 'react-query';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

function useGetCart() {
  const { auth } = useContext(AuthContext);
  return useQuery({
    queryKey: ['getUserCart'],
    queryFn: async () => {
      if (!auth?.id) {
        return null;
      }
      const response = await fetch(`${API_URL}/api/cart/${auth.id}`, {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();
      return data;
    },
  });
}

export default useGetCart;
