import * as Yup from 'yup';

const changePasswordSchema = Yup.object({
  oldPassword: Yup.string()
    .required('Old password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'Invalid password. The password need: A-Z, a-z, 0-9, Special Character')
    .min(4, 'Min 4 character needed')
    .max(200, 'Max 200 character'),
  newPasswordAgain: Yup.string()
    .required('New password again required')
    .oneOf([Yup.ref('newPassword'), null], 'New passwords must be match'),
});

export default changePasswordSchema;
