import * as Yup from 'yup';

const loginUserSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Min 4 character needed'),
});
export default loginUserSchema;
