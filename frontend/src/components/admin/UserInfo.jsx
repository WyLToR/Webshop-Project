import { useState } from 'react';
import {
  Container, Table, Button, Stack, Alert,
} from 'react-bootstrap';
import dateFormatter from '../../utils/dateFormatter';
import useUpdateUserRole from '../../hooks/users/useUpdateUserRole';

function UserInfo({ user, setShow }) {
  const [isAdmin, setIsAdmin] = useState(user.is_admin);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { mutate } = useUpdateUserRole();

  const handleToggleAdmin = () => {
    setShowConfirmation(true);
  };

  const handleConfirmToggle = () => {
    mutate({ isAdmin: !isAdmin, userId: user.id });
    setIsAdmin((prevState) => !prevState);
    setShowConfirmation(false);
  };

  const handleCancelToggle = () => {
    setShowConfirmation(false);
  };
  return (
    <Container>
      {user.is_deleted_user && <Alert variant="danger">This user has been deleted</Alert>}
      <Table striped bordered hover className={user.is_deleted_user ? 'table-danger' : ''}>
        <tbody>
          <tr>
            <td><strong>Created:</strong></td>
            <td>{dateFormatter(user.created)}</td>
          </tr>
          <tr>
            <td><strong>User ID:</strong></td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td><strong>User Name:</strong></td>
            <td>{`${user.first_name} ${user.last_name}`}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td><strong>Postcode:</strong></td>
            <td>{user.postcode || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>State:</strong></td>
            <td>{user.state || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>City:</strong></td>
            <td>{user.city || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Street:</strong></td>
            <td>{user.street || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>House Number:</strong></td>
            <td>{user.house_number || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Role:</strong></td>
            <td>
              {isAdmin ? 'Admin' : 'Customer'}
              {!showConfirmation && !user.is_deleted_user && (
                <Button className="ms-5" variant="primary" size="sm" onClick={handleToggleAdmin}>
                  {isAdmin ? 'Remove Admin' : 'Add Admin'}
                </Button>
              )}
              {showConfirmation && (
                <>
                  <Button
                    className="ms-5"
                    variant="success"
                    size="sm"
                    onClick={handleConfirmToggle}
                    style={{ marginRight: '5px' }}
                  >
                    Confirm
                  </Button>
                  <Button variant="danger" size="sm" onClick={handleCancelToggle}>
                    Cancel
                  </Button>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      <Stack gap={2} className="md-5 mx-auto mt-3">
        <Button onClick={() => setShow(false)} variant="outline-danger">Close User Info</Button>
      </Stack>
    </Container>
  );
}

export default UserInfo;
