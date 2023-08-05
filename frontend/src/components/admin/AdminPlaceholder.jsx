import {
  Container, Row, Button, Placeholder, Table, Col, Form,
} from 'react-bootstrap';
import { FaSort } from 'react-icons/fa';

function PlaceholderComponent() {
  return (
    <Container>
      <Row className="mt-4 mb-4 ms-1 me-1">
        <Col className="d-flex justify-content-start align-items-center">
          <Form.Group className="flex-grow-1">
            <Form.Control
              type="text"
              className="flex-grow-1"
              placeholder="Search..."
            />
          </Form.Group>
        </Col>
        <Col xs={6} className="d-flex justify-content-center align-items-center">
          <Placeholder as="h3" animation="glow">
            <Placeholder xs={8} />
          </Placeholder>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Placeholder as={Button} className="flex-grow-1" animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        </Col>
      </Row>
      <Row className="justify-content-center m-1">
        <Table striped hover size="sm" className="table-fixed">
          <thead className="table-primary">
            <tr>
              <th className="pt-3 pb-3" onClick={() => {}}>
                <Placeholder xs={6} />
                <FaSort />
              </th>
              <th className="pt-3 pb-3" onClick={() => {}}>
                <Placeholder xs={6} />
                <FaSort />
              </th>
              <th className="pt-3 pb-3" onClick={() => {}}>
                <Placeholder xs={6} />
              </th>
              <th className="pt-3 pb-3" onClick={() => {}}>
                <Placeholder xs={6} />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 9 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={index}>
                <td>
                  <Placeholder xs={8} />
                </td>
                <td>
                  <Placeholder xs={6} />
                </td>
                <td>
                  <Placeholder xs={10} />
                </td>
                <td className="text-center">
                  <Button variant="warning" className="me-2" onClick={() => {}}>Edit</Button>
                  <Button variant="danger" onClick={() => {}}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default PlaceholderComponent;
