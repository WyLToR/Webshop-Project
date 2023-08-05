import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useState, useContext } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import loginSchema from '../../schemas/loginSchema';
import { AuthContext } from '../../contexts/AuthContext';
import AuthService from '../../services/auth-services';
import EmailSenderForm from './EmailSenderForm';

export default function LoginForm() {
  const [showAnswer, setShowAnswer] = useState('');
  const { setAuth } = useContext(AuthContext);

  const [showActivator, setShowActivator] = useState(false);
  const handleLogin = async (data) => {
    try {
      const { user, token } = await AuthService.login(data);
      setAuth({ ...user, token });
    } catch (err) {
      setShowAnswer(err.message);
    }
  };
  const formik = useFormik({
    onSubmit: (values) => {
      handleLogin(values);
    },
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
  });
  return (
    showActivator
      ? <EmailSenderForm setShowActivator={setShowActivator} />
      : (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label><AiOutlineMail /></Form.Label>
            <Form.Control
              type="email"
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
              isInvalid={formik.touched.empasswordail && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Login</Button>
          <Form.Label>
            {showAnswer === 'User is not activated' ? (
              <div className="message">
                <span>Your user is not activated!</span>
                {' '}
                <Button
                  onClick={() => {
                    setShowAnswer('');
                    setShowActivator(true);
                  }}
                >
                  Send activation again
                </Button>
              </div>
            ) : (
              <div className="message"><span>{showAnswer}</span></div>
            )}
          </Form.Label>
        </Form>
      )
  );
}
