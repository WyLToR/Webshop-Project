import { useState, useEffect } from 'react';
import {
  Button, Table, Form, Container, Row, Col, Stack, Alert,
} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import CustomPagination from '../../../components/pagination/CustomPagination';
import dateFormatter from '../../../utils/dateFormatter';
import useGetOrders from '../../../hooks/orders/useGetOrders';
import AdminModal from '../../../components/modal/AdminModal';
import DeleteOrderModal from '../../../components/modal/DeleteOrderModal';
import OrderDetails from '../../../components/admin/OrderDetails';
import PlaceholderComponent from '../../../components/admin/AdminPlaceholder';
import DisplayAmount from '../../../components/pagination/DisplayAmount';

export default function AdminOrders() {
  const [usp, setUsp] = useSearchParams();
  const [inputValue, setInputValue] = useState(usp.get('search') || '');
  const [orderState, setOrderState] = useState('desc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('');
  const {
    data, isLoading, isError, refetch,
  } = useGetOrders(usp);

  useEffect(() => {
    refetch();
  }, [usp, refetch]);

  const handleNameSort = () => {
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

  const modifyOrder = (orderId) => {
    setSelectedOrder(orderId);
    setShowDetailsModal(true);
  };

  const deleteOrder = (orderId) => {
    setSelectedOrder(orderId);
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
              placeholder="Search orders..."
            />
          </Form.Group>
        </Col>
        <Col xs={6} className="d-flex justify-content-center align-items-center">
          <h3>Manage Webshop Orders</h3>
        </Col>
        <Col className="d-flex justify-content-end align-items-center" />
      </Row>
      <Row className="justify-content-center m-1">
        <Table striped hover size="sm" className="table-fixed">
          <thead className="table-primary">
            <tr>
              <th className="col-2 pt-3 pb-3" onClick={handleNameSort}>
                Delivery date
                <FaSort />
              </th>
              <th className="col-3 pt-3 pb-3">Customer Name</th>
              <th className="col-3 pt-3 pb-3">Customer Email</th>
              <th className="col-1 pt-3 pb-3">Total price</th>
              <th className="col-3 text-center pt-3 pb-3">Manage</th>
            </tr>
          </thead>
          <tbody>
            {data.orders?.map((item) => (
              <tr key={item.id} className={(item.is_deleted ? 'table-danger' : '') || (item.is_done ? 'table-success' : '')}>
                <td>{dateFormatter(item.delivery_date)}</td>
                <td>{`${item.first_name} ${item.last_name}`}</td>
                <td>{item.email}</td>
                <td>{item.total_price}</td>
                <td className="text-center">
                  <Button variant="warning" className="me-2" onClick={() => modifyOrder(item.id)}>View Details</Button>
                  <Button disabled={item.is_deleted} variant="danger" onClick={() => deleteOrder(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {data.orders.length === 0 && <Alert className="mt-3" variant="danger">No order found</Alert>}
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
        title="Create A New Order"
        content="Create order"
      />
      <AdminModal
        show={showDetailsModal}
        setShow={setShowDetailsModal}
        title={`Order Details: "${selectedOrder}"`}
        content={<OrderDetails orderId={selectedOrder} setShow={setShowDetailsModal} />}
      />
      <DeleteOrderModal
        selectedOrder={selectedOrder}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
    </Container>
  );
}
