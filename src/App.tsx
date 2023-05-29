import { ConfigProvider } from 'antd';
import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Auth, Calendar, Company, Notifications, Groups, Tasks, Task } from './pages';
import { AuthProvider } from './contexts/AuthContext';
import { ROUTE } from 'src/constants/routes';

const router = createBrowserRouter([
  {
    path: ROUTE.Company.Index,
    element: <Company />
  },
  {
    path: ROUTE.Notifications.Index,
    element: <Notifications />
  },
  {
    path: ROUTE.Groups.Index,
    element: <Groups />
  },
  {
    path: ROUTE.Groups.Tasks(),
    element: <Tasks />
  },
  {
    path: ROUTE.Groups.Task(),
    element: <Task />
  },
  {
    path: ROUTE.Calendar.Index,
    element: <Calendar />
  },
  {
    path: ROUTE.Auth.Index,
    element: <Auth />
  },
  {
    path: ROUTE.Index,
    element: <Navigate to={ROUTE.Company.Index} />
  }
]);

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#a3a098'
        }
      }}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
