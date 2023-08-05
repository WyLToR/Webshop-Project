import {
  Button, Card, Col, Row, Spinner, Stack,
} from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGetProducts from '../../hooks/products/useGetProducts';
import useAddToCart from '../../hooks/cart/useAddToCart';
import TitleBox from '../TitleBox';
import { AuthContext } from '../../contexts/AuthContext';

export default function RecommendedProducts({ category }) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [numberOfRecommended, setNumberOfRecommended] = useState(4);
  const {
    data, isLoading, isFetching, refetch,
  } = useGetProducts(`category=${category}&pageLimit=${numberOfRecommended}`);
  const { mutate } = useAddToCart();

  const addToCart = (prod) => {
    if (!auth.id) {
      toast.warning('You have to login first');
      return;
    }
    mutate(prod);
  };
  useEffect(() => {
    refetch();
  }, [category, numberOfRecommended, refetch]);

  if (isLoading) return null;

  return (
    <Row className="d-flex justify-content-center">
      <Stack gap={2} className="text-center mx-auto">
        <TitleBox title="RECOMMENDED PRODUCTS" variant="primary" />
      </Stack>
      <Row className="recommended mt-3 mb-2">
        {data.products.map((recommendedProduct) => (
          <Col md={3} key={recommendedProduct.id}>
            <Card className="mb-3">
              <Link to={`/products/${recommendedProduct.id}`} style={{ textDecoration: 'none' }}>
                <Card.Img className="mt-3" variant="top" src={recommendedProduct.product_url} style={{ height: '200px', objectFit: 'scale-down' }} />
              </Link>
              <Card.Body>
                <Card.Title>{recommendedProduct.name}</Card.Title>
                <Card.Text>
                  Price: $
                  {recommendedProduct.price}
                </Card.Text>
                <Stack gap={2} className="col-md-12 mx-auto">
                  <Button
                    onClick={() => {
                      addToCart({ productId: recommendedProduct.id, amount: 1 });
                    }}
                    variant="primary"
                  >
                    Add To Cart

                  </Button>
                  <Button onClick={() => navigate(`/products/${recommendedProduct.id}`)} variant="outline-secondary">Details</Button>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {isFetching && (
        <Row className="d-flex justify-content-center p-2">
          <Spinner />
        </Row>
      )}
      <Row>
        <Col className="d-flex justify-content-center">
          {numberOfRecommended === 4
            ? <Button variant="outline-primary" onClick={() => setNumberOfRecommended(8)}>Show More</Button>
            : <Button variant="outline-warning" onClick={() => setNumberOfRecommended(4)}>Show Less</Button>}
        </Col>
      </Row>
    </Row>
  );
}
