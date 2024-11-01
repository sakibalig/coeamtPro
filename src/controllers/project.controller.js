import multer from 'multer';
import { Project } from '../models/project.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Multer configuration
const upload = multer();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to upload file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result.url);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Register a new project controller
export const registerProject = [
  upload.array('documents'), // This middleware will handle the file uploads
  async (req, res) => {
    try {
      console.log("Received body:", req.body);
      console.log("Received files:", req.files);

      // Parse the project data
      const projectData = JSON.parse(req.body.projectData);

      // Parse nested array fields, if they're sent as JSON strings
      projectData.projectPi = JSON.parse(req.body.projectPi || '[]');
      projectData.budgetAllocation = JSON.parse(req.body.budgetAllocation || '[]');
      projectData.documents = JSON.parse(req.body.documents || '[]');
      projectData.projectStaff = JSON.parse(req.body.projectStaff || '[]');

      // Handle file uploads using Cloudinary
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file => uploadToCloudinary(file));
        const uploadedUrls = await Promise.all(uploadPromises);

        console.log(uploadedUrls);

        // Update the documents array with the uploaded Cloudinary URLs
        projectData.documents = projectData.documents.map((doc, index) => ({
          ...doc,
          documentFile: uploadedUrls[index] // Replace file path with Cloudinary URL
        }));
      }

      // Save the project data to the database
      const newProject = new Project(projectData);
      await newProject.save();

      // Respond with success
      const response = new ApiResponse(201, newProject, 'Project registered successfully');
      res.status(response.statusCode).json(response);
    } catch (error) {
      console.error('Error registering project:', error);

      // Handle other errors
      const apiError = new ApiError(500, error.message || 'Error registering project', [], error.stack);
      res.status(apiError.statusCode).json(apiError);
    }
  }
];