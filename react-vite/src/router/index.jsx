import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
import LoginFormModal from '../components/LoginFormModal';
// import SignupFormPage from '../components/SignupFormPage';
import SignupFormModal from '../components/SignupFormModal';
import LandingPage from '../components/LandingPage/LandingPage';
import CategoryProducts from '../components/CategoryProducts/CategoryProduts';
import Layout from './Layout';
import ReviewsComponent from '../components/ReviewForm/ReviewsComponent';
import ReviewComponent from '../components/ReviewForm/ReviewComponent';
import FavoritesPage from '../components/FavoritedPage/FavoritedPage';
import ReviewModal from '../components/ReviewForm/ReviewModal';
import CreateProduct from '../components/ProductFormPage/CreateProduct/CreateProduct';
import UpdateProduct from '../components/ProductFormPage/UpdateProduct/UpdateProduct';
import ProductDetailsPage from '../components/ProductDetails/ProductDetails';
import EditReviewComponent from '../components/ReviewForm/EditReviewComponent';
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
        path: "/reviews",
        element: <ReviewsComponent />,
      },
      {
        path: "/review/:productId",
        element: <ReviewComponent />,
      },
      {
        path: "/tester/:productId",
        element: <ReviewModal />,
      },
      {
        path: "/reviews",
        element: <ReviewsComponent />,
      },
      {
        path: "/review/:productId",
        element: <ReviewComponent />,
      },
      {
        path: "/edit_review/:productId",
        element: <EditReviewComponent />,
      },
      {
        path: "/tester/:productId",
        element: <ReviewModal />,
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
      }

    ],
  },
]);
