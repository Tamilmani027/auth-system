import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('loading');

    const navigate = useNavigate();

    useEffect(() => {

        let cancelled = false;

        const verifyAdmin = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setStatus('unauthorized');
                return;
            }
            try {
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

                    localStorage.removeItem('token');
                    setStatus('unauthorized');
                    navigate('/login');
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
    }, [navigate]);

    if (status === 'loading') {
        return <p>Verifying admin access...</p>;
    }
    if (status === 'unauthorized') {
        return <p>Please login to continue.</p>;
    }
    if (status === 'denied') {
        return <h2>Access denied. Admin only.</h2>;
    }
    if (status === 'error') {
        return <p>Something went wrong. Please try again.</p>;
    }
    if (status === 'allowed') {
        return (
            <div className="admin-dashboard">
                <aside className="admin-sidebar">
                    <h2>Admin Panel</h2>
                    <nav>
                        <a href="#" className="active">Dashboard</a>
                        <a href="#">Users</a>
                        <a href="#">Products</a>
                        <a href="#">Orders</a>
                        <a href="#">Settings</a>
                    </nav>
                </aside>
                <main className="admin-content">

                    <h1>Dashboard</h1>
                    <p className="dashboard-subtitle">
                        Welcome to your admin dashboard
                    </p>
                    {message && (
                        <p className="dashboard-message">
                            {message}
                        </p>
                    )}
                    <div className="dashboard-cards">
                        <div className="dashboard-card">
                            <h3>Total Users</h3>
                            <p>2</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>Total Products</h3>
                            <p>85</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>Total Orders</h3>
                            <p>45</p>
                        </div>
                    </div>
                    <div className="recent-users">
                        <h2>Recent Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mani</td>
                                    <td>mani@gmail.com</td>
                                    <td>Admin</td>
                                </tr>
                                <tr>
                                    <td>John</td>
                                    <td>john@gmail.com</td>
                                    <td>User</td>
                                </tr>
                                <tr>
                                    <td>David</td>
                                    <td>david@gmail.com</td>
                                    <td>User</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        );
    }
};
export default AdminDashboard;