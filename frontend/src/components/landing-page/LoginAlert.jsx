import { useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

import LoggerModal from '../modal/LoggerModal';

export default function LoginAlert() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Alert variant="info">
        <Container className="d-flex justify-content-between align-content-center">
          <span>To add items to cart and shop, you must register or login!</span>
          <div className="d-flex" style={{ gap: '2em' }}>
            <Button variant="outline-success" onClick={() => setShowLoginModal(!showLoginModal)}>Register or Login</Button>
          </div>
        </Container>
      </Alert>
      <LoggerModal show={showLoginModal} setShow={setShowLoginModal} />
    </>
  );
}
