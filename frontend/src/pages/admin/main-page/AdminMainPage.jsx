import { Container, Row, Col } from 'react-bootstrap';
import TitleBox from '../../../components/TitleBox';

function AdminMainPage() {
  return (
    <Container fluid>
      <Row className="dashboard">
        <Col sm={2} className="sidebar">
          <TitleBox title="ADMIN MAIN" variant="primary" />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminMainPage;
