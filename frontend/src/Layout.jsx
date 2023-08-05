import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { AuthProvider } from './contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { LoginProvider } from './contexts/LoginContext';

function Layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} UserProvider>
      <LoginProvider>
        <AuthProvider>
          <Header />
          <Outlet />
          <Footer />
          <ToastContainer position="bottom-right" />
        </AuthProvider>
      </LoginProvider>
    </QueryClientProvider>
  );
}

export default Layout;
