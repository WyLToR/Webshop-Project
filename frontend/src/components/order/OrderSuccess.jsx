import {
  Container, Image, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function OrderSuccess({ cart, date }) {
  const totalAmount = cart?.reduce((acc, product) => acc + product.price * product.amount, 0);
  return (
    <Container className="d-flex flex-column align-items-center min-vh-100 m-5">
      <h1 className="display-4 mb-4 text-success">Order Successful!</h1>
      <div className="mt-3 m-5">
        <h3>
          Expected Delivery Date:
          {' '}
          {date}
        </h3>
      </div>
      <h2>Ordered Products:</h2>
      <ListGroup className="w-75 pt-5">
        {cart?.map((product) => (
          <ListGroupItem key={product.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4>{product.name}</h4>
                <p>
                  Price: $
                  {product.price}
                </p>
                <p>
                  Quantity:
                  {product.amount}
                </p>
              </div>
              <div>
                <Image src={product.product_url} alt={product.name} thumbnail width={100} />
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <h3>
        Total Amount: $
        {totalAmount}
      </h3>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Main Page
      </Link>
    </Container>
  );
}
