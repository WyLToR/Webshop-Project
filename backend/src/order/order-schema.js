import * as Yup from 'yup';

const orderSchema = Yup.object({

  deliveryDate: Yup.date()
    .required('Delivery date required'),
});
export default orderSchema;
