import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios"; // Import axios

import ErrorMessage from "../src/components/ErrorMessage";
import SuccessMessage from "../src/SuccessMessage";
import "./UserRegister.css"; // Import the new CSS file

const UserRegister = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Clear any previous messages
      setErrorMsg("");
      setSuccessMsg("");

     

      // Send the form data to the backend for registration
      const response = await axios.post("https://ipmproject.onrender.com/api/v1/user/registerUser", {
        FirstName: data.firstName,
        LastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      console.log("asfd");
        
      // On success, show the success message and navigate to login
      setSuccessMsg("Registration successful! Redirecting to login...");
      reset(); // Reset the form
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000);
    } catch (error) {
        console.log(error)
      if (error.response && error.response.data) {
        // Display the error message from the backend
        setErrorMsg(error.response.data.message || "Registration failed");
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="user-register-container">
        <div className="user-register-header">
          <h1 className="user-register-title">Welcome to <i>iPm!</i></h1>
          <p className="user-register-subtitle">Register here</p>
        </div>
        <form className="user-register-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="firstName" className="user-register-label">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              className="user-register-input"
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <p className="user-register-input-message">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="user-register-label">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              className="user-register-input"
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <p className="user-register-input-message">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="user-register-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              className="user-register-input"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="user-register-input-message">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="user-register-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******"
              className="user-register-input"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="user-register-input-message">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="user-register-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="******"
              className="user-register-input"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="user-register-input-message">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <ErrorMessage message={errorMsg} />
          <SuccessMessage message={successMsg} />
          <button className="user-register-button">Click to Register</button>
        </form>
        <p className="user-register-login">
          Already have an account?{" "}
          <Link to="/login" className="user-register-login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
