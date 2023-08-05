import * as Yup from 'yup';

const registerSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email')
    .min(6, 'Too short email')
    .max(50, 'Too long email'),
  password: Yup.string()
    .required('password is required')
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'Invalid password. The password need: A-Z, a-z, 0-9, Special Character')
    .min(4, 'Min 4 character needed')
    .max(200, 'Max 200 character'),
  passwordAgain: Yup.string()
    .required('Password again required')
    .oneOf([Yup.ref('password'), null], 'Passwords must be match'),
  firstName: Yup.string()
    .required('Firstname required'),
  lastName: Yup.string()
    .required('Lastname required'),
});
export default registerSchema;
