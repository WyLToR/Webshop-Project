/* eslint-disable react/prop-types */
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import useDeleteOrder from '../../hooks/orders/useDeleteOrder';
import AdminModal from './AdminModal';

export default function DeleteOrderModal({
  selectedOrder, show, setShow,
}) {
  const { mutate } = useDeleteOrder();
  const deleteOrder = () => {
    mutate({ orderId: selectedOrder });
    setShow(false);
  };

  return (
    <AdminModal
      show={show}
      setShow={setShow}
      title="Confirm Order Deletion"
      content={(
        <>
          <Alert className="text-justify" variant="danger">
            <h5>
              {`Are you absolutely sure you want to delete the order "${selectedOrder}"`}
            </h5>
            <br />
            <p>
              This action is irreversible and will permanently remove the order from the webshop.
            </p>
          </Alert>

          <Stack gap={2} className="md-5 mx-auto mt-3">
            <Button onClick={deleteOrder} variant="danger">Delete</Button>
            <Button onClick={() => setShow(false)} variant="outline-secondary">Cancel</Button>
          </Stack>
        </>
      )}
    />
  );
}
