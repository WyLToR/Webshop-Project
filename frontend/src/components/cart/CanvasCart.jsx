import { useContext } from 'react';
import { Button, Image, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom/dist';
import { AuthContext } from '../../contexts/AuthContext';
import useGetCart from '../../hooks/cart/useGetCart';
import CartTable from './CartTable';
import emptyCart from '../../assets/pics/emptyCart.png';

export default function CanvasCart({ showCart, setShowCart }) {
  const { auth } = useContext(AuthContext);
  const { data } = useGetCart();
  const navigate = useNavigate();
  const renderCartContent = () => {
    if (!auth.id) {
      return (
        <h2>
          First of all, you will have to log in!
        </h2>
      );
    }

    if (!data?.length) {
      return (
        <>
          <h2>
            Your cart is currently empty. Take a look around on the
            {' '}
            <Link to="/products" onClick={() => setShowCart(false)}>products</Link>
            {' '}
            page.
          </h2>
          <Image src={emptyCart} alt="emptyCart" />
        </>
      );
    }

    return (
      <>
        <CartTable />
        <Button
          variant="success"
          size="md"
          block
          onClick={() => {
            navigate(`/user/${auth.id}/order`);
            setShowCart(false);
          }}
        >
          Order
        </Button>
      </>
    );
  };

  return (
    <Offcanvas
      show={showCart}
      placement="end"
      onHide={() => setShowCart(false)}
      scroll
      backdrop
      keyboard
      style={{ width: '35rem' }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {renderCartContent()}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
