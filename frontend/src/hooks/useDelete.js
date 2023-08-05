import { useMutation } from 'react-query';
import { API_URL } from '../constants/backendConfig';

function useDelete(endpoint, token) {
  return useMutation({
    mutationKey: ['deleteData'],
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    },
  });
}

export default useDelete;
