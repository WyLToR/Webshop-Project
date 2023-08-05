/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import useGetCategories from '../../hooks/categories/useGetCategories';

function CategorySelect({ defaultCategories, setUpdatedCategoryIds, onBlur }) {
  const [categories, setCategories] = useState([]);
  const [defaultValue, setDefaultValue] = useState([]);
  const { data, isLoading } = useGetCategories('pageLimit=100');

  const handleOptionChange = (options) => {
    setDefaultValue(options);
    setUpdatedCategoryIds(options.map((option) => option.value));
  };

  useEffect(() => {
    if (!isLoading) {
      const catNames = data?.categories.map((categ) => ({ value: categ.id, label: categ.name }));
      setCategories(catNames);
      if (defaultCategories) {
        const defCat = catNames.filter((category) => defaultCategories.includes(category.label));
        setDefaultValue(defCat);
        setUpdatedCategoryIds(defCat.map((cat) => cat.value));
      }
    }
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <Select
      value={defaultValue}
      isMulti
      name="categories"
      options={categories}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleOptionChange}
      onBlur={() => onBlur()}
    />
  );
}

export default CategorySelect;
