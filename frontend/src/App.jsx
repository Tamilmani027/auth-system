import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import Home from '../components/Home';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';

import Context from './Context';
import Profile from '../components/Profile';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';
import AdminRoute from '../components/AdminRoute';
import AdminDashboard from '../components/AdminDashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'register',
                element: <PublicRoute><RegisterPage /></PublicRoute>
            },
            {
                path: 'login',
                element: <PublicRoute><LoginPage /></PublicRoute>
            },
            {
                path: 'forgot-password',
                element: <PublicRoute><ForgotPassword /></PublicRoute>
            },
            {
                path: 'reset-password/:token',
                element: <PublicRoute><ResetPassword /></PublicRoute>
            },
            {
                path:'profile',
                element:<ProtectedRoute><Profile /></ProtectedRoute>
            },
            {
                path:'admin',
                element:<AdminRoute />,
                children: [
                    {
                        index: true,
                        element: <AdminDashboard />
                    }
                ]
            }
        ]
    }
]);

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
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
                    setUser(response.data.user);
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

                setUser(null);
                setIsLoggedIn(false);

            } finally {
                setLoading(false);
            }
        };

        verifyToken();

    }, []);

    const login = useCallback(async () => {
        const token = localStorage.getItem('token');

        try {
            // Role is not part of the login response, so fetch it here.
            const response = await axios.get('/verify-token', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setUser(response.data.user);
                setIsLoggedIn(true);
                return true;
            }
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
            }
        }

        setUser(null);
        setIsLoggedIn(false);
        return false;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
    }, []);

    if (loading) {
        return <h2>Checking authentication...</h2>;
    }

    return (
        <Context.Provider value={{
            isLoggedIn,
            user,
            login,
            logout
        }}>
            <RouterProvider router={router} />
        </Context.Provider>
    );
}

export default App;
