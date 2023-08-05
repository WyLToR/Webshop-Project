import * as Yup from 'yup';

const categoriesSchema = Yup.object({
  category: Yup.string()
    .required('Categories name required')
    .min(2, 'Minimum 2 character')
    .max(100, 'Maximum 100 character'),
});
export default categoriesSchema;
