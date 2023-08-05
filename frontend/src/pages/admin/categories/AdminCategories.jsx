import { useState, useEffect } from 'react';
import {
  Button, Table, Form, Container, Row, Col, Stack, Alert,
} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import CustomPagination from '../../../components/pagination/CustomPagination';
import AdminModal from '../../../components/modal/AdminModal';
import useGetCategories from '../../../hooks/categories/useGetCategories';
import CategoryForm from '../../../components/forms/CategoryForm';
import DeleteCategoryModal from '../../../components/modal/DeleteCategoryModal';
import PlaceholderComponent from '../../../components/admin/AdminPlaceholder';
import DisplayAmount from '../../../components/pagination/DisplayAmount';

export default function AdminCategories() {
  const [usp, setUsp] = useSearchParams();
  const [inputValue, setInputValue] = useState(usp.get('search') || '');
  const [orderState, setOrderState] = useState('desc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const {
    data, isLoading, isError, refetch,
  } = useGetCategories(usp);

  useEffect(() => {
    refetch();
  }, [usp, refetch]);

  const handleNameSort = () => {
    usp.set('sort', 'name');
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

  const modifyCategory = (product) => {
    setSelectedCategory(product);
    setShowUpdateModal(true);
  };

  const deleteCategory = (product) => {
    setSelectedCategory(product);
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
              placeholder="Search categories..."
            />
          </Form.Group>
        </Col>
        <Col xs={6} className="d-flex justify-content-center align-items-center">
          <h3>Manage Webshop Categories</h3>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button className="glass-input flex-grow-1" onClick={() => setShowCreateModal(true)}>Create New Category</Button>
        </Col>
      </Row>
      <Row className="justify-content-center m-1">
        <Table striped hover size="sm" className="table-fixed">
          <thead className="table-primary">
            <tr>
              <th className="col-9 pt-3 pb-3" onClick={handleNameSort}>
                Product name
                <FaSort />
              </th>
              <th className="col-3 text-center pt-3 pb-3">Manage</th>
            </tr>
          </thead>
          <tbody>
            {data.categories?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-center">
                  <Button variant="warning" className="me-2" onClick={() => modifyCategory(item)}>Edit</Button>
                  <Button variant="danger" onClick={() => deleteCategory(item)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {data.categories.length === 0 && <Alert className="mt-3" variant="danger">No category found</Alert>}
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
        content={<CategoryForm setShow={setShowCreateModal} />}
      />
      <AdminModal
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        title={`Update: ${selectedCategory.name}`}
        content={<CategoryForm selectedCategory={selectedCategory} setShow={setShowUpdateModal} />}
      />
      <DeleteCategoryModal
        selectedCategory={selectedCategory}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
    </Container>
  );
}
