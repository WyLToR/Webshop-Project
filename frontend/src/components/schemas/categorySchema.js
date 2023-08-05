import * as Yup from 'yup';

const categorySchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(4, 'Name is too short')
    .max(50, 'Name is too long'),
});

export default categorySchema;
