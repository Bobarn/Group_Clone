import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import CreateProduct from '../components/ProductFormPage/CreateProduct/CreateProduct';
import UpdateProduct from '../components/ProductFormPage/UpdateProduct/UpdateProduct';
import ProductDetailsPage from '../components/ProductDetails/ProductDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailsPage />
      },
      {
        path: "/products/new",
        element: <CreateProduct />
      },
      {
        path: "/products/:productId/edit",
        element: <UpdateProduct />
      },
    ],
  },
]);
