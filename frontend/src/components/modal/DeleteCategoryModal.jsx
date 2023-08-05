/* eslint-disable react/prop-types */
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import AdminModal from './AdminModal';
import useDeleteCategory from '../../hooks/categories/useDeleteCategory';

export default function DeleteCategoryModal({
  selectedCategory, show, setShow,
}) {
  const { mutate } = useDeleteCategory();
  const deleteCategory = () => {
    mutate({ categoryId: selectedCategory.id });
    setShow(false);
  };

  return (
    <AdminModal
      show={show}
      setShow={setShow}
      title="Confirm Category Deletion"
      content={(
        <>
          <Alert className="text-justify" variant="danger">
            <h5>
              {`Are you absolutely sure you want to delete the category "${selectedCategory.name}"`}
            </h5>
            <br />
            <p>
              This action is irreversible and will permanently remove the category from the webshop.
            </p>
          </Alert>
          <Stack gap={2} className="md-5 mx-auto mt-3">
            <Button onClick={deleteCategory} variant="danger">Delete</Button>
            <Button onClick={() => setShow(false)} variant="outline-secondary">Cancel</Button>
          </Stack>
        </>
      )}
    />
  );
}
