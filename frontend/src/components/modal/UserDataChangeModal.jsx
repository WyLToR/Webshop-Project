import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import UserDataForm from '../forms/UserDataForm';
import { AuthContext } from '../../contexts/AuthContext';

function UserDataChangeModal({ show, setShow }) {
  const { auth } = useContext(AuthContext);
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>User Datas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserDataForm auth={auth} setShow={setShow} />
      </Modal.Body>
    </Modal>
  );
}

export default UserDataChangeModal;
