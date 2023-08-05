import * as Yup from 'yup';

const loginUserSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email'),
  password: Yup.string()
    .required('password is required')
    .min(4, 'Min 4 character needed'),
});
export default loginUserSchema;
