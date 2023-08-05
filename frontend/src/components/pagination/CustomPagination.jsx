import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function CustomPagination({ totalPages }) {
  const [usp, setUsp] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    let chekcedPage = page;
    if (chekcedPage > totalPages) chekcedPage = totalPages;
    if (chekcedPage < 1) chekcedPage = 1;
    usp.set('page', chekcedPage);
    setUsp(usp);
  };

  useEffect(() => {
    setCurrentPage(usp.get('page'));
  }, [usp.get('page')]);

  // eslint-disable-next-line react/no-array-index-key
  const items = new Array(totalPages).fill().map((element, index) => <Pagination.Item key={index + 1} onClick={() => handlePageClick(index + 1)} className={index + 1 === Number(currentPage) ? 'active' : ''}>{index + 1}</Pagination.Item>);

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination>
        <Pagination.First onClick={() => handlePageClick(1)} />
        <Pagination.Prev onClick={() => handlePageClick(Number(currentPage) - 1)} />
        {items}
        <Pagination.Next onClick={() => handlePageClick(Number(currentPage) + 1)} />
        <Pagination.Last onClick={() => handlePageClick(totalPages)} />
      </Pagination>
    </div>
  );
}

export default CustomPagination;
