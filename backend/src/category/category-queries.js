export const createCategoryQuery = 'INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING *';

export const readAllCategoriesQuery = 'SELECT * FROM categories WHERE ($1::varchar IS NULL OR $1 ILIKE name)';

export const getCategoriesRowsTotal = 'SELECT COUNT(*) AS total FROM (SELECT * FROM categories WHERE ($1::varchar IS NULL OR $1 ILIKE name)) categoriesList';

export const readCategoryQuery = 'SELECT * FROM categories WHERE id = $1';

export const updateCategoryQuery = 'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *';

export const deleteCategoryQuery = 'DELETE FROM categories WHERE id = $1';
