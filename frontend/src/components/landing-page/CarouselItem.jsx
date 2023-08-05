import {
  Badge,
  Col, Container, Image, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CarouselItem({ product }) {
  return (
    <Container
      className="jusify-content-center align-items-center mx-auto bg-white overflow-hidden"
      style={{
        height: '11rem',
        width: '20rem',
      }}
    >
      <Row className="p-1 align-items-center" style={{ gap: '1em' }}>
        <Col md={12} lg={6}>
          <Link to={`/products/${product.id}`}>
            <Image
              className="d-block img-hover"
              src={product.product_url}
              thumbnail
              style={{
                height: '10rem',
                objectFit: 'scale-down',
                minWidth: '2rem',
                border: 'none',
              }}
            />
          </Link>
        </Col>
        <Col className="d-flex flex-column justify-content-between" md={0} style={{ height: '6rem' }}>
          <h6 style={{ color: 'black' }}>{product.name}</h6>
          <Badge bg="secondary">{`${product.price} $`}</Badge>
        </Col>
      </Row>
    </Container>
  );
}
