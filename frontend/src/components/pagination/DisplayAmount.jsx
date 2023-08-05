import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const options = [9, 18, 27, 36, 45, 100];

function DisplayAmount() {
  const [usp, setUsp] = useSearchParams();
  const [pageLimit, setPageLimit] = useState(usp.get('pageLimit') || 9);

  const handleSelect = (value) => {
    setPageLimit(value);
    usp.set('pageLimit', value);
    usp.set('page', 1);
    setUsp(usp);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary">
        {`Display ${pageLimit} items`}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((value) => (
          <Dropdown.Item key={value} eventKey={value} onClick={() => handleSelect(value)}>
            {value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DisplayAmount;
