import * as Yup from 'yup';

const shippingAdressSchema = Yup.object({
  postCode: Yup.number()
    .required('Postcode is required')
    .min(1011, 'Invalid postcode')
    .max(9985, 'Invalid postcode'),
  state: Yup.string()
    .required('State is required'),
  city: Yup.string()
    .required('City is required')
    .min(2, 'City name is too short')
    .max(200, 'Too long city name'),
  street: Yup.string()
    .required('Street is required')
    .min(2, 'Street name is too short')
    .max(200, 'Too long street name'),
  houseNumber: Yup.number()
    .required('House number is required'),
});

export default shippingAdressSchema;
