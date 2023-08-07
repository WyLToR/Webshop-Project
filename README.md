# Project README

## Description

This project consists of a frontend and backend application aiming to implement specific functionality. The frontend is built using React and utilizes various libraries for user interface development and data handling. The backend is built using Express and integrates various dependencies for HTTP requests, data storage, authentication, and documentation.

## Frontend

### Installation and Setup

1. Install the required dependencies:
```bash
cd frontend
npm install
```

2. Configure the Firebase settings in the `.env` file to enable authentication and data management.

3. Start the development server:
```bash
npm run dev
```

4. For production build, run:
```bash
npm run build
```

### Dependencies

- **bootstrap**: ^5.3.0
- **firebase**: ^10.1.0
- **firebase-tools**: ^12.4.7
- **formik**: ^2.4.2
- **jwt-decode**: ^3.1.2
- **react**: ^18.2.0
- **react-bootstrap**: ^2.8.0
- **react-dom**: ^18.2.0
- **react-icons**: ^4.10.1
- **react-query**: ^3.39.3
- **react-router-dom**: ^6.14.1
- **react-select**: ^5.7.4
- **react-toastify**: ^9.1.3
- **yup**: ^1.2.0
- **@types/react**: ^18.0.37
- **@types/react-dom**: ^18.0.11
- **@vitejs/plugin-react**: ^4.0.0
- **eslint**: 8.2.0
- **eslint-config-airbnb**: 19.0.4
- **eslint-plugin-import**: 2.25.3
- **eslint-plugin-jsx-a11y**: 6.5.1
- **eslint-plugin-react**: 7.28.0
- **eslint-plugin-react-hooks**: 4.3.0
- **eslint-plugin-react-refresh**: ^0.3.4
- **vite**: ^4.3.9

## Backend

### Installation and Setup

1. Install the required dependencies:
```bash
cd backend
npm install
```

2. Configure the environment variables in the `.env` file, especially the database connection details.

3. Start the development server:
```bash
npm run dev
```

4. For transpiling the source code to the `dist` directory, run:
```bash
npm run build
```

### Dependencies

- **axios**: ^1.4.0
- **bcrypt**: ^5.1.0
- **cloudinary**: ^1.37.3
- **cors**: ^2.8.5
- **dotenv**: ^16.3.1
- **express**: ^4.18.2
- **jsonwebtoken**: ^9.0.0
- **multer**: ^1.4.5-lts.1
- **nanoid**: ^3.0.0
- **pg**: ^8.11.1
- **swagger-jsdoc**: ^6.2.8
- **swagger-ui-express**: ^5.0.0
- **yup**: ^1.2.0
- **@babel/core**: ^7.22.5
- **@babel/node**: ^7.22.5
- **@babel/preset-env**: ^7.22.5
- **eslint**: ^7.32.0 || ^8.2.0
- **eslint-config-airbnb-base**: ^15.0.0
- **eslint-plugin-import**: ^2.25.2
- **nodemon**: ^2.0.22

## Important Notes

- Both frontend and backend applications can be run independently, but they need to be running together for full functionality.
- Make sure to have the appropriate runtime environment (Node.js, npm) for the project dependencies.
- Configuration for environment variables is done through the `.env` file.
- Source files for both frontend and backend are located in the `src` directories.

Enjoy working on the project! If you have any questions, feel free to ask.