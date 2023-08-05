import * as Yup from 'yup';

const cartSchema = Yup.object({
  productId: Yup.string()
    .required('No product provided'),
  amount: Yup.number()
    .required('Cart item amount invalid')
    .min(1, 'Minimum 1 quantity needed'),
});

export default cartSchema;
