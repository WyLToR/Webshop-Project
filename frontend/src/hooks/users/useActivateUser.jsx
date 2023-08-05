import { useMutation } from 'react-query';
import { API_URL } from '../../constants/backendConfig';

export default function useActivateUser() {
  return useMutation({
    mutationKey: ['setActivateUser'],
    mutationFn: async (userId) => {
      const data = await fetch(`${API_URL}/auth/activate/${userId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      });
      return data;
    },
  });
}
