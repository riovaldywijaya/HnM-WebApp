/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../views/LoginPage';
import HomePage from '../views/HomePage';
import DetailPage from '../views/DetailPage';
import LandingPage from '../views/LandingPage';
import Layout from '../components/Layout';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/products',
        element: <HomePage />,
      },
      {
        path: '/products/:id/:slug',
        element: <DetailPage />,
      },
    ],
  },
]);
