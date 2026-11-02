import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Please login first');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    '/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setUser(response.data.user);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    'Failed to fetch profile'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, []);

    if (loading) {
        return <h3>Loading profile...</h3>;
    }

    if (error) {
        return <h3>{error}</h3>;
    }

    if (!user) {
        return <h3>Profile not found</h3>;
    }

    return (
        <div className="profileWrapper">
            <div className="profilePage">
                <h2>My Profile</h2>
                <h3>Name: {user.name}</h3>
                <h3>Email: {user.email}</h3>
                <h3>Role: {user.role || 'User'}</h3>
            </div>
        </div>
    );
};

export default Profile;
