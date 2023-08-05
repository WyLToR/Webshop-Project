import * as Yup from 'yup';

const userPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required('Password is required')
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'Invalid password. The password need: A-Z, a-z, 0-9, Special Character')
    .min(4, 'Min 4 character needed')
    .max(200, 'Max 200 character'),
});

export default userPasswordSchema;
