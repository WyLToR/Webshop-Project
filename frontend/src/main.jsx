import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/landing-page/LandingPage';
import Products from './pages/products/Products';
import ProductDetails from './pages/product-details/ProductDetails';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import UserDetails from './pages/user-details/UserDetails';
import UserOrders from './components/user/UserOrders';
import AdminOrders from './pages/admin/orders/AdminOrders';
import AdminUsers from './pages/admin/users/AdminUsers';
import AdminProducts from './pages/admin/products/AdminProducts';
import AdminLayout from './pages/admin/admin-layout/AdminLayout';
import AdminCategories from './pages/admin/categories/AdminCategories';
import Order from './components/order/Order';
import ActivateUser from './components/user/ActivateUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetails />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
      {
        path: '/activate/email/',
        element: <ActivateUser />,
      },
      {
        path: '/user/:id',
        element: <UserDetails />,
        children: [
          {
            path: 'orders',
            element: <UserOrders />,
          },
        ],
      },
      {
        path: '/user/:id/order',
        element: <Order />,
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: '/admin',
            element: <AdminProducts />,
          },
          {
            path: 'products',
            element: <AdminProducts />,
          },
          {
            path: 'categories',
            element: <AdminCategories />,
          },
          {
            path: 'orders',
            element: <AdminOrders />,
          },
          {
            path: 'users',
            element: <AdminUsers />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
