import * as Yup from 'yup';

const emailSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email')
    .min(6, 'Too short email')
    .max(50, 'Too long email'),
});
export default emailSchema;
