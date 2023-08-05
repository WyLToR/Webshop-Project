import { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Navbar, Nav, NavDropdown, Container, Image, Badge, Button, Col,
} from 'react-bootstrap';
import {
  BiMenu, BiUserCircle, BiCart, BiUserMinus, BiBody, BiData,
} from 'react-icons/bi';
import MessageModal from '../modal/MessageModal';
import { AuthContext } from '../../contexts/AuthContext';
import AuthService from '../../services/auth-services';
import CanvasCart from '../cart/CanvasCart';
import useGetCart from '../../hooks/cart/useGetCart';
import logo from '../../assets/pics/logo.svg';
import './Header.css';
import LoggerModal from '../modal/LoggerModal';
import { LoginContext } from '../../contexts/LoginContext';

function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const { showLogger, setShowLogger } = useContext(LoginContext);
  const [showLogout, setShowLogout] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);
  const handleLoggerModal = () => setShowLogger(true);
  const { data, refetch } = useGetCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    setShowLogger(false);
    setAuth({});
    AuthService.logOut();
    navigate('/');
  };
  useEffect(() => {
    refetch();
    if (data && data.length >= 0 && auth.id) {
      const count = data.reduce((total, product) => total + product.amount, 0);
      setCartCounter(count);
    }
    if (!auth.id) {
      setCartCounter(0);
    }
  }, [data, auth.id, refetch]);

  return (
    <>
      <Container className="p-2 m-0 important-banner" fluid>
        <span>SPECIAL OFFER: PROJECT DEMO AVAILABLE FROM THE 7TH OF AUGUST!</span>
      </Container>
      <Container className="nav-container p-0" fluid>
        <Navbar className="ps-4 pe-4" expand="lg" bg="light">
          <Navbar.Brand href="/"><Image className="me-3" height="50px" alt="logo" src={logo} rounded /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <BiMenu className="fs-2 mt-1" />
          </Navbar.Toggle>
          <Navbar.Collapse className="text-center fs-5">
            <Nav className="me-auto">
              <Nav.Link className="me-3" as={NavLink} to="/products">All Products</Nav.Link>
              <Nav.Link className="me-3" as={NavLink} to="/products?category=Audio devices">Audio devices</Nav.Link>
              <Nav.Link className="me-3" as={NavLink} to="/products?category=Laptops">Laptops</Nav.Link>
              <Nav.Link className="me-3" as={NavLink} to="/products?category=Smartphones">Smartphones</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <CanvasCart showCart={showCart} setShowCart={setShowCart} />
        <MessageModal show={showLogout} setShow={setShowLogout} message="You are successfully logged out" />
        <Col sm={1} className="profile-cart-icons d-flex justify-content-end align-items-center">
          {auth.id && (
            <NavDropdown
              className="me-2"
              title={(
                <>
                  <span className="me-2">{`Hello ${auth.firstName}`}</span>
                  <BiUserCircle className="fs-3" />
                </>
              )}
            >
              <NavDropdown.Item as={NavLink} to={`/user/${auth.id}`} className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
                <BiBody />
                <span>Settings</span>
              </NavDropdown.Item>
              {auth.isAdmin && (
                <NavDropdown.Item as={NavLink} to="/admin/products" className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
                  <BiData />
                  <span>Admin</span>
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={handleLogout} className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
                <>
                  <BiUserMinus />
                  <span>Logout</span>
                </>
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {!auth.id
            && (
              <>
                <Button variant="light" onClick={handleLoggerModal}><BiUserCircle className="fs-3" /></Button>
                <LoggerModal show={showLogger} setShow={setShowLogger} />
              </>
            )}
          <Button className="d-flex align-items-center pb-1.5" variant="light" onClick={() => setShowCart(true)}>
            <BiCart className="fs-3" />
            <Badge bg="primary">{cartCounter}</Badge>
          </Button>
        </Col>
      </Container>
    </>
  );
}

export default Header;
