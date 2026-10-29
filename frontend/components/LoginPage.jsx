import React from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage=()=> {
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
			console.log(response.data);
			alert(response.data.message);
			resetForm();
		}
		catch (error){
			console.error(error);

			alert(
				error.response?.data?.message || 'Login failed'
			);
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
				</Form>

			</Formik>
		</div>
		</>
	)
}

export default LoginPage