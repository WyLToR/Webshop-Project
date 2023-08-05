import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Footer.css';
import { BiLogoFacebookSquare, BiLogoInstagramAlt } from 'react-icons/bi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import paypal from '../../assets/pics/paypal.svg';
import visa from '../../assets/pics/visa.svg';
import maestro from '../../assets/pics/maestro.svg';
import discover from '../../assets/pics/discover.svg';
import americanExpress from '../../assets/pics/american-express.svg';

function Footer() {
  return (
    <footer>
      <div className="background">
        <Container fluid="md">
          <Row className="contact-us">
            <Col>Contact Us.</Col>
            <Col xs={1} />
            <Col>
              <Form className="d-flex gap-3 email-input-form">
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  name="email"
                />
                <Button>Subscribe</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>Payment and Shipping</Col>
            <Col xs={1} />
            <Col>Customer service</Col>
          </Row>
          <Row>
            <Col>T&C</Col>
            <Col xs={1} />
            <Col>(06 1) 333 6666</Col>
          </Row>
          <Row>
            <Col>Data Handling</Col>
            <Col xs={1} />
            <Col>info@webshop.com</Col>
          </Row>
          <Row>
            <Col>Data transfer</Col>
            <Col xs={1} />
            <Col />
          </Row>
          <Row>
            <Col>Career</Col>
            <Col xs={1} />
            <Col />
          </Row>
          <Row>
            <Col>Cookie information</Col>
            <Col xs={1} />
            <Col />
          </Row>
          <Row>
            <Col>Waste management</Col>
            <Col xs={1} />
            <Col />
          </Row>
          <Row>
            <Col><hr style={{ height: '0.5rem', color: 'white', marginTop: '1rem' }} /></Col>
          </Row>
          <Row>
            <Col>
              <div className="social-media-logos">
                <BiLogoFacebookSquare size={30} color="grey" />
                <BiLogoInstagramAlt size={30} color="grey" />
              </div>
            </Col>
            <Col xs={1} />
            <Col className="d-flex gap-1 pb-1">
              <img src={paypal} alt="paypal" />
              <img src={visa} alt="visa" />
              <img src={maestro} alt="maestro" />
              <img src={discover} alt="discover" />
              <img src={americanExpress} alt="american-express" />
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
