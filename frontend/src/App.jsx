import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Home from '../components/Home';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';

import Context from './Context';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'reset-password/:token',
                element: <ResetPassword />
            }
        ]
    }
]);

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const verifyToken = async () => {

            const token = localStorage.getItem('token');

            if (!token) {
                setIsLoggedIn(false);
                setLoading(false);
                return;
            }

            try {

                const response = await axios.get('/verify-token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    setIsLoggedIn(true);
                }

            } catch (error) {

                console.log(
                    'Token verification failed:',
                    error.response?.data || error.message
                );

                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                }

                setIsLoggedIn(false);

            } finally {
                setLoading(false);
            }
        };

        verifyToken();

    }, []);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    if (loading) {
        return <h2>Checking authentication...</h2>;
    }

    return (
        <Context.Provider value={{
            isLoggedIn,
            login,
            logout
        }}>
            <RouterProvider router={router} />
        </Context.Provider>
    );
}

export default App;
