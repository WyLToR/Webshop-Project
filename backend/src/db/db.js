import { Client } from 'pg';
import {
  DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER,
} from '../constants/constants';

const client = new Client({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

export default client;
