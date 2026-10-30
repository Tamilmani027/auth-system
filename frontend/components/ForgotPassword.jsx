import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const navigate=useNavigate();

    const [mail, setMail] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/forgot-password', {
                email: mail
            });

            toast.success(response.data.message || 'Reset link sent');
            navigate('/login'); 
            setMail('');

        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className='forgotPasswordPage'>
            <div className='forgotPassword'>

                <label htmlFor="email">Password Reset</label>

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />

                <button onClick={handleSubmit}>
                    Send Link
                </button>

            </div>
        </div>
    );
};

export default ForgotPassword;