import * as Yup from 'yup';

const registerUserDataSchema = Yup.object({
  id: Yup.string()
    .uuid('Invalid id'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email')
    .min(6, 'Too short email')
    .max(50, 'Too long email'),
  firstName: Yup.string()
    .required('Firstname required'),
  lastName: Yup.string()
    .required('Lastname required'),
});
export default registerUserDataSchema;
