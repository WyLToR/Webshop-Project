import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import './LoggerModal.css';
import logo from '../../assets/pics/logo.svg';

export default function LoggerModal({ show, setShow }) {
  const [showReg, setShowReg] = useState(false);
  if (!show) return null;
  return (
    <Modal show={show} onHide={() => setShow(false)} className="login-modal">
      <Modal.Header closeButton className="logger-modal-header" />
      <img src={logo} alt="logo" className="mx-auto" />
      <Modal.Body className="logger-modal-body pt-5 ps-5 pe-5">
        <div className="logger-modal-body-option">
          <Button variant="light" className={`logger-button ${showReg ? '' : 'isOn'}`} onClick={() => setShowReg(false)}>Login</Button>
          <Button variant="light" className={`logger-button ${showReg ? 'isOn' : ''}`} onClick={() => setShowReg(true)}>Register</Button>
        </div>
        {showReg ? <RegisterForm /> : <LoginForm />}
      </Modal.Body>
    </Modal>
  );
}
