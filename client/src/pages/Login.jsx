import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import {
  errorMessage,
  getGlobalItem,
  setGlobalItem,
  successMessage,
} from "../utils/utils";
import { authentication } from "../services/auth.services";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getGlobalItem("token")) navigate("/");
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const details = await authentication(values);
      if (details?.statusCode === 200) {
        setGlobalItem("token", details?.data?.token);
        setGlobalItem("user", details?.data?.user);
        setSubmitting(false);
        navigate("/dashboard");
        successMessage(details?.message);
      } else {
        errorMessage(details?.message);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
