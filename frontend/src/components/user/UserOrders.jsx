import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { useParams, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  Col, Container, Row, Stack,
} from 'react-bootstrap';
import { FaSort } from 'react-icons/fa';
import useGetUserOrder from '../../hooks/user-details/useGetUserOrders';
import { AuthContext } from '../../contexts/AuthContext';
import CustomPagination from '../pagination/CustomPagination';
import DisplayAmount from '../pagination/DisplayAmount';
import dateFormatter from '../../utils/dateFormatter';

function UserOrders() {
  const [usp, setUsp] = useSearchParams();
  const [orderState, setOrderState] = useState('desc');
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const { data, refetch } = useGetUserOrder(id, auth?.token, usp);

  useEffect(() => {
    refetch();
  }, [usp, refetch]);

  const handleNameSort = () => {
    usp.set('order', orderState);
    setUsp(usp);
    setOrderState((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="user-orders-container">
      <h3>User Orders</h3>
      {data?.orders.length !== 0
        ? (
          <>
            <Table striped hover className="user-orders-table">
              <thead>
                <tr className="user-orders-table-head">
                  <th>#</th>
                  <th onClick={handleNameSort}>
                    Created
                    <FaSort />
                  </th>
                  <th>Exppected delivery</th>
                  <th>Delivered</th>
                  <th>Total price</th>
                </tr>
              </thead>
              <tbody>
                {data?.orders.map((order) => (
                  <tr key={order.id}>
                    <td />
                    <td>{dateFormatter(order.created)}</td>
                    <td>{dateFormatter(order.delivery_date)}</td>
                    <td className="badges-table-data">
                      {order.is_done ? <span className="badge badge-pill badge-success">Success</span> : (
                        <span className="badge badge-pill badge-warning">
                          <span>Under</span>
                          {' '}
                          <span>delivery</span>
                        </span>
                      )}
                    </td>
                    <td>{order.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Container>
              <Row>
                <Col />
                <Col>
                  <Stack className="justify-content-center" direction="horizontal" gap={3}>
                    <CustomPagination totalPages={data?.totalPages} />
                  </Stack>
                </Col>
                <Col className="d-flex justify-content-end alig-items-center mb-5 me-1">
                  <DisplayAmount />
                </Col>
              </Row>
            </Container>
          </>

        )
        : (
          <Alert variant="primary">
            <Alert.Heading>You do not have orders yet!</Alert.Heading>
          </Alert>
        )}
    </div>
  );
}

export default UserOrders;
