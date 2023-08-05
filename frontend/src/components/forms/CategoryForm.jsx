/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { Form, Button, Stack } from 'react-bootstrap';
import useCreateCategory from '../../hooks/categories/useCreateCategory';
import useUpdateCategory from '../../hooks/categories/useUpdateCategory';
import categorySchema from '../schemas/categorySchema';

export default function CategoryForm({ selectedCategory, setShow }) {
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();

  const formik = useFormik({
    onSubmit: (values) => {
      if (selectedCategory) {
        updateCategory({ categoryId: selectedCategory.id, category: values.name });
      } else createCategory({ category: values.name });
      setShow(false);
    },
    validationSchema: categorySchema,
    initialValues: {
      name: selectedCategory?.name || '',
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Category Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={formik.touched.name && !formik.errors.name}
          isInvalid={formik.touched.name && formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
      </Form.Group>
      <Stack gap={2} className="md-5 mx-auto mt-3">
        <Button type="submit" variant="success">Save</Button>
        <Button onClick={() => setShow(false)} variant="outline-danger">Cancel</Button>
      </Stack>
    </Form>
  );
}
