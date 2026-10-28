import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";


const Register = () => {
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
    alert(response.data.message);

    resetForm();
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Registration failed"
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-3 border rounded-md"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-md"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-md"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;