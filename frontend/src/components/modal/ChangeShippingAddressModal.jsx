import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import UserShippingAdressForm from '../forms/UserShippingAdressForm';

function ChangeShippingAddressModal({ show, setShow, shippingAddress }) {
  const { auth } = useContext(AuthContext);
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>User Shipping Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserShippingAdressForm auth={auth} setShow={setShow} data={shippingAddress} />
      </Modal.Body>
    </Modal>
  );
}

export default ChangeShippingAddressModal;
