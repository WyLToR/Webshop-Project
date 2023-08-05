import {
  Container, Row, Col, Image, Badge, Stack, Button,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import useGetProductById from '../../hooks/products/useGetProductById';
import RecommendedProducts from '../../components/product/RecommendedProducts';
import useAddToCart from '../../hooks/cart/useAddToCart';
import { AuthContext } from '../../contexts/AuthContext';

export default function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { auth } = useContext(AuthContext);
  const userId = auth.id;
  const { data, isLoading } = useGetProductById({ productId });
  const { mutate } = useAddToCart();

  const addToCart = (prod) => {
    if (!auth.id) {
      toast.warning('You have to login first');
      return;
    }
    mutate(prod);
  };

  const buyNow = (id) => {
    if (!auth.id) {
      toast.warning('You have to login first');
      return;
    }
    addToCart({ productId: id, amount: 1 });
    navigate(`/user/${userId}/order`);
  };

  const seeCategoryProducts = (category) => {
    navigate(`/products?category=${category}`);
  };

  if (isLoading) return null;

  return (
    <Container className="mt-5 mb-5">
      <Row className="d-flex flex-column flex-lg-row mb-5">
        <Col className="d-flex justify-content-center">
          <Image style={{ maxHeight: '420px' }} rounded src={data.product_url} fluid />
        </Col>
        <Col>
          <Row>
            <Col xs={6} md={10}>
              <Row className="mb-4">
                <h2 className="mb-3">{data.name}</h2>
                <Stack direction="horizontal" gap={2}>
                  {data.categories.map((category) => (
                    <Badge onClick={() => seeCategoryProducts(category)} key={category} className="category-badge p-2" bg="secondary">{category}</Badge>
                  ))}
                </Stack>
              </Row>
            </Col>
            <Col xs={6} md={2} className="d-flex justify-content-end align-items-start">
              <Badge bg="secondary" className="pt-2 ps-3 pe-3"><h4>{`$ ${data.price}`}</h4></Badge>
            </Col>
          </Row>
          <Row>
            <h4 className="mb-3"><strong>Description:</strong></h4>
            <p>{data.description}</p>
          </Row>
          <Row className="mt-3">
            <Stack gap={2} className="col-md-5 mx-auto">
              <Button
                onClick={() => {
                  addToCart({ productId: data.id, amount: 1 });
                }}
                variant="outline-secondary"
              >
                Add To Cart

              </Button>
              <Button onClick={() => buyNow(data.id)} variant="primary">Buy Now</Button>
            </Stack>
          </Row>
        </Col>
      </Row>
      <RecommendedProducts category={data.categories[0]} />
    </Container>
  );
}
