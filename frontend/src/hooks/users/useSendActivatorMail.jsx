import { useMutation } from 'react-query';
import { API_URL } from '../../constants/backendConfig';

export default function useSendActivatorMail() {
  return useMutation({
    mutationKey: ['sendEmailActivator'],
    mutationFn: async (email) => {
      const response = await fetch(`${API_URL}/auth/resend`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(email),
      });
      const data = await response.json();
      return data;
    },
  });
}
