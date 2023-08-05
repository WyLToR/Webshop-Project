import {
  Alert,
  Badge, Button, Container, Spinner, Stack, Table,
} from 'react-bootstrap';
import { useState } from 'react';
import useGetOrderById from '../../hooks/orders/useGetOrderById';
import dateFormatter from '../../utils/dateFormatter';
import useCompleteOrder from '../../hooks/orders/useCompleteOrder';

export default function OrderDetails({ orderId, setShow }) {
  const { data, isLoading } = useGetOrderById(orderId);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { mutate } = useCompleteOrder();

  const handleCompleteOrder = () => {
    setShowConfirmation(true);
  };

  const handleConfirmToggle = () => {
    mutate({ orderId: data.id });
    setShowConfirmation(false);
  };

  const handleCancelToggle = () => {
    setShowConfirmation(false);
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Container>
      {data.is_deleted && <Alert variant="danger">This order has been deleted</Alert>}
      <Table striped bordered hover className={data.is_deleted ? 'table-danger' : ''}>
        <tbody>
          <tr>
            <td><strong>Order ID:</strong></td>
            <td>{data?.id}</td>
          </tr>
          <tr>
            <td><strong>User ID:</strong></td>
            <td>{data.user_id}</td>
          </tr>
          <tr>
            <td><strong>Order Created:</strong></td>
            <td>{dateFormatter(data.created)}</td>
          </tr>
          <tr>
            <td><strong>Delivery Date:</strong></td>
            <td>{dateFormatter(data.delivery_date)}</td>
          </tr>
          <tr>
            <td><strong>Delivery:</strong></td>
            <td>
              {data.is_done ? <Badge bg="success">Delivered</Badge> : <Badge bg="warning">In Progress...</Badge>}
              {!showConfirmation && !data.is_done && !data.is_deleted && (
                <Button className="ms-5" variant="primary" size="sm" onClick={handleCompleteOrder}>
                  Complete Order
                </Button>
              )}
              {showConfirmation && (
                <>
                  <Button
                    className="ms-5"
                    variant="success"
                    size="sm"
                    onClick={handleConfirmToggle}
                    style={{ marginRight: '5px' }}
                  >
                    Confirm
                  </Button>
                  <Button variant="danger" size="sm" onClick={handleCancelToggle}>
                    Cancel
                  </Button>
                </>
              )}
            </td>
          </tr>
          <tr>
            <td><strong>Customer Name:</strong></td>
            <td>{`${data.first_name} ${data.last_name}`}</td>
          </tr>
          <tr>
            <td><strong>Customer Email:</strong></td>
            <td>{data.email}</td>
          </tr>
        </tbody>
      </Table>

      <h4>Products List:</h4>
      <Table striped bordered hover className={data.is_deleted ? 'table-danger' : ''}>
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Amount</th>
            <th className="text-center">Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {data.productslist.map((product) => (
            <tr key={product.product}>
              <td>{product.product}</td>
              <td className="text-center">{product.amount}</td>
              <td className="text-center">{`$ ${product.sub_total}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>
        <strong>Total Price: </strong>
        {`$ ${data.total_price}`}
      </h4>
      <Stack gap={2} className="md-5 mx-auto mt-3">
        <Button onClick={() => setShow(false)} variant="outline-danger">Close Order Details</Button>
      </Stack>
    </Container>
  );
}
