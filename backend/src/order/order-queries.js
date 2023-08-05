export const readAllOrderQuery = `
SELECT o.*, u.first_name, last_name, u.email,
SUM(p.price * op.amount) AS total_price
FROM orders AS o
LEFT JOIN users AS u ON o.user_id = u.id
LEFT JOIN ordered_products AS op ON o.id = op.order_id
LEFT JOIN products AS p ON op.product_id = p.id
WHERE ($1::varchar IS NULL OR u.email ILIKE $1 OR u.first_name ILIKE $1 OR u.last_name ILIKE $1)
GROUP BY o.id, u.id 
`;

export const getOrdersRowsTotal = `
SELECT COUNT(*) AS total
FROM (
    SELECT o.*, u.first_name, last_name, u.email,
    SUM(p.price * op.amount) AS total_price
    FROM orders AS o
    LEFT JOIN users AS u ON o.user_id = u.id
    LEFT JOIN ordered_products AS op ON o.id = op.order_id
    LEFT JOIN products AS p ON op.product_id = p.id
    WHERE ($1::varchar IS NULL OR u.email ILIKE $1 OR u.first_name ILIKE $1 OR u.last_name ILIKE $1)
    GROUP BY o.id, u.id 
) orderlist;
`;

export const getOrderByIdQuery = `
SELECT o.*,
u.id AS user_id,
u.first_name AS first_name,
u.last_name AS last_name,
u.email AS email,
ARRAY_AGG( JSON_BUILD_OBJECT('product', p.name, 'amount', op.amount, 'sub_total', p.price * op.amount)) AS productsList,
SUM(p.price * op.amount) AS total_price
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN ordered_products op ON o.id = op.order_id
JOIN products p ON op.product_id = p.id
WHERE o.id = $1
GROUP BY o.id, u.id;
`;

export const readAllUserOrderQuery = `
SELECT o.*,
SUM(p.price * op.amount) AS total_price
FROM orders AS o
INNER JOIN users ON o.user_id = users.id
LEFT JOIN ordered_products AS op ON o.id = op.order_id
LEFT JOIN products AS p ON op.product_id = p.id
WHERE ($1::varchar IS NULL OR users.id = $1)
    AND ($2::varchar IS NULL OR o.id ILIKE $2)
GROUP BY o.id
`;

export const getUserOrdersRowsTotal = `
SELECT COUNT(*) AS total
FROM (
    SELECT o.*,
    SUM(p.price * op.amount) AS total_price
    FROM orders AS o
    INNER JOIN users ON o.user_id = users.id
    LEFT JOIN ordered_products AS op ON o.id = op.order_id
    LEFT JOIN products AS p ON op.product_id = p.id
    WHERE ($1::varchar IS NULL OR users.id = $1)
        AND ($2::varchar IS NULL OR o.id ILIKE $2)
    GROUP BY o.id
) userorderlist;
`;

export const addOrderQuery = `
INSERT INTO orders (id, user_id, delivery_date)
VALUES ($1, $2, $3)
RETURNING id
`;

export const addOrderedProductsQuery = `
INSERT INTO ordered_products (order_id, product_id, amount)
VALUES ($1, $2, $3)
`;

export const completeOrderQuery = `
UPDATE orders SET is_done = true WHERE id = $1
`;

export const deleteOrderQuery = `
UPDATE orders SET is_deleted = true WHERE id = $1
`;
