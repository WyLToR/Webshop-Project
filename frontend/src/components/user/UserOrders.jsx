import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import useGetUserOrder from '../../hooks/user-details/useGetUserOrders';
import { AuthContext } from '../../contexts/AuthContext';

function UserOrders() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const { data } = useGetUserOrder(id, auth?.token);

  return (
    <div className="user-orders-container">
      <h3>User Orders</h3>
      {data?.orders.length !== 0
        ? (
          <Table striped hover className="user-orders-table">
            <thead>
              <tr className="user-orders-table-head">
                <th>#</th>
                <th>Created</th>
                <th>Exppected delivery</th>
                <th>Delivered</th>
                <th>Total price</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders.map((order) => (
                <tr key={order.id}>
                  <td />
                  <td>{order.created.slice(0, 10)}</td>
                  <td>{order.delivery_date.slice(0, 10)}</td>
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
