import React, { useContext } from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Context from '../src/Context';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage=()=> {
	const navigate=useNavigate();
	const {isLoggedIn, login ,logout} = useContext(Context);

	const initialValues={
		email:"",
		password:""
	};

	const validationSchema=Yup.object({
		 email: Yup.string()
					.email("Invalid email")
					.required("Email is required"),
		
				password: Yup.string()
					.min(6, "Password must be at least 6 characters")
					.required("Password is required"),
	})

	const handleSubmit = async (values, {resetForm, setSubmitting})=>{
		try{
			const response= await axios.post('/login',values);
			const token=response.data.user.token;
			localStorage.setItem('token',token);
			login()
			console.log(response.data);
			resetForm();
			toast.success(response.data.message || 'Login successful');
			navigate('/');
		}
		catch (error){
			console.error(error);
			toast.error(error.response?.data?.message || 'Login failed');
		}
		finally{
			setSubmitting(false);
		}
	};

	return (
		<>
		<div className='loginPage'>
			<h2>Login</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form className='loginForm'>
					<div  className="formGroup">
							<Field
								type="email"
								name="email"
								placeholder="Email"
								className="Field"

							/>
							<ErrorMessage
							name="email"
							component="p"
						/>						
					</div>
					<div  className="formGroup">
						<Field
							type="password"
							name="password"
							placeholder="Password"
							 className="Field"

						/>
						<ErrorMessage
							name="password"
							component="p"
						/>
					</div>
					<button type="submit">Login</button>
					<Link to='/forgot-password'>Forgot Password ?</Link>
				</Form>

			</Formik>
		</div>
		</>
	)
}

export default LoginPage