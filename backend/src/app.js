import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import client from './db/db';
import apiRoutes from './api/api-routes';
import errorHandler from './middlewares/errorHandler';
import authRouter from './auth/auth-routes';
import { swaggerOptions } from './constants/constants';

const app = express();
const specs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/auth', authRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', async (req, res) => {
  const data = await client.query('SELECT * FROM test');
  res.send(data.rows);
});

app.use(errorHandler);

export default app;
