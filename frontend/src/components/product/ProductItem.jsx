/* eslint-disable camelcase */
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BiCartAdd, BiCheckCircle, BiErrorCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAddToCart from '../../hooks/cart/useAddToCart';
import './ProductItem.css';
import RatingStars from './RatingStars';
import { AuthContext } from '../../contexts/AuthContext';

export default function ProductItem({ product }) {
  const { auth } = useContext(AuthContext);
  const {
    name, product_url, price, quantity, id,
  } = product;
  const { mutate } = useAddToCart();
  const addToCart = (prod) => {
    if (!auth.id) {
      toast.warning('You have to login first');
      return;
    }
    mutate(prod);
  };
  return (
    <Card className="text-center">
      <Row>
        <Col className="mt-2">
          {quantity
            ? (
              <Col className="d-flex justify-content-center align-items-center">
                <BiCheckCircle color="green" />
                <span> in stock</span>
              </Col>
            )
            : (
              <>
                <BiErrorCircle />
                <span> out of stock</span>
              </>
            )}
        </Col>
      </Row>
      <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}>
        <Card.Img
          className="mt-3 card-img"
          variant="top"
          src={product_url || 'https://placehold.co/600x400'}
        />
      </Link>
      <Card.Body>
        <RatingStars rating={(Math.floor(Math.random() * 5) + 6) / 2} />
        <Card.Title className="d-flex justify-content-center align-items-center mt-2">{name.toUpperCase()}</Card.Title>
        <Container className="mt-3 mb-3">
          <strong>{`$${price}`}</strong>
        </Container>
        <Button
          variant="outline-primary"
          className="pt-2 pb-2 ps-4 pe-4"
          onClick={() => {
            addToCart({ productId: id, amount: 1 });
          }}
        >
          <Col className="d-flex justify-content-center align-items-center">
            <BiCartAdd />
            <span> Add To Cart</span>
          </Col>
        </Button>
      </Card.Body>
    </Card>
  );
}
