import { Project } from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllProjects = async (req, res) => {
    try {
        const allProjects = await Project.find();

        return res.status(200).json(new ApiResponse(200, allProjects,"Projects fetched successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
};

export { getAllProjects };
