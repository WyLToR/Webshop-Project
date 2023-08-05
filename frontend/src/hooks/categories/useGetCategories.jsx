import { useQuery } from 'react-query';
import { useContext } from 'react';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useGetCategories(usp) {
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { token } = auth;
  return useQuery({
    queryKey: ['getAllCategories'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/category/${userId}?${usp.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    },
  });
}
