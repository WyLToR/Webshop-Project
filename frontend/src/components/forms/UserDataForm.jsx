import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import updateUserDataSchema from '../../schemas/updateUserDataSchema';
import useUpdateUserData from '../../hooks/user-details/usePostUserData';

function UserDataForm({ auth, setShow }) {
  const { mutate } = useUpdateUserData(auth.id, auth.token);

  const formik = useFormik({
    onSubmit: (values) => {
      mutate(values);
    },
    initialValues: {
      email: auth.email,
      firstName: auth.firstName,
      lastName: auth.lastName,
    },
    validationSchema: updateUserDataSchema,
  });

  return (
    <div className="user-data-form-container">
      <h3>Personal Data</h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.email && !formik.errors.email}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.firstName && !formik.errors.firstName}
            isInvalid={formik.touched.firstName && formik.errors.firstName}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.lastName && !formik.errors.lastName}
            isInvalid={formik.touched.lastName && formik.errors.lastName}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" onClick={() => setShow(false)} variant="success">Save Changes</Button>
          <Button onClick={() => setShow(false)} variant="secondary">Close</Button>
        </div>
      </Form>
    </div>
  );
}

export default UserDataForm;
