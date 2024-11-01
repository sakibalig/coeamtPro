import { z } from 'zod';
import { ApiResponse } from '../utils/ApiResponse.js';
import { manPower } from '../models/manPower.model.js'; // Ensure the path is correct

const manPowerValidationSchema = z.object({
  fullName: z.string().min(1, "Full name is required").trim(),
  projectId: z.string().min(1, "Project ID is required"),
  address: z.string().min(1, "Address is required").trim(),
  EC: z.string().min(1, "EC is required").trim(),
  mobileNumber: z.string().min(1, "Mobile number is required").trim(),
  DoB: z.string().min(1, "Date of Birth is required").trim(),
  highestDegree: z.string().min(1, "Highest degree is required").trim(),
  joiningDate: z.preprocess((val) => new Date(val), z.date({ required_error: "Joining date is required" })),
  endDate: z.preprocess((val) => new Date(val), z.date({ required_error: "End date is required" }))
    .refine(date => date > new Date(), "End date must be after joining date"),
  salary: z.string().min(1, "Salary is required") // Validate salary as string
    .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, "Salary must be a positive number")
    .transform(val => parseFloat(val)), // Convert to number
});

const registerManPower = async (req, res) => {
  try {
    const data = manPowerValidationSchema.parse(req.body);
    console.log(data);
    const newManPower = new manPower(data);
    await newManPower.save();
    console.log("Manpower saved successfully:", newManPower);
    return res.status(201).json(new ApiResponse(201, "Manpower registered successfully", newManPower));
  } catch (error) {
    console.error("Error saving manpower:", error);
    return res.status(400).json(new ApiResponse(400, error.message));
  }
};

export default registerManPower;
