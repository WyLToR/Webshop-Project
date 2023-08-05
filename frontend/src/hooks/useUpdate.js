import { useMutation } from 'react-query';
import { API_URL } from '../constants/backendConfig';

function useUpdate(endpoint, token, productFormData) {
  return useMutation({
    mutationKey: ['updateData'],
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: productFormData,
      });
      const data = await response.json();
      return data;
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.error(err);
    },
  });
}

export default useUpdate;
