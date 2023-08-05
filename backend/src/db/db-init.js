import client from './db';
import {
  createCartTable,
  createCategoryTable,
  createOrderedProductsTable,
  createOrdersTable,
  createProductsCategoriesTable,
  createProductTable,
  createUserTable,
} from './db-init-queries';

export default async function initDb() {
  await client.query(createUserTable);
  await client.query(createProductTable);
  await client.query(createCategoryTable);
  await client.query(createProductsCategoriesTable);
  await client.query(createOrdersTable);
  await client.query(createCartTable);
  await client.query(createOrderedProductsTable);
}
