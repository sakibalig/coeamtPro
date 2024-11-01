
import { Project } from "../../models/project.model";

// Function to get a project by project code
const getProjectByCode = async (projectCode) => {
    try {
        const project = await Project.findOne({ projectCode });
        if (!project) {
            return { message: "Project not found", success: false };
        }
        return { project, success: true };
    } catch (error) {
        console.error("Error retrieving project by code:", error);
        return { message: "An error occurred while retrieving the project", success: false };
    }
};

export default getProjectByCode;