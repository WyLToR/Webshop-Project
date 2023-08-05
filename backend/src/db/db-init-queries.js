export const createUserTable = `
CREATE TABLE IF NOT EXISTS "users"
(
    "id" VARCHAR(32) PRIMARY KEY,
    "email" VARCHAR(50) UNIQUE NOT NULL,
    "password" VARCHAR(200) NOT NULL, 
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "postcode" VARCHAR(10),
    "state" VARCHAR(50),
    "city" VARCHAR(85),
    "street" VARCHAR(100),
    "house_number" VARCHAR(30),
    "is_deleted_user" BOOLEAN NOT NULL DEFAULT FALSE,
    "is_admin" BOOLEAN NOT NULL DEFAULT FALSE,
    "created" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)`;

export const createProductTable = `
CREATE TABLE IF NOT EXISTS "products"
(
    "id" VARCHAR(32) PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000),
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_url" VARCHAR(300),
    "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
export const createCategoryTable = `
CREATE TABLE IF NOT EXISTS "categories"
(
    "id" VARCHAR(32) PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL
)`;
export const createProductsCategoriesTable = `
CREATE TABLE IF NOT EXISTS "products_categories"
(
    "product_id" VARCHAR(32),
    "category_id" VARCHAR(32),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
)
`;
export const createCartTable = `
CREATE TABLE IF NOT EXISTS "carts"
(
    "user_id" VARCHAR(32) NOT NULL,
    "product_id" VARCHAR(32) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)`;
export const createOrdersTable = `
CREATE TABLE IF NOT EXISTS "orders"
(
    "id" VARCHAR(32) PRIMARY KEY,
    "user_id" VARCHAR(32) NOT NULL,
    "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "is_done" BOOLEAN NOT NULL DEFAULT FALSE,
    "delivery_date" TIMESTAMP,
    "is_deleted" BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
)`;
export const createOrderedProductsTable = `
CREATE TABLE IF NOT EXISTS "ordered_products"
(
    "order_id" VARCHAR(32),
    "product_id" VARCHAR(32),
    "amount" INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)
`;
