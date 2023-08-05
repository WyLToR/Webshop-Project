import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/backendConfig';
import { AuthContext } from '../../contexts/AuthContext';

export default function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { token } = auth;

  return useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: async ({ productId, productData, selectedImage }) => {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description || '');
      formData.append('price', productData.price);
      formData.append('quantity', productData.quantity);
      if (selectedImage) formData.append('productPicture', selectedImage);
      productData?.categories.map((category) => formData.append('categoryIds[]', category));

      const response = await fetch(`${API_URL}/api/product/${userId}/${productId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('getAllProducts');
      toast.success('Product updated successfully');
    },
    onError: () => {
      toast.error('Ooops! Something went wrong!');
    },
  });
}
