
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
import { loginUser } from "../Services/authService";

import "../Styles/Login.css";

interface LoginFormValues {
  email: string;
  password: string;
}

function Login() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"success" | "error">("error");

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: ""
    },

    // Form validation
    validate: (values) => {
      const errors: Partial<LoginFormValues> = {};

      if (!values.email.trim()) {
        errors.email = "Email is required";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
      ) {
        errors.email = "Enter a valid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },

    // Login API integration
    onSubmit: async (values) => {
      setMessage("");

      try {
        const response = await loginUser({
          email: values.email,
          password: values.password
        });

        console.log("Login API Response:", response);

        setMessage(
          response.message || "Login successful!"
        );

        setMessageType("success");

      } catch (error: unknown) {
        console.error("Login API Error:", error);

        let errorMessage =
          "Login failed. Please check your credentials.";

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
    <div className="login-page">

      {/* Left Branding Section */}
      <div className="login-brand">

        <h1>
          Book<span>Store</span>
          <br />
          Management
        </h1>

        <div className="brand-underline"></div>

        <p>
          Manage your books, users, and
          <br />
          orders in one place.
        </p>

      </div>

      {/* Right Login Section */}
      <div className="login-form-section">

        <div className="login-card">

          <h2>Welcome Back!</h2>

          <p className="login-subtitle">
            Sign in to your BookStore Management account
          </p>

          {/* API Success / Error Message */}
          {message && (
            <MessageBar intent={messageType}>
              <MessageBarBody>
                {message}
              </MessageBarBody>
            </MessageBar>
          )}

          <form
            className="login-form"
            onSubmit={formik.handleSubmit}
          >

            {/* Email Field */}
            <div className="form-group">

              <Label required>Email Address</Label>

              <div className="login-input-wrapper email-input">

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

              </div>

              {formik.touched.email && formik.errors.email && (
                <span className="error-text">
                  {formik.errors.email}
                </span>
              )}

            </div>

            {/* Password Field */}
            <div className="form-group">

              <Label required>Password</Label>

              <div className="login-input-wrapper password-input">

                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={(_, data) =>
                    formik.setFieldValue("password", data.value)
                  }
                  onBlur={formik.handleBlur}
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {formik.touched.password && formik.errors.password && (
                <span className="error-text">
                  {formik.errors.password}
                </span>
              )}

            </div>

            {/* Forgot Password */}
            <div className="login-options">

              <Link
                to="/forgot-password"
                className="forgot-password"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}
            <Button
              appearance="primary"
              type="submit"
              className="login-button"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting
                ? "Logging in..."
                : "Login"}
            </Button>

          </form>

          {/* Registration Navigation */}
          <p className="register-link">
            Don't have an account?{" "}

            <Link to="/register">
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
