import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AiOutlineMail } from 'react-icons/ai';
import useSendActivatorMail from '../../hooks/users/useSendActivatorMail';
import emailSchema from '../../schemas/emailSchema';

export default function EmailSenderForm() {
  const { mutate } = useSendActivatorMail();
  const [message, setMessage] = useState(false);
  const formik = useFormik({
    onSubmit: (values) => {
      mutate(values);
      setMessage(true);
    },
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label><AiOutlineMail /></Form.Label>
        <Form.Control
          type="text"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={formik.touched.email && !formik.errors.email}
          isInvalid={formik.touched.email && formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
      >
        Send email
      </Button>
      <Form.Label>{message ? 'Email sent' : ''}</Form.Label>
    </Form>
  );
}
