import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Fragment, useEffect } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import ProductItem from './ProductItem';

export default function ProductList({ productArrays, fetchNextPage, isFetching }) {
  useEffect(() => {
    const handleScroll = () => {
      if (
        Math.ceil(window.innerHeight + window.scrollY + 100)
        >= document.documentElement.scrollHeight) {
        fetchNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage]);

  return (
    <Container>
      <Col className="d-flex justify-content-center flex-wrap mx-auto gap-3">
        {productArrays[0].length
          ? productArrays?.map((group, index) => (
          // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              {group.map((product) => <ProductItem key={product.id} product={product} />)}
            </Fragment>
          ))
          : (
            <Alert className="ps-5 pe-5" variant="danger">
              <Alert.Heading>No Product Found</Alert.Heading>
            </Alert>
          )}
      </Col>
      {isFetching && (
        <Row className="d-flex justify-content-center p-2">
          <Spinner />
        </Row>
      )}
    </Container>
  );
}
