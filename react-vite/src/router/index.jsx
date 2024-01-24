import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ReviewsComponent from '../components/ReviewForm/ReviewsComponent';
import ReviewComponent from '../components/ReviewForm/ReviewComponent';
import ReviewModal from '../components/ReviewForm/ReviewModal';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
