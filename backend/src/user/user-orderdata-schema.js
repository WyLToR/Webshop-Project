import * as Yup from 'yup';

const userOrderDataSchema = Yup.object({
  postCode: Yup.string()
    .required('Postcode required')
    .min(4, 'Postcode should be min 4 character')
    .max(10, 'Too many characters (max:10)'),
  state: Yup.string()
    .required('State required')
    .min(4, 'Street should be min 4 character')
    .max(50, 'Too many characters (max:50)'),
  street: Yup.string()
    .required('State required')
    .min(4, 'State should be min 4 character')
    .max(50, 'Too many characters (max:50)'),
  city: Yup.string()
    .required('City required')
    .min(4, 'City should be min 4 character')
    .max(85, 'Too many characters (max:85)'),
  houseNumber: Yup.string()
    .required('House Number required')
    .min(1, 'House Number should be min 1 character')
    .max(30, 'Too many characters (max:30)'),
});
export default userOrderDataSchema;
