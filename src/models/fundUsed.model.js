import mongoose from "mongoose";

const { Schema } = mongoose;

const fundUsedSchema = new Schema({
  projectId: {
    type: String,
    required: true,
    trim: true,
  },
  projectTitle: {
    type: String,
    required: true,
    trim: true,
  },
  fund: {
    type: Number,
    required: true,
  },
  fundUsedType: {
    type: String,
    enum: [
      'Contingency',
      'Consumables',
      'Salary_expenditure',
      'Fellowship',
      'Equipment',
      'Travel_expenses',
      'Foreign_travel',
      'Administrative_expenses',
      'Consultancy_fee',
      'Miscellaneous_expenditure',
      'Honorarium',
      'Research_top_up',
      'Overhead_charges'
    ],
    required: true, 
  },
  description: {
    type: String,
    trim: true, 
  },
  url: {
    type: String,
    trim: true,
  },
});

export const useFund = mongoose.model("useFund", fundUsedSchema);
