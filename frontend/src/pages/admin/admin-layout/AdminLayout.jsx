import {
  Container, Row, Col, Nav,
} from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import Auth from '../../../components/Auth';
import TitleBox from '../../../components/TitleBox';

function AdminLayout() {
  return (
    <Auth>
      <Container fluid>
        <Row className="dashboard">
          <Col sm={2} className="p-4">
            <TitleBox title="ADMIN DASHBOARD" variant="primary" />
            <Nav variant="pills" className="flex-column">
              <Nav.Link as={NavLink} to="/admin/products?page=1">
                Products
              </Nav.Link>
              <Nav.Link as={NavLink} to="/admin/categories?page=1">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="/admin/orders?page=1">
                Orders
              </Nav.Link>
              <Nav.Link as={NavLink} to="/admin/users?page=1">
                Users
              </Nav.Link>
            </Nav>
          </Col>
          <Col sm={10} className="content">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </Auth>
  );
}

export default AdminLayout;
