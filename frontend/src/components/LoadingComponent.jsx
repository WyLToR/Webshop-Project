import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingComponent() {
  return (
    <Container className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <Spinner />
    </Container>
  );
}
