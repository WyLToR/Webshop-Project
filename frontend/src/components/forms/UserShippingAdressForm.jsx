import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import shippingAdressSchema from '../../schemas/userShippingAdressSchema';
import useUpdateUserShippingAdress from '../../hooks/user-details/usePostUserShippingData';

function UserShippingAdressForm({ auth, setShow, data }) {
  const { mutate } = useUpdateUserShippingAdress(auth.id, auth.token);
  const formik = useFormik({
    onSubmit: (values) => {
      mutate(values);
    },
    initialValues: {
      postCode: data?.postCode,
      state: data?.state,
      city: data?.city,
      street: data?.street,
      houseNumber: data?.houseNumber,
    },
    validationSchema: shippingAdressSchema,
  });

  return (
    <div className="user-shipping-form-container">
      <h3>Shipping Adress</h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Postcode</Form.Label>
          <Form.Control
            type="number"
            name="postCode"
            value={formik.values.postCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.postCode && !formik.errors.postCode}
            isInvalid={formik.touched.postCode && formik.errors.postCode}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.postCode}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.state && !formik.errors.state}
            isInvalid={formik.touched.state && formik.errors.state}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.state}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.city && !formik.errors.city}
            isInvalid={formik.touched.city && formik.errors.city}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.street && !formik.errors.street}
            isInvalid={formik.touched.street && formik.errors.street}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.street}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>House number</Form.Label>
          <Form.Control
            type="number"
            name="houseNumber"
            value={formik.values.houseNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.houseNumber && !formik.errors.houseNumber}
            isInvalid={formik.touched.houseNumber && formik.errors.houseNumber}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.houseNumber}</Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" onClick={() => setShow(false)} variant="success">Save Changes</Button>
          {setShow ? <Button onClick={() => setShow(false)} variant="secondary">Close</Button> : null}
        </div>
      </Form>
    </div>
  );
}

export default UserShippingAdressForm;
