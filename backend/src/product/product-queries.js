export const createProductQuery = `
INSERT INTO products 
(id, name, description, price, quantity) 
VALUES ($1, $2, $3, $4, $5)
RETURNING *
`;

export const readAllProductsQuery = `
SELECT p.*, ARRAY_AGG(c.name) AS categories 
FROM products p 
LEFT JOIN products_categories pc ON p.id = pc.product_id 
LEFT JOIN categories c ON pc.category_id = c.id 
WHERE ($1::numeric IS NULL OR price BETWEEN $1 AND $2) 
  AND ($3::varchar IS NULL OR p.name ILIKE $3 OR p.description ILIKE $3 OR c.name ILIKE $3) 
  AND ($4::varchar IS NULL OR c.name ILIKE $4)
GROUP BY p.id, p.name
`;

export const getProductsRowsTotal = `
SELECT COUNT(*) AS total
FROM (
  SELECT p.*, ARRAY_AGG(c.name) AS categories
  FROM products p
  LEFT JOIN products_categories pc ON p.id = pc.product_id
  LEFT JOIN categories c ON pc.category_id = c.id
  WHERE ($1::numeric IS NULL OR price BETWEEN $1 AND $2)
    AND ($3::varchar IS NULL OR p.name ILIKE $3 OR p.description ILIKE $3 OR c.name ILIKE $3)
    AND ($4::varchar IS NULL OR c.name ILIKE $4)
  GROUP BY p.id, p.name
) productlist;
`;

export const readProductQuery = `
SELECT p.*, ARRAY_AGG(c.name) AS categories 
FROM products p 
LEFT JOIN products_categories pc ON p.id = pc.product_id 
LEFT JOIN categories c ON pc.category_id = c.id 
WHERE p.id = $1 
GROUP BY p.id, p.name;
`;

export const updateProductQuery = `
UPDATE products 
SET name = $1, description = $2, price = $3, quantity = $4, product_url = $5 
WHERE id = $6
RETURNING *;
`;

export const deleteProductQuery = 'DELETE FROM products WHERE id = $1 RETURNING *;';

export const addCategoriesToProductQuery = 'INSERT INTO products_categories (product_id, category_id) VALUES ($1, $2);';

export const deleteCategoryFromProductQuery = 'DELETE FROM products_categories WHERE product_id = $1 AND category_id = $2;';

export const deleteAllCategoriesFromProductQuery = 'DELETE FROM products_categories WHERE product_id = $1;';

export const addPictureQuery = 'UPDATE products SET product_url = $2 WHERE id = $1 RETURNING *';

export const substractAmountQuery = `
  UPDATE products
    SET quantity = quantity - $2
    WHERE id = $1
`;
