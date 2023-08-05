import { useState, useEffect } from 'react';
import {
  Button, Table, Form, Container, Row, Col, Stack, Alert,
} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import CustomPagination from '../../../components/pagination/CustomPagination';
import DeleteProductModal from '../../../components/modal/DeleteProductModal';
import useGetProducts from '../../../hooks/products/useGetProducts';
import AdminModal from '../../../components/modal/AdminModal';
import ProductForm from '../../../components/forms/ProductForm';
import PlaceholderComponent from '../../../components/admin/AdminPlaceholder';
import DisplayAmount from '../../../components/pagination/DisplayAmount';

export default function AdminProducts() {
  const [usp, setUsp] = useSearchParams();
  const [inputValue, setInputValue] = useState(usp.get('search') || '');
  const [orderState, setOrderState] = useState('desc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const {
    data, isLoading, isError, refetch,
  } = useGetProducts(usp);

  useEffect(() => {
    refetch();
  }, [usp, refetch]);

  const handleNameSort = () => {
    usp.set('sort', 'name');
    usp.set('order', orderState);
    setUsp(usp);
    setOrderState((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handlePriceSort = () => {
    usp.set('sort', 'price');
    usp.set('order', orderState);
    setUsp(usp);
    setOrderState((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    usp.set('search', e.target.value);
    usp.set('page', 1);
    if (!e.target.value) usp.delete('search');
    setUsp(usp);
  };

  const modifyProduct = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const deleteProduct = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  if (isLoading) return <PlaceholderComponent />;

  if (isError) return <div>Error while fetching data</div>;

  return (
    <Container>
      <Row className="mt-4 mb-4 ms-1 me-1">
        <Col className="d-flex justify-content-start align-items-center">
          <Form.Group className="flex-grow-1">
            <Form.Control
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-grow-1"
              placeholder="Search products..."
            />
          </Form.Group>
        </Col>
        <Col xs={6} className="d-flex justify-content-center align-items-center">
          <h3>Manage Webshop Products</h3>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button className=" flex-grow-1" onClick={() => setShowCreateModal(true)}>Create New Product</Button>
        </Col>
      </Row>
      <Row className="justify-content-center m-1">
        <Table striped hover size="sm" className="table-fixed">
          <thead className="table-primary">
            <tr>
              <th className="col-4 pt-3 pb-3" onClick={handleNameSort}>
                Product name
                <FaSort />
              </th>
              <th className="col-2 pt-3 pb-3" onClick={handlePriceSort}>
                Price
                <FaSort />
              </th>
              <th className=" col-3 pt-3 pb-3">Categories</th>
              <th className=" col-3 text-center pt-3 pb-3">Manage</th>
            </tr>
          </thead>
          <tbody>
            {data.products?.map((item) => (
              <tr key={item.id} className={item.quantity < 1 ? 'table-danger' : ''}>
                <td>{item.name}</td>
                <td>
                  $
                  {item.price}
                </td>
                <td>{item.categories.join(', ')}</td>
                <td className="text-center">
                  <Button variant="warning" className="me-2" onClick={() => modifyProduct(item)}>Edit</Button>
                  <Button variant="danger" onClick={() => deleteProduct(item)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {data.products.length === 0 && <Alert className="mt-3" variant="danger">No product found</Alert>}
      </Row>
      <Row>
        <Col />
        <Col>
          <Stack className="justify-content-center" direction="horizontal" gap={3}>
            <CustomPagination totalPages={data.totalPages} />
          </Stack>
        </Col>
        <Col className="d-flex justify-content-end alig-items-center mb-5 me-1">
          <DisplayAmount />
        </Col>
      </Row>
      <AdminModal
        show={showCreateModal}
        setShow={setShowUpdateModal}
        title="Create A New Product"
        content={<ProductForm setShow={setShowCreateModal} />}
      />
      <AdminModal
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        title={`Update: ${selectedProduct.name}`}
        content={<ProductForm selectedProduct={selectedProduct} setShow={setShowUpdateModal} />}
      />
      <DeleteProductModal
        selectedProduct={selectedProduct}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
    </Container>
  );
}
