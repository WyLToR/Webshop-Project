import { useState, useContext, useEffect } from 'react';
import {
  Button, Placeholder, Container, Row, Col, Form, Alert,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import useGetCart from '../../hooks/cart/useGetCart';
import useSetOrder from '../../hooks/orders/useSetOrder';
import useGetUserShippingAdress from '../../hooks/user-details/useGetUserShippingData';
import CartTable from '../cart/CartTable';
import UserShippingAdress from '../forms/UserShippingAdressForm';
import OrderSuccess from './OrderSuccess';

export default function Order() {
  const { auth } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const { data: shippingAdress, refetch, isFetching } = useGetUserShippingAdress(
    auth.id,
    auth.token,
  );
  const { data } = useGetCart();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [changeShippingAddress, setChangeShippingAddress] = useState(false);
  const [date] = useState(() => {
    const threeDaysLater = new Date();
    threeDaysLater.setDate(threeDaysLater.getDate() + 4);
    return threeDaysLater.toISOString().slice(0, 10);
  });
  const { mutate } = useSetOrder();
  const handleChangeShipping = () => {
    setChangeShippingAddress(!changeShippingAddress);
  };
  const handleSetOrder = (deliveryDate) => {
    if (shippingAdress.postCode != null) {
      setCartData(data);
      mutate(deliveryDate);
      setOrderSuccess(true);
    } else {
      toast.warning('Before you place an order, fill in your shipping address');
    }
  };
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container>
      {!orderSuccess
        ? (
          <>
            <h1 className="mt-4">Order</h1>
            <CartTable />
            {!isFetching ? (
              <>
                {shippingAdress.postCode === null && <Alert variant="danger" className="message">Please provide a shipping address!</Alert>}
                {shippingAdress ? (
                  <Form.Check
                    type="checkbox"
                    label="Modify shipping address"
                    id="shipping-address-modifier"
                    onChange={handleChangeShipping}
                  />
                ) : (
                  <UserShippingAdress data={shippingAdress} auth={auth} id={auth.id} />
                )}
                {changeShippingAddress && (
                  <UserShippingAdress data={shippingAdress} auth={auth} id={auth.id} />
                )}
              </>
            ) : (
              <Placeholder animation="glow" />
            )}
            <Row className="mt-4">
              <Col>
                {!orderSuccess && (
                  <Button
                    variant="success"
                    size="lg"
                    block
                    disabled={data?.length === 0 || shippingAdress?.postCode === null}
                    onClick={() => {
                      handleSetOrder(date);
                      setOrderSuccess(true);
                    }}
                  >
                    Place Order
                  </Button>
                )}
              </Col>
            </Row>
          </>
        )
        : <OrderSuccess cart={cartData} date={date} />}
    </Container>
  );
}
