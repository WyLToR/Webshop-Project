import { Container } from 'react-bootstrap';
import CarouselItem from './CarouselItem';
import CategoryDescriptor from './CategoryDescriptor';

export default function CategoryShowcase({
  products, img, title, qparam,
}) {
  return (
    <Container
      className="d-flex align-items-center p-2 my-4"
    >
      <CategoryDescriptor
        title={title}
        img={img}
        qparam={qparam}
      />
      {products?.slice(7, 10).map((product) => <CarouselItem key={product.id} product={product} />)}
    </Container>
  );
}
