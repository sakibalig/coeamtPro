import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

import ErrorMessage from "../src/components/ErrorMessage";
import SuccessMessage from "../src/SuccessMessage";
import "./UserLogin.css"; // Import the new CSS file
import { useAuth } from "../src/hooks/user";

const UserLogin = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Clear previous error and success messages
      setErrorMsg("");
      setSuccessMsg("");

      // Send POST request to the backend login API
      const response = await axios.post("http://localhost:8000/api/v1/user/login", data, {
        withCredentials: true, // Important for sending cookies
      });

      // If login is successful, show success message and redirect
      if (response.status === 200) {
        setSuccessMsg("Login successful! Redirecting...");
        
        // Save user details in context or local storage
        login({
          email: response.data.data.email,
          FirstName: response.data.data.FirstName,
          LastName: response.data.data.LastName,
        });

        // Reset the form fields
        reset();
        
        // Redirect to the dashboard
        navigate("/project-monitoring/project-dashboard");

        // Optional: Automatically clear success message after a delay
        setTimeout(() => {
          setSuccessMsg("");
        }, 2000);
      }
    } catch (error) {
      // Handle errors such as invalid email/password or server issues
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="user-login-container">
        <div className="user-login-header">
          <h1 className="user-login-title">Welcome Back!</h1>
          <p className="user-login-subtitle">Login here</p>
        </div>
        <form className="user-login-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="user-login-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jhondoe@gmail.com"
              className="user-login-input"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="user-login-input-message">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="user-login-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******"
              className="user-login-input"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="user-login-input-message">
                {errors.password.message}
              </p>
            )}
          </div>
          <ErrorMessage message={errorMsg} />
          <SuccessMessage message={successMsg} />

          <button type="submit" className="user-login-button">
            Click to Login
          </button>
        </form>
        <p className="user-login-register">
          Don't have an account?{" "}
          <Link to="/register" className="user-login-register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;