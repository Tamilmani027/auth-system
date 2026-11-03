import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Context from '../src/Context';

const AdminRoute = () => {
    const { isLoggedIn, logout } = useContext(Context);
    const [status, setStatus] = useState('checking');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!isLoggedIn) return;

        let cancelled = false;

        const verifyAdmin = async () => {
            const token = localStorage.getItem('token');

            try {
                // Backend decides: 200 = admin, 403 = not admin.
                const response = await axios.get('/admin', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (cancelled) return;

                setMessage(response.data.message);
                setStatus('allowed');

            } catch (error) {
                if (cancelled) return;

                if (error.response?.status === 401) {
                    logout();
                    setStatus('unauthorized');
                } else if (error.response?.status === 403) {
                    setStatus('denied');
                } else {
                    setStatus('error');
                }
            }
        };

        verifyAdmin();

        return () => {
            cancelled = true;
        };
    }, [isLoggedIn, logout]);

    if (!isLoggedIn || status === 'unauthorized') {
        return <Navigate to="/login" replace />;
    }

    if (status === 'denied') {
        return <Navigate to="/" replace />;
    }

    if (status === 'error') {
        return <h3>Could not verify admin access. Please try again later.</h3>;
    }

    if (status === 'checking') {
        return <h3>Verifying admin access...</h3>;
    }

    return <Outlet context={{ message }} />;
};

export default AdminRoute;
