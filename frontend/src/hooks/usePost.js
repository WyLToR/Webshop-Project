import { useMutation } from 'react-query';
import { API_URL } from '../constants/backendConfig';

function usePost(endpoint, token, productFormData) {
  return useMutation({
    mutationKey: ['newData'],
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
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

export default usePost;
