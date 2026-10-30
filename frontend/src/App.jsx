import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';

import Home from '../components/Home';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import Context from './Context';
import { useState } from 'react';
import ForgotPassword from '../components/ForgotPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path:'/forgot-password',
        element:<ForgotPassword/>
      }
    ],
  },
]);

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn')==='true');

    const login = () => {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

  return (
    <Context.Provider value={{isLoggedIn, login ,logout}}>
        <RouterProvider router={router} />
    </Context.Provider>
  )
};

export default App;