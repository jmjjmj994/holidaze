import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Layout } from './layout/Layout';
import { Login } from './routes/auth/login/Login';
import { Account } from './routes/account/Account';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/sign-in',
        element: <Login />,
      },
      {
        path: '/account',
        element: <Account />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
