/* eslint-disable react/prop-types */
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import AdminModal from './AdminModal';
import useDeleteUser from '../../hooks/users/useDeleteUser';

export default function DeleteUserModal({
  selectedUser, show, setShow,
}) {
  const { mutate } = useDeleteUser();
  const deleteUser = () => {
    mutate({ deletingUserId: selectedUser.id });
    setShow(false);
  };

  return (
    <AdminModal
      show={show}
      setShow={setShow}
      title="Confirm User Deletion"
      content={(
        <>
          <Alert className="text-justify" variant="danger">
            <h5>
              {`Are you absolutely sure you want to delete the user "${selectedUser.first_name} ${selectedUser.last_name}"`}
            </h5>
            <br />
            <p>
              This action is irreversible and will permanently remove the user from the webshop.
            </p>
          </Alert>

          <Stack gap={2} className="md-5 mx-auto mt-3">
            <Button onClick={deleteUser} variant="danger">Delete</Button>
            <Button onClick={() => setShow(false)} variant="outline-secondary">Cancel</Button>
          </Stack>
        </>
      )}
    />
  );
}
