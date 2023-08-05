import { useFormik } from 'formik';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import registerSchema from '../../schemas/registerSchema';

export default function RegisterForm() {
  const [registerResponse, setRegisterResponse] = useState(null);
  const register = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status !== 200) {
        throw new Error('Email already exist');
      } else {
        setRegisterResponse('Register completed');
      }
    } catch (err) {
      setRegisterResponse(err.message);
    }
  };
  const formik = useFormik({
    onSubmit: (values) => {
      register(values);
    },
    validationSchema: registerSchema,
    initialValues: {
      email: '',
      password: '',
      passwordAgain: '',
      firstName: '',
      lastName: '',
    },
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
      <Form.Group>
        <Form.Label><RiLockPasswordFill /></Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={formik.touched.password && !formik.errors.password}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label><RiLockPasswordFill /></Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="passwordAgain"
          value={formik.values.passwordAgain}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={formik.touched.passwordAgain && !formik.errors.passwordAgain}
          isInvalid={formik.touched.passwordAgain && formik.errors.passwordAgain}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.passwordAgain}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label><BsFillPersonBadgeFill /></Form.Label>
        <Form.Control
          type="text"
          placeholder="FirstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={formik.touched.firstName && !formik.errors.firstName}
          isInvalid={formik.touched.firstName && formik.errors.firstName}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label><BsFillPersonBadgeFill /></Form.Label>
        <Form.Control
          type="text"
          placeholder="LastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={formik.touched.lastName && !formik.errors.lastName}
          isInvalid={formik.touched.lastName && formik.errors.lastName}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Register</Button>
      {registerResponse != null && <Form.Label className="message">Registration complete, please log in!</Form.Label>}
    </Form>
  );
}
