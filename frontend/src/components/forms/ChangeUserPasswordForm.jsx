import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import useChangePassword from '../../hooks/user-details/usePostNewPassword';
import changePasswordSchema from '../../schemas/changePasswordSchema';

function ChangeUserPasswordForm({ auth }) {
  const { mutate } = useChangePassword(auth.id, auth.token);

  const formik = useFormik({
    onSubmit: (values) => {
      mutate({
        ...values, email: auth.email,
      });
    },
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: changePasswordSchema,
  });

  return (
    <div className="change-password-form-container">
      <h3>Change Password</h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Old password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.oldPassword && !formik.errors.oldPassword}
            isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.oldPassword}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.newPassword && !formik.errors.newPassword}
            isInvalid={formik.touched.newPassword && formik.errors.newPassword}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.newPassword}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New password again</Form.Label>
          <Form.Control
            type="password"
            name="newPasswordAgain"
            value={formik.values.newPasswordAgain}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.newPasswordAgain && !formik.errors.newPasswordAgain}
            isInvalid={formik.touched.newPasswordAgain && formik.errors.newPasswordAgain}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.newPasswordAgain}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="new-password-save-button" variant="success">Save</Button>
      </Form>
    </div>
  );
}

export default ChangeUserPasswordForm;
