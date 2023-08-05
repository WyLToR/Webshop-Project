import { useContext, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Container } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import UserOrders from '../../components/user/UserOrders';
import useGetUserShippingAdress from '../../hooks/user-details/useGetUserShippingData';
import './UserDetails.css';
import ChangeUserPasswordForm from '../../components/forms/ChangeUserPasswordForm';
import DeleteUser from '../../components/user/DeleteUser';
import Auth from '../../components/Auth';
import UserDashboard from '../../components/user/UserDashboard';

function UserDetails() {
  const { auth, setAuth } = useContext(AuthContext);
  const { data } = useGetUserShippingAdress(auth?.id, auth?.token);
  const [key, setKey] = useState('user-datas');

  return (
    <Auth>
      <Container className="p-0 user-settings-container">
        <h2 className="heading">User Settings Page</h2>
        <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k) => setKey(k)}>
          <Row className="justify-content-evenly mt-5">
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="user-datas">My Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="orders">Orders</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="change-password">Change password</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="delete-user">Delete user</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={5}>
              <Tab.Content>
                <Tab.Pane eventKey="user-datas"><UserDashboard auth={auth} shippingAddress={data} /></Tab.Pane>
                <Tab.Pane eventKey="orders"><UserOrders /></Tab.Pane>
                <Tab.Pane eventKey="change-password"><ChangeUserPasswordForm auth={auth} /></Tab.Pane>
                <Tab.Pane eventKey="delete-user"><DeleteUser auth={auth} setAuth={setAuth} setKey={setKey} /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </Auth>
  );
}

export default UserDetails;
