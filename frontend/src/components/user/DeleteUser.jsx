import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import useDeleteUser from '../../hooks/user-details/useDeleteUser';
import DeleteAccountModal from '../modal/DeleteAccountModal';

function DeleteUser({
  auth, setAuth, setKey,
}) {
  const { mutate } = useDeleteUser(auth.id, auth.token, setAuth);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="delete-confirm-container">
      <h3>Are you sure you want to delete your account?</h3>
      <Button variant="danger" onClick={() => setShowDelete(true)}>Confirm</Button>
      {' '}
      <Button onClick={() => setKey('user-datas')}>Back</Button>
      <DeleteAccountModal show={showDelete} setShow={setShowDelete} mutate={mutate} />
    </div>
  );
}

export default DeleteUser;
