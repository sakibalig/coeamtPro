import mongoose, { Schema } from "mongoose";

const manPowerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  projectId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  EC: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true
  },
  DoB: {
    type: String,
    required: true,
    trim: true
  },
  highestDegree: {
    type: String,
    required: true,
    trim: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  salary: {
    type: Number, // Ensure this is a Number
    required: true
  },
});

export const manPower = mongoose.model("manPower", manPowerSchema);
