import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useActivateUser from '../../hooks/users/useActivateUser';
import ActivatedUserModal from '../modal/ActivatedUserModal';

export default function ActivateUser() {
  const [url] = useSearchParams();
  const { mutate } = useActivateUser();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (url.get('userId')) {
      mutate(url.get('userId'));
      setShowModal(true);
    }
  }, []);
  return (
    <ActivatedUserModal show={showModal} setShow={setShowModal} />
  );
}
