import * as Yup from 'yup';

const productSchema = Yup.object({
  categories: Yup.array()
    .min(1, 'Select at least one category')
    .required('Select at least one category'),
  name: Yup.string()
    .required('Name is required')
    .min(4, 'Name is too short')
    .max(50, 'Name is too long'),
  price: Yup.number()
    .required('Price is required')
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .integer('Price must be an integer')
    .min(1, 'Price must be greater than zero'),
  quantity: Yup.number()
    .required('Quantity is required')
    .typeError('Quantity must be a number')
    .positive('Quantity must be greater than zero')
    .integer('Quantity must be an integer')
    .min(1, 'Quantity must be greater than zero'),
});

export default productSchema;
