
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Input,
  Label,
  MessageBar,
  MessageBarBody
} from "@fluentui/react-components";

import { useFormik } from "formik";

import { registerUser } from "../Services/authService";
import type { RegisterRequest } from "../Types/auth.types";

import "../Styles/Register.css";

interface RegisterFormValues extends RegisterRequest {
  confirmPassword: string;
}

function Register() {

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"success" | "error">("error");

  const formik = useFormik<RegisterFormValues>({

    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },

    // Manual Form Validation
    validate: (values) => {

      const errors: Partial<
        Record<keyof RegisterFormValues, string>
      > = {};

      if (!values.fullName.trim()) {
        errors.fullName = "Full name is required";
      }

      if (!values.email.trim()) {
        errors.email = "Email is required";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
      ) {
        errors.email = "Enter a valid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password =
          "Password must contain at least 8 characters";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword =
          "Please confirm your password";
      } else if (
        values.password !== values.confirmPassword
      ) {
        errors.confirmPassword =
          "Passwords do not match";
      }

      return errors;
    },

    // Registration API Integration
    onSubmit: async (values, { resetForm }) => {

      setMessage("");

      try {

        const registerData: RegisterRequest = {
          fullName: values.fullName,
          email: values.email,
          password: values.password
        };

        const response = await registerUser(registerData);

        console.log("Registration API Response:", response);

        setMessage(
          response.message || "Registration successful!"
        );

        setMessageType("success");

        resetForm();

      } catch (error: unknown) {

        console.error("Registration API Error:", error);

        let errorMessage =
          "Registration failed. Please try again.";

        if (axios.isAxiosError(error)) {
          errorMessage =
            error.response?.data?.message || errorMessage;
        }

        setMessage(errorMessage);
        setMessageType("error");

      }
    }
  });

  return (

    <div className="register-page">

      {/* Left Branding Section */}
      <div className="register-brand">

        <h1>
          Book<span>Store</span>
          <br />
          Management
        </h1>

        <div className="register-brand-underline"></div>

        <p>
          Manage your books, users, and
          <br />
          orders in one place.
        </p>

      </div>

      {/* Right Registration Section */}
      <div className="register-form-section">

        <div className="register-card">

          <h2>Create Account</h2>

          <p className="register-subtitle">
            Register to access BookStore Management
          </p>

          {/* Success / Error Message */}
          {message && (
            <MessageBar intent={messageType}>
              <MessageBarBody>
                {message}
              </MessageBarBody>
            </MessageBar>
          )}

          <form
            className="register-form"
            onSubmit={formik.handleSubmit}
          >

            {/* Full Name */}
            <div className="form-group">

              <Label required>Full Name</Label>

              <Input
                name="fullName"
                placeholder="Enter your full name"
                value={formik.values.fullName}
                onChange={(_, data) =>
                  formik.setFieldValue("fullName", data.value)
                }
                onBlur={formik.handleBlur}
              />

              {formik.touched.fullName &&
                formik.errors.fullName && (
                  <span className="error-text">
                    {formik.errors.fullName}
                  </span>
                )}

            </div>

            {/* Email */}
            <div className="form-group">

              <Label required>Email Address</Label>

              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={(_, data) =>
                  formik.setFieldValue("email", data.value)
                }
                onBlur={formik.handleBlur}
              />

              {formik.touched.email &&
                formik.errors.email && (
                  <span className="error-text">
                    {formik.errors.email}
                  </span>
                )}

            </div>

            {/* Password */}
            <div className="form-group">

              <Label required>Password</Label>

              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={(_, data) =>
                  formik.setFieldValue("password", data.value)
                }
                onBlur={formik.handleBlur}
              />

              {formik.touched.password &&
                formik.errors.password && (
                  <span className="error-text">
                    {formik.errors.password}
                  </span>
                )}

            </div>

            {/* Confirm Password */}
            <div className="form-group">

              <Label required>Confirm Password</Label>

              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formik.values.confirmPassword}
                onChange={(_, data) =>
                  formik.setFieldValue(
                    "confirmPassword",
                    data.value
                  )
                }
                onBlur={formik.handleBlur}
              />

              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="error-text">
                    {formik.errors.confirmPassword}
                  </span>
                )}

            </div>

            {/* Create Account Button */}
            <Button
              appearance="primary"
              type="submit"
              className="register-button"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>

          </form>

          {/* Login Navigation */}
          <p className="register-login-link">
            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;
