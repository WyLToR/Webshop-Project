import { useEffect, useState } from 'react';
import {
  Modal,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Confetti from '../animated/confetti';

export default function ActivatedUserModal({ show, setShow }) {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((num) => {
        if (num === 1) {
          clearInterval(interval);
          navigate('/');
        }
        return num - 1;
      });
    }, 1000);
  }, []);
  return (
    <Modal
      show={show}
      setShow={setShow}
      size="lg"
      className="mx-auto"
    >
      <Modal.Header className="mx-auto">
        <Modal.Title>Your account is activated!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="w-25 mx-auto">

        <Confetti />
      </Modal.Body>
      <Modal.Footer className="mx-auto">
        <h3>

          You will be redirected to main page in
          {' '}
          {counter}
        </h3>
      </Modal.Footer>
    </Modal>
  );
}
