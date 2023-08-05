import * as Yup from 'yup';

const productsSchema = Yup.object({
  name: Yup.string()
    .required('Product name required')
    .min(4, 'Minimum 4 character')
    .max(100, 'Maximum 100 character'),
  description: Yup.string()
    .max(1000, 'Maximum 1000 character allowed'),
  price: Yup.number()
    .required('Price is required')
    .min(1, 'Price min value 1'),
  quantity: Yup.number()
    .required('Quantity is required')
    .min(0, 'Minimum value 0'),

});
export default productsSchema;
