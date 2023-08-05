import { Modal } from 'react-bootstrap';

export default function MessageModal({ show, setShow, message }) {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}
