import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';
import UserDataChangeModal from '../modal/UserDataChangeModal';
import ChangeShippingAddressModal from '../modal/ChangeShippingAddressModal';

function UserDashboard({ auth, shippingAddress }) {
  const [showUserData, setShowUserData] = useState(false);
  const [showShippingAdress, setShowShippingAdress] = useState(false);
  return (
    <Stack>
      <h3>Account Information</h3>
      <hr />
      <div className="d-flex justify-content-between account-data-container" style={{ gap: '2em' }}>
        <div className="d-flex flex-column datas">
          <p style={{ fontWeight: 'bold' }}>User Information</p>
          <p
            style={{ color: 'gray' }}
            className="mb-0"
          >
            {`${auth.firstName} ${auth.lastName}`}
          </p>
          <p style={{ color: 'gray' }}>{auth.email}</p>
          <Nav.Link
            style={{ textDecoration: 'underline', color: 'blue', width: 'fit-content' }}
            onClick={() => setShowUserData(true)}
          >
            Edit
          </Nav.Link>
          <UserDataChangeModal show={showUserData} setShow={setShowUserData} />
        </div>
        <div className="d-flex flex-column datas">
          <p style={{ fontWeight: 'bold' }}>Default Shipping Address</p>
          {shippingAddress?.postCode === null || shippingAddress === undefined
            ? (
              <>
                <p style={{ color: 'gray' }}>You have not set a default shipping adress.</p>
                <Nav.Link
                  className="mt-auto"
                  style={{ textDecoration: 'underline', color: 'blue', width: 'fit-content' }}
                  onClick={() => setShowShippingAdress(true)}
                >
                  Edit
                </Nav.Link>
                <ChangeShippingAddressModal
                  show={showShippingAdress}
                  setShow={setShowShippingAdress}
                  shippingAddress={shippingAddress}
                />
              </>
            )
            : (
              <>
                <p className="mb-0" style={{ color: 'gray' }}>{shippingAddress.postCode}</p>
                <p style={{ color: 'gray' }}>{shippingAddress.city}</p>
                <Nav.Link
                  className="mt-auto"
                  style={{ textDecoration: 'underline', color: 'blue', width: 'fit-content' }}
                  onClick={() => setShowShippingAdress(true)}
                >
                  Edit
                </Nav.Link>
                <ChangeShippingAddressModal
                  show={showShippingAdress}
                  setShow={setShowShippingAdress}
                  shippingAddress={shippingAddress}
                />
              </>
            )}
        </div>
      </div>
    </Stack>
  );
}

export default UserDashboard;
