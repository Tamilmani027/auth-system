import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from '../components/Home';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;