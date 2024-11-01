// import { projectStaff } from '../../models/projectStaff.model.js';
import { Project } from '../../models/project.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
// import { Project } from '../../models/project.model.js';

const getprojectStaffByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params; 
     
     console.log(projectId);
    const project = await Project.findById(projectId);

    console.log(project);

    const projectStaff = project.projectStaff;

    if (!project) {
       throw res.status(404).json(new ApiResponse(404, "projectStaff of Project not found"));
    }

    return res.status(200).json(new ApiResponse(200,projectStaff,"projectStaff fetched successfully"));
  } catch (error) {
    console.error("Error fetching projectStaff by project ID:", error);
    return res.status(500).json(new ApiResponse(500, "Internal server error"));
  }
};

export default getprojectStaffByProjectId;
