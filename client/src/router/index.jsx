/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createBrowserRouter, redirect } from 'react-router-dom';
import FormLogin from '../views/FormLogin';
import Home from '../views/Home';
import FormAdmin from '../views/FormAdmin';
import FormUpdateProduct from '../views/FormUpdateProduct';
import NotFound from '../views/NotFound';
import Layout from '../components/Layout';
import Categories from '../views/Categories';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: () => (localStorage.access_token ? null : redirect('/login')),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/admin',
        element: <FormAdmin />,
      },
      {
        path: '/detail/:id',
        element: <FormUpdateProduct />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
    ],
  },
  {
    path: '/login',
    element: <FormLogin />,
    loader: () => {
      if (localStorage.access_token) return redirect('/');
      return null;
    },
  },
]);
