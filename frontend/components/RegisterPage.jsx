import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const navigate=useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });


const handleSubmit = async (values, { resetForm, setSubmitting }) => {
  try {
    const response = await axios.post("/register", values);
    console.log(response.data);
    toast.success("Registration successful!");
    resetForm();
    navigate('/login')
  } catch (error) {
    console.error(error);
    
    toast.error(error.response?.data?.message || "Registration failed")

  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="registerPage">
        <h2>
          Register
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="registerForm">
  <div className="formGroup">
    <Field
      type="text"
      name="name"
      placeholder="Name"
      className="Field"
    />
    <ErrorMessage name="name" component="p" />
  </div>

  <div className="formGroup">
    <Field
      type="email"
      name="email"
      placeholder="Email"
      className="Field"
    />
    <ErrorMessage name="email" component="p" />
  </div>

  <div className="formGroup">
    <Field
      type="password"
      name="password"
      placeholder="Password"
      className="Field"
    />
    <ErrorMessage name="password" component="p" />
  </div>

  <button type="submit">Register</button>
</Form>
  </Formik>
    </div>
  );
};

export default RegisterPage;
