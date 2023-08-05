export const addToCartQuery = `
    INSERT INTO carts(user_id, product_id, amount)
    VALUES($1, $2, $3) RETURNING *;
`;

export const findCartItem = `
    SELECT * FROM carts WHERE user_id = $1 AND product_id = $2
`;

export const deleteItemFromCartQuery = `
    DELETE FROM carts WHERE user_id = $1 AND product_id = $2
`;

export const getUserCartQuery = `
SELECT products.name, products.price, products.quantity, products.created, products.product_url, carts.amount, products.id 
FROM carts
JOIN products ON(products.id = carts.product_id)
WHERE user_id = $1
ORDER BY products.name ASC;
`;

export const increaseAmountQuery = `
   UPDATE carts
    SET amount = amount + $3
    WHERE product_id = $2 AND user_id = $1
    RETURNING *
`;

export const decreaseAmountQuery = `
   UPDATE carts
    SET amount = amount - $3
    WHERE product_id = $2 AND user_id = $1
    RETURNING *
`;

export const deleteUserItems = `
    DELETE FROM carts
    WHERE user_id=$1
    RETURNING *
`;
