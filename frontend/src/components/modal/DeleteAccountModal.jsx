import Modal from 'react-bootstrap/Modal';
import {
  Alert, ModalFooter, Button, Stack,
} from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function DeleteAccountModal({ show, setShow, mutate }) {
  const { auth } = useContext(AuthContext);
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert className="text-justify" variant="danger">
          <h5>
            {`Are you absolutely sure you want to delete the user "${auth.firstName} ${auth.lastName}"`}
          </h5>
          <br />
          <p>
            This action is irreversible and will permanently remove your account.
          </p>
        </Alert>
      </Modal.Body>
      <ModalFooter>
        <Stack gap={2} className="md-5 mx-auto mt-3">
          <Button onClick={mutate} variant="danger">Delete</Button>
          <Button onClick={() => setShow(false)} variant="secondary">Cancel</Button>
        </Stack>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteAccountModal;
