import { ApiError } from "../../utils/ApiError.js";
import { Project } from "../../models/project.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const fundDetail = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log(projectId);

    // Find the project by ID
    const project = await Project.findById(projectId);

    console.log(project);

    // Check if the project exists
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    // Extract budgetAllocation details
    const budgetAllocation = project.budgetAllocation;

    // Send a response with budgetAllocation details
    return res.status(200).json(new ApiResponse(200, budgetAllocation, "This is the Fund Details details for the project"));
  } catch (error) {
    return res.status(400).json(new ApiResponse(400, error.message));
  }
};

export { fundDetail };
