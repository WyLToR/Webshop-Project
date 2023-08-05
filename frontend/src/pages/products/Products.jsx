import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import ProductList from '../../components/product/ProductList';
import useGetProductsInfinite from '../../hooks/useGetProductsInfinite';
import LoadingComponent from '../../components/LoadingComponent';
import useGetCategory from '../../hooks/useGetCategories';
import CategoryList from '../../components/product/categories/CategoryList';
import SortSelect from '../../components/product/sort/SortSelect';
import SearchInput from '../../components/SearchInput';
import { priceRangesTemplate } from '../../constants/sortSelectTemplates';
import './Products.css';
import PriceRangeList from '../../components/product/prices/PriceRangeList';
import TitleBox from '../../components/TitleBox';

function Products() {
  const [usp, setUsp] = useSearchParams();
  const {
    data, refetch, isLoading, fetchNextPage, isFetching,
  } = useGetProductsInfinite(usp, 12);
  const categoryData = useGetCategory();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usp]);

  return (
    <Container className="mt-4 ps-2 pe-2">
      <Row>
        <TitleBox title={usp.get('category') || 'All Products'} variant="light" />
      </Row>
      <Row>
        <Col className="pt-3 pb-3 mb-3 filter-aside" sm={3} lg={2}>
          <TitleBox title="Filters" variant="light" />
          <div className="d-grid gap-2">
            <Button onClick={() => setUsp('')} className="mt-0 mb-3" variant="outline-secondary">Clear filters</Button>
          </div>
          <SearchInput />
          <h6 className="ms-1 mt-3 mb-0">Filter price: </h6>
          <PriceRangeList priceRanges={priceRangesTemplate} />
          <h6 className="ms-1 mt-3 mb-0">Filter category: </h6>
          <CategoryList categories={categoryData?.data?.categories} />
        </Col>
        <Col sm={9} lg={10}>
          {isLoading
            ? <LoadingComponent />
            : (
              <Row className="d-flex justify-content-end">
                <Row className="mb-3">
                  <Col sm={{ span: 2, offset: 10 }}>
                    <SortSelect />
                  </Col>
                </Row>
                <Row>
                  <ProductList
                    productArrays={data?.pages}
                    fetchNextPage={fetchNextPage}
                    isFetching={isFetching}
                  />
                </Row>
              </Row>
            )}
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
