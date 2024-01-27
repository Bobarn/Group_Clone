import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
import LoginFormModal from '../components/LoginFormModal';
// import SignupFormPage from '../components/SignupFormPage';
import SignupFormModal from '../components/SignupFormModal';
import LandingPage from '../components/LandingPage/LandingPage';
import CategoryProducts from '../components/CategoryProducts/CategoryProduts';
import Layout from './Layout';
import FavoritesPage from '../components/FavoritedPage/FavoritedPage';
import CreateProduct from '../components/ProductFormPage/CreateProduct/CreateProduct';
import UpdateProduct from '../components/ProductFormPage/UpdateProduct/UpdateProduct';
import ProductDetailsPage from '../components/ProductDetails/ProductDetails';
import Orders from '../components/Orders/Orders';
import UserStore from '../components/UserStore/UserStore';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormModal />,
      },
      {
        path: "signup",
        element: <SignupFormModal />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage/>,
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
      {
        path: '/category/:category',
        element: <CategoryProducts />
      },
      {
        path: '/orders',
        element: <Orders />
      },
      {
        path: '/store',
        element: <UserStore />
      },
      {
        path: '*',
        element: <img alt='Itsy 404 Page Not Found' src='https://cdn.discordapp.com/attachments/1187515837817557065/1200678476466884739/image.png?ex=65c70df8&is=65b498f8&hm=6d168c4b09ed83f79b47beff4e2e84798876bf37b556d06f8cf48d2e3e9f2383&'/>
      }

    ],
  },
]);
