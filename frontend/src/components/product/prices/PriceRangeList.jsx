import ListGroup from 'react-bootstrap/ListGroup';
import { useSearchParams } from 'react-router-dom';

export default function PriceRangeList({ priceRanges }) {
  const [usp, setUsp] = useSearchParams();

  const handleClick = (minprice, maxPrice) => {
    usp.set('minPrice', minprice);
    usp.set('maxPrice', maxPrice);
    setUsp(usp);
  };

  return (
    <ListGroup className="mt-3">
      {priceRanges?.map((priceRange) => (
        <ListGroup.Item key={priceRange.value[0]} action variant="light" onClick={() => handleClick(priceRange.value[0], priceRange.value[1])}>
          <span>{priceRange.name}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
