import { Container, Image } from 'react-bootstrap';
import img from '../../assets/pics/banner.png';

export default function Banner() {
  return (
    <Container lg={4} className="d-flex justify-content-center position-relative mb-5">
      <Image
        src={img}
        className="w-100"
      />
    </Container>
  );
}
