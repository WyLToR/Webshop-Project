import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

export default function SearchInput() {
  const [usp, setUsp] = useSearchParams();
  const [searchInputState, setSearchInputState] = useState(usp.get('search') || '');

  const handleSearch = (e) => {
    setSearchInputState(e.target.value);
    usp.set('search', e.target.value);
    if (!e.target.value) usp.delete('search');
    setUsp(usp);
  };

  useEffect(() => {
    if (!usp.has('search')) { setSearchInputState(''); }
  }, [usp]);

  return (
    <Form.Group className="d-flex">
      <Form.Control
        onChange={handleSearch}
        value={searchInputState}
        type="search"
        placeholder="Search products..."
        aria-label="Search"
      />
    </Form.Group>
  );
}
