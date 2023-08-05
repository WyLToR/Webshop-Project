import { useState, useEffect } from 'react';
import {
  Button, Table, Form, Container, Row, Col, Stack, Alert,
} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import CustomPagination from '../../../components/pagination/CustomPagination';
import dateFormatter from '../../../utils/dateFormatter';
import useGetUsers from '../../../hooks/users/useGetUsers';
import AdminModal from '../../../components/modal/AdminModal';
import RegisterForm from '../../../components/forms/RegisterForm';
import DeleteUserModal from '../../../components/modal/DeleteUserModal';
import UserInfo from '../../../components/admin/UserInfo';
import PlaceholderComponent from '../../../components/admin/AdminPlaceholder';
import DisplayAmount from '../../../components/pagination/DisplayAmount';

function AdminUsers() {
  const [usp, setUsp] = useSearchParams();
  const [inputValue, setInputValue] = useState(usp.get('search') || '');
  const [orderState, setUserstate] = useState('desc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const {
    data, isLoading, isError, refetch,
  } = useGetUsers(usp);

  useEffect(() => {
    refetch();
  }, [usp, refetch]);

  const handleDateSort = () => {
    usp.set('sort', 'created');
    usp.set('order', orderState);
    setUsp(usp);
    setUserstate((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleNameSort = () => {
    usp.set('sort', 'first_name');
    usp.set('order', orderState);
    setUsp(usp);
    setUserstate((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleEmailSort = () => {
    usp.set('sort', 'email');
    usp.set('order', orderState);
    setUsp(usp);
    setUserstate((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleRoleSort = () => {
    usp.set('sort', 'is_admin');
    usp.set('order', orderState);
    setUsp(usp);
    setUserstate((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    usp.set('search', e.target.value);
    usp.set('page', 1);
    if (!e.target.value) usp.delete('search');
    setUsp(usp);
  };

  const modifyProduct = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const deleteProduct = (user) => {
    setSelectedUser(user);
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
              placeholder="Search users..."
            />
          </Form.Group>
        </Col>
        <Col xs={6} className="d-flex justify-content-center align-items-center">
          <h3>Manage Webshop Users</h3>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button className="glass-input flex-grow-1" onClick={() => setShowCreateModal(true)}>Create New User</Button>
        </Col>
      </Row>
      <Row className="justify-content-center m-1">
        <Table striped hover size="sm" className="table-fixed">
          <thead className="table-primary">
            <tr>
              <th className="col-2 pt-3 pb-3" onClick={handleDateSort}>
                Registered
                <FaSort />
              </th>
              <th className="col-3 pt-3 pb-3" onClick={handleNameSort}>
                Name
                <FaSort />
              </th>
              <th className="col-3 pt-3 pb-3" onClick={handleEmailSort}>
                Email
                <FaSort />
              </th>
              <th className="col-1 pt-3 pb-3" onClick={handleRoleSort}>
                Role
                <FaSort />
              </th>
              <th className="col-3 text-center pt-3 pb-3">Manage</th>
            </tr>
          </thead>
          <tbody>
            {data.users?.map((item) => (
              <tr key={item.id} className={item.is_deleted_user ? 'table-danger' : ''}>
                <td>{dateFormatter(item.created)}</td>
                <td>{`${item.first_name} ${item.last_name}`}</td>
                <td>{item.email}</td>
                <td>{item.is_admin ? 'Admin' : 'Customer'}</td>
                <td className="text-center">
                  <Button variant="warning" className="me-2" onClick={() => modifyProduct(item)}>View Details</Button>
                  <Button disabled={item.is_deleted_user} variant="danger" onClick={() => deleteProduct(item)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {data.users.length === 0 && <Alert className="mt-3" variant="danger">No user found</Alert>}
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
        setShow={setShowCreateModal}
        title="Create A New User"
        content={<RegisterForm setShow={setShowCreateModal} />}
      />
      <AdminModal
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        title={`User Info: ${selectedUser.first_name} ${selectedUser.last_name}`}
        content={<UserInfo user={selectedUser} setShow={setShowUpdateModal} />}
      />
      <DeleteUserModal
        selectedUser={selectedUser}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
    </Container>
  );
}

export default AdminUsers;
