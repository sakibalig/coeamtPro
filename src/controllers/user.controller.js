import { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// JWT secret key - Use an environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Define Zod schema for user registration
const registerSchema = z.object({
  FirstName: z.string().nonempty({ message: "First Name is required" }),
  LastName: z.string().nonempty({ message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters long" })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Define Zod schema for user login
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

// Register User Function
const registerUser = async (req, res) => {
  try {
    // Validate the request body using the register schema
    registerSchema.parse(req.body);

    const { FirstName, LastName, email, password } = req.body;

    // Check if a user with the same email already exists
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      FirstName,
      LastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with success and the token
    return res.status(201).json(new ApiResponse(201, { token }, "User registered successfully"));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(new ApiResponse(400, null, error.errors.map(err => err.message).join(', ')));
    }
    console.error("Error occurred during registration:", error.message);
    return res.status(500).json(new ApiResponse(500, null, "An unexpected error occurred while registering the user"));
  }
};

// Login User Function
const loginUser = async (req, res) => {
  try {
    // Validate the request body using the login schema
    loginSchema.parse(req.body);

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json(new ApiResponse(401, null, "Invalid email or password"));
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json(new ApiResponse(401, null, "Invalid email or password"));
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    // Set cookie options
    const options = {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS
      sameSite: 'Strict', // Helps protect against CSRF
      maxAge: 3600000, // 1 hour
    };

    // Respond with success and the token in a cookie
    return res
      .status(200)
      .cookie("accessToken", token, options) // Send token as a cookie
      .json(new ApiResponse(200, { email: user.email, FirstName: user.FirstName, LastName: user.LastName }, "User logged in successfully"));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(new ApiResponse(400, null, error.errors.map(err => err.message).join(', ')));
    }
    console.error("Error occurred during login:", error.message);
    return res.status(500).json(new ApiResponse(500, null, "An unexpected error occurred while logging in"));
  }
};

// Logout User Function
const logoutUser = (req, res) => {
  // Set cookie options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS
    sameSite: 'Strict',
  };

  return res
    .status(204) // No content
    .clearCookie("accessToken", options) // Clear the cookie
    .json(new ApiResponse(204, {})); // Respond with a success status
};

export { registerUser, loginUser, logoutUser };