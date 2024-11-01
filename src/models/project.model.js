import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the BudgetAllocation schema
const budgetAllocationSchema = new Schema({
  fundType: { type: String },
  installments: {
    installment1: { type: Number, default: 0 },
    installment2: { type: Number, default: 0 },
    installment3: { type: Number, default: 0 },
    installment4: { type: Number, default: 0 },
    installment5: { type: Number, default: 0 },
  },
  totalAmount: { type: Number, default: 0 },
});

// Define the Document schema
const documentSchema = new Schema({
  documentType: { type: String },
  documentFile: { type: String },  // This would typically store the file path or URL
});

// Define the ProjectStaff schema
const projectStaffSchema = new Schema({
  name: { type: String },
  numberOfPost: { type: Number },
  salaryPerHead: { type: Number },
  totalSalary: { type: Number },
  totalAmount: { type: Number },
});

// Define the ProjectPi schema for multiple PI/Co-PI details
const projectPiSchema = new Schema({
  role: { type: String },
  department: { type: String },
  piName: { type: String },
  employeeCode: { type: String },
});

// Define the main Project schema
const projectSchema = new Schema({
  projectType: { type: String },
  projectTitle: { type: String },
  projectCode: { type: String, required: true, unique: true },
  projectInitiation: { type: Date },
  projectDuration: { type: String },  // Duration can be stored as a string (e.g., '6 months')
  projectClosing: { type: Date },
  projectCost: { type: Number },
  numberOfInstallments: { type: Number },
  sponsorName: { type: String },
  sponsorAddress: { type: String },
  contactPersonName: { type: String },
  contactPersonDesignation: { type: String },
  contactPersonMobile: { type: String },
  contactPersonEmail: { type: String },
  budgetAllocation: [budgetAllocationSchema],  // Embedding BudgetAllocation schema
  documents: [documentSchema],  // Embedding Document schema
  projectStaff: [projectStaffSchema],  // Embedding ProjectStaff schema
  projectPi: [projectPiSchema],  // Embedding ProjectPi schema as an array for multiple PI/Co-PI
});

// Export the Project model
export const Project = mongoose.model('Project', projectSchema);