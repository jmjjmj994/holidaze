import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { App } from './app/App';
import './index.css';
import { Layout } from './layout/Layout';
import { Login } from './routes/auth/login/Login';
import { Register } from './routes/auth/register/Register';
import { Account } from './routes/account/Account';
import { Bookings } from './routes/bookings/Bookings';
import { Venue } from './routes/venue/Venue';

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
        path: '/register',
        element: <Register />,
      },
      {
        path: '/account',
        element: <Account />,
      },
      { path: '/venue/:id', element: <Venue /> },
      { path: '/bookings/:username', element: <Bookings /> },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/*       <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
