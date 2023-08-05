import ListGroup from 'react-bootstrap/ListGroup';
import { useSearchParams } from 'react-router-dom';

export default function CategoryList({ categories }) {
  const [usp, setUsp] = useSearchParams();

  const handleClick = (catName) => {
    usp.set('category', catName);
    setUsp(usp);
  };

  return (
    <ListGroup className="mt-3">
      {categories?.map((category) => (
        <ListGroup.Item key={category.id} action variant="light" onClick={() => handleClick(category.name)}>
          <span>{category.name}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
