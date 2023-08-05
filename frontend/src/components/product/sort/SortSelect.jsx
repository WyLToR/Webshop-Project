/* eslint-disable max-len */
import Form from 'react-bootstrap/esm/Form';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sortingTemplate } from '../../../constants/sortSelectTemplates';

export default function SortSelect() {
  const [sortingValue, setSortingValue] = useState();
  const [usp, setUsp] = useSearchParams();
  const handleSort = (e) => {
    setSortingValue(e.target.value);
    usp.set('sort', e.target.value.split(',')[0]);
    usp.set('order', e.target.value.split(',')[1]);
    if (!e.target.value.split(',')[0]) {
      usp.delete('sort');
      usp.delete('order');
    }
    setUsp(usp);
  };
  return (
    <Form.Group>
      <Form.Select name="Sort By" onChange={handleSort} value={sortingValue}>
        {sortingTemplate.map((option) => <option key={option.name} value={option.value}>{option.name}</option>)}
      </Form.Select>
    </Form.Group>

  );
}
