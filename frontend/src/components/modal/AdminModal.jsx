/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';

export default function AdminModal({
  show, setShow, title, content,
}) {
  return (
    <Modal centered show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
}
