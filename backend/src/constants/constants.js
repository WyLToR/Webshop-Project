export const { PORT } = process.env;
export const { DB_HOST } = process.env;
export const { DB_PORT } = process.env;
export const { DB_NAME } = process.env;
export const { DB_USER } = process.env;
export const { DB_PASSWORD } = process.env;
export const { JWT_SECRET } = process.env;
export const { CLOUDINARY_NAME } = process.env;
export const { CLOUDINARY_API_KEY } = process.env;
export const { CLOUDINARY_API_SECRET } = process.env;
export const { MAILER_API_URL } = process.env;
export const { MAILER_API_KEY } = process.env;
export const { FRONTEND_URL } = process.env;
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Team 01 FS API documentation',
      version: '1.0.0',
      description: 'API documentation for webshop backend',
    },
    servers: [
      {
        url: 'https://fullstack-backend-n4x7.onrender.com',
      },
    ],
  },
  apis: ['**/*.yaml'],
};
export const registerTemplateHeader = {
  headers: {
    accept: 'application/json',
    'api-key': MAILER_API_KEY,
    'content-type': 'application/json',
  },
};
