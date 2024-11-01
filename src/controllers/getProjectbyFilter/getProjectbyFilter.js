import { Project } from "../../models/project.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getProjectbyFilter = async (req, res) => {
    try {
        const { projectType, projectStatus } = req.query;

        console.log('Received query params:', projectType, projectStatus);

        let query = {};

        if (projectType) {
            if (projectType === "sponsored") {
                query.projectCost = { $gt: 0 };
            } else if (projectType === "unsponsored") {
                query.projectCost = 0;
            }
        }

        const currentDate = new Date();
        if (projectStatus) {
            if (projectStatus === "ongoing") {
                query.projectClosing = { $gte: currentDate };
            } else if (projectStatus === "completed") {
                query.projectClosing = { $lt: currentDate };
            }
        }

        console.log('Constructed query:', query);

        const projects = await Project.find(query);
        console.log('Found projects:', projects.length);

        if (projects.length === 0) {
            return res.status(200).json(new ApiResponse(200, [], "No projects found with the specified filters"));
        }

        return res.status(200).json(new ApiResponse(200, projects, "Projects filtered successfully"));
    } catch (error) {
        console.error('Error in getProjectbyFilter:', error);
        return res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
};

export { getProjectbyFilter };