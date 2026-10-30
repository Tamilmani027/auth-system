import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
	const { token } = useParams(); 
	const navigate = useNavigate(); 

	const [password, setPassword] = useState(''); 
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = async (e) => { 
		e.preventDefault(); 
		if (password.length < 6) { 
			return toast.error("Password must be at least 6 characters"); 
		} 
			if (password !== confirmPassword) { 
				return toast.error("Passwords do not match"); 
			} 
			try { 
				const response = await axios.post( `/reset-password/${token}`, { password } ); 
				toast.success(response.data.message); 
				navigate('/login'); 
			} 
			catch (error) { 
				toast.error( error.response?.data?.message || "Password reset failed" ); } 
			};

	return (
		<div className='resetPasswordPage'>
			<div className='resetPassword'>
				<h2>Reset Password</h2>
				<form onSubmit={handleSubmit}>
					<input 
					type='password' 
					placeholder='Enter new password' 
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
					required
					/>
					<input type="password" 
					placeholder="Confirm new password" 
					value={confirmPassword} 
					onChange={(e) => setConfirmPassword(e.target.value)} 
					required />
					<button type='submit'>Reset Password</button>
				</form>
			</div>
		</div>
	)
}

export default ResetPassword;
