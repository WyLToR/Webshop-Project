/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import {
  Form, Button, Stack, Image,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import productSchema from '../schemas/productSchema';
import CategorySelect from './CategorySelect';
import useCreateProduct from '../../hooks/products/useCreateProduct';
import useUpdateProduct from '../../hooks/products/useUpdateProduct';

export default function ProductForm({ selectedProduct, setShow }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedCategoryIds, setUpdatedCategoryIds] = useState(null);
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const formik = useFormik({
    onSubmit: (values) => {
      if (selectedProduct) {
        updateProduct({
          productId: selectedProduct.id, productData: values, selectedImage,
        });
      } else createProduct({ productData: values, selectedImage });
      setShow(false);
    },
    validationSchema: productSchema,
    initialValues: {
      name: selectedProduct?.name || '',
      description: selectedProduct?.description || '',
      price: selectedProduct?.price || '',
      quantity: selectedProduct?.quantity || '',
      productPicture: '',
      categories: selectedProduct?.categories || [],
    },
  });

  const categoriesBlur = () => {
    formik.setFieldTouched('categories', true);
  };

  useEffect(() => {
    formik.setFieldValue('categories', updatedCategoryIds);
  }, [updatedCategoryIds]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label>Categories:</Form.Label>
        <CategorySelect
          defaultCategories={selectedProduct?.categories}
          setUpdatedCategoryIds={setUpdatedCategoryIds}
          onBlur={categoriesBlur}
        />
        <Form.Control.Feedback style={{ display: (formik.submitCount > 0 || formik.touched.categories) ? 'block' : 'none' }} type="invalid">{formik.errors.categories}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Product Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={formik.touched.name && !formik.errors.name}
          isInvalid={formik.touched.name && formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={formik.touched.price && !formik.errors.price}
          isInvalid={formik.touched.price && formik.errors.price}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.price}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Quantity:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Quantity"
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isValid={formik.touched.quantity && !formik.errors.quantity}
          isInvalid={formik.touched.quantity && formik.errors.quantity}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.quantity}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Picture:</Form.Label>
        <br />
        {selectedProduct?.product_url && (
          <>
            <Image className="mb-3" width={150} src={selectedProduct.product_url} rounded />
            <br />
            <Form.Label>Modify by uploading another image:</Form.Label>
          </>
        )}
        <Form.Control
          type="file"
          name="productPicture"
          onChange={(event) => setSelectedImage(event.target.files[0])}
        />
      </Form.Group>
      <Stack gap={2} className="md-5 mx-auto mt-3">
        <Button type="submit" variant="success">Save</Button>
        <Button onClick={() => setShow(false)} variant="outline-danger">Cancel</Button>
      </Stack>
    </Form>
  );
}
