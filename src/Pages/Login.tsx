
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import {
//   Button,
//   Input,
//   Label,
//   MessageBar,
//   MessageBarBody,
// } from "@fluentui/react-components";

// import { useFormik } from "formik";
// import { loginUser } from "../Services/authService";
// import { useAuth } from "../Context/AuthContext";

// import "../Styles/Login.css";

// interface LoginFormValues {
//   email: string;
//   password: string;
// }

// function Login() {
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState<"success" | "error">("error");
//   const [showPassword, setShowPassword] = useState(false);

//   // Access global authentication state
//   const { dispatch } = useAuth();

//   const formik = useFormik<LoginFormValues>({
//     initialValues: {
//       email: "",
//       password: "",
//     },

//     validate: (values) => {
//       const errors: Partial<LoginFormValues> = {};

//       if (!values.email) {
//         errors.email = "Email is required";
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
//         errors.email = "Enter a valid email address";
//       }

//       if (!values.password) {
//         errors.password = "Password is required";
//       }

//       return errors;
//     },

//     onSubmit: async (values) => {
//       setMessage("");

//       try {
//         // Call Login API
//         const response = await loginUser({
//           email: values.email,
//           password: values.password,
//         });

//         // Store authentication data in Local Storage
//         localStorage.setItem("token", response.token);
//         localStorage.setItem("user", JSON.stringify(response.user));
//         localStorage.setItem("expiresAt", response.expiresAt);

//         // Update global authentication state
//         dispatch({
//           type: "LOGIN",
//           payload: {
//             token: response.token,
//             user: response.user,
//             expiresAt: response.expiresAt,
//           },
//         });

//         setMessage(response.message);
//         setMessageType("success");

//         console.log("Login Response:", response);
//         console.log("User Role:", response.user.role);

//       } catch (error: unknown) {
//         if (axios.isAxiosError(error)) {
//           setMessage(
//             error.response?.data?.message ||
//               "Login failed. Please try again."
//           );
//         } else {
//           setMessage("Something went wrong. Please try again.");
//         }

//         setMessageType("error");
//       }
//     },
//   });

//   return (
//     <div className="login-page">

//       {/* Branding Section */}
//       <div className="login-brand">
//         <h1>
//           Book<span>Store</span>
//           <br />
//           Management
//         </h1>

//         <div className="brand-underline"></div>

//         <p>
//           Manage your books, users, and
//           <br />
//           orders in one place.
//         </p>
//       </div>

//       {/* Login Form Section */}
//       <div className="login-form-section">
//         <div className="login-card">

//           <h2>Welcome Back!</h2>
//           <p>Login to your account</p>

//           {message && (
//             <MessageBar intent={messageType}>
//               <MessageBarBody>{message}</MessageBarBody>
//             </MessageBar>
//           )}

//           <form onSubmit={formik.handleSubmit} className="login-form">

//             {/* Email Field */}
//             <div className="form-group">
//               <Label htmlFor="email">Email Address</Label>

//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formik.values.email}
//                 onChange={(_, data) =>
//                   formik.setFieldValue("email", data.value)
//                 }
//                 onBlur={formik.handleBlur}
//                 aria-invalid={Boolean(
//                   formik.touched.email && formik.errors.email
//                 )}
//               />

//               {formik.touched.email && formik.errors.email && (
//                 <span className="error-message">
//                   {formik.errors.email}
//                 </span>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="form-group">
//               <Label htmlFor="password">Password</Label>

//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={formik.values.password}
//                 onChange={(_, data) =>
//                   formik.setFieldValue("password", data.value)
//                 }
//                 onBlur={formik.handleBlur}
//                 aria-invalid={Boolean(
//                   formik.touched.password && formik.errors.password
//                 )}
//                 contentAfter={
//                   <Button
//                     type="button"
//                     appearance="subtle"
//                     size="small"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? "Hide" : "Show"}
//                   </Button>
//                 }
//               />

//               {formik.touched.password && formik.errors.password && (
//                 <span className="error-message">
//                   {formik.errors.password}
//                 </span>
//               )}
//             </div>

//             {/* Forgot Password */}
//             <div className="forgot-password">
//               <Link to="/forgot-password">
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Login Button */}
//             <Button
//               type="submit"
//               appearance="primary"
//               className="login-button"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting ? "Logging in..." : "Login"}
//             </Button>

//           </form>

//           {/* Register Link */}
//           <div className="register-link">
//             Don't have an account? <Link to="/register">Register</Link>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }

// export default Login;





import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Input,
  Label,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";

import { useFormik } from "formik";

import { loginUser } from "../Services/authService";
import { useAuth } from "../Context/AuthContext";

import "../Styles/Login.css";

interface LoginFormValues {
  email: string;
  password: string;
}

function Login() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors: Partial<LoginFormValues> = {};

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Enter a valid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },

    onSubmit: async (values) => {
      setMessage("");

      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
        });

        // Save authentication data
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("expiresAt", response.expiresAt);

        // Update AuthContext
        dispatch({
          type: "LOGIN",
          payload: {
            token: response.token,
            user: response.user,
            expiresAt: response.expiresAt,
          },
        });

        setMessage("Login successful");
        setMessageType("success");

        // Navigate according to user role
        if (response.user.role === "Admin") {
          navigate("/admin-dashboard", { replace: true });
        } else if (response.user.role === "Customer") {
          navigate("/customer-dashboard", { replace: true });
        } else {
          setMessage("Invalid user role");
          setMessageType("error");
        }

      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setMessage(
            error.response?.data?.message ||
              "Login failed. Please try again."
          );
        } else {
          setMessage("Something went wrong. Please try again.");
        }

        setMessageType("error");
      }
    },
  });

  return (
    <div className="login-page">
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

      <div className="login-form-section">
        <div className="login-card">
          <h2>Welcome Back!</h2>
          <p>Login to your account</p>

          {message && (
            <MessageBar intent={messageType}>
              <MessageBarBody>{message}</MessageBarBody>
            </MessageBar>
          )}

          <form onSubmit={formik.handleSubmit} className="login-form">
            <div className="form-group">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={(_, data) =>
                  formik.setFieldValue("email", data.value)
                }
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(
                  formik.touched.email && formik.errors.email
                )}
              />

              {formik.touched.email && formik.errors.email && (
                <span className="error-message">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={(_, data) =>
                  formik.setFieldValue("password", data.value)
                }
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                contentAfter={
                  <Button
                    type="button"
                    appearance="subtle"
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                }
              />

              {formik.touched.password && formik.errors.password && (
                <span className="error-message">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <Button
              type="submit"
              appearance="primary"
              className="login-button"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
