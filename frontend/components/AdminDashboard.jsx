import { useOutletContext } from 'react-router-dom';

const AdminDashboard =() => {

    // AdminRoute already verified this user with the backend.
    const outletContext = useOutletContext();
    const message = outletContext?.message;

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
                    <p className="dashboard-message">{message}</p>
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
};

export default AdminDashboard;