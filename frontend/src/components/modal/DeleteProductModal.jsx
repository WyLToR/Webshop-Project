/* eslint-disable react/prop-types */
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import useDeleteProduct from '../../hooks/products/useDeleteProduct';
import AdminModal from './AdminModal';

export default function DeleteProductModal({
  selectedProduct, show, setShow,
}) {
  const { mutate } = useDeleteProduct();
  const deleteProduct = () => {
    mutate({ productId: selectedProduct.id });
    setShow(false);
  };

  return (
    <AdminModal
      show={show}
      setShow={setShow}
      title="Confirm Product Deletion"
      content={(
        <>
          <Alert className="text-justify" variant="danger">
            <h5>
              {`Are you absolutely sure you want to delete the product "${selectedProduct?.name}"`}
            </h5>
            <br />
            <p>
              This action is irreversible and will permanently remove the product from the webshop.
            </p>
          </Alert>

          <Stack gap={2} className="md-5 mx-auto mt-3">
            <Button onClick={deleteProduct} variant="danger">Delete</Button>
            <Button onClick={() => setShow(false)} variant="outline-secondary">Cancel</Button>
          </Stack>
        </>
      )}
    />
  );
}
