import { useQuery } from 'react-query';
import { API_URL } from '../../constants/backendConfig';

function useGetUserShippingAdress(id, token) {
  return useQuery({
    queryKey: ['getUserShippingAdress', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/user/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return {
        postCode: data.postcode,
        state: data.state,
        city: data.city,
        street: data.street,
        houseNumber: data.house_number,
      };
    },
  });
}

export default useGetUserShippingAdress;
