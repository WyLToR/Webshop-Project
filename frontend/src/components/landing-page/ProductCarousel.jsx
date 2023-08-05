import { useEffect, useState } from 'react';
import {
  Carousel, Container,
} from 'react-bootstrap';
import CarouselItem from './CarouselItem';
import getPages from '../../utils/recentProductTransform';

export default function ProductCarousel({ productData, length }) {
  const [productArrays, setProductArrays] = useState([]);

  useEffect(() => {
    const slicedArray = productData?.products.slice(0, length);
    setProductArrays(getPages(slicedArray));
  }, [productData, length]);
  return (
    <Container
      className="px-4"

    >
      <Carousel
        className="p-3"
        variant="dark"
      >
        {productArrays?.map((productArr, idx) => (
          <Carousel.Item
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
          >
            <Container className="d-flex">
              {productArr.map((product) => (<CarouselItem key={product.id} product={product} />))}

            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
