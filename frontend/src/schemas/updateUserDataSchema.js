import * as Yup from 'yup';

const updateUserDataSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email')
    .min(6, 'Too short email')
    .max(50, 'Too long email'),
  firstName: Yup.string()
    .required('Firstname required'),
  lastName: Yup.string()
    .required('Lastname required'),
});

export default updateUserDataSchema;
