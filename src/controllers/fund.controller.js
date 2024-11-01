import { Project } from '../models/project.model.js';
import { useFund } from '../models/fundUsed.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Get the available balance for a specific project based on projectId
export const getAvailableBalance = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findOne({ projectId: projectId.trim() });

        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        return res.status(200).json(new ApiResponse(200, "Available balance retrieved successfully", project.availableBalance));
    } catch (error) {
        return res.status(400).json(new ApiResponse(400, error.message));
    }
};

// Update the available balance for a specific project based on projectId
export const updateAvailableBalance = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { amount } = req.body;

        const project = await Project.findOne({ projectId: projectId.trim() });

        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        project.availableBalance = amount;
        await project.save();

        return res.status(200).json(new ApiResponse(200, "Available balance updated successfully", project.availableBalance));
    } catch (error) {
        return res.status(400).json(new ApiResponse(400, error.message));
    }
};

// Add funds to the available balance for a specific project based on projectId
export const addFunds = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { amount } = req.body;

        const project = await Project.findOne({ projectId: projectId.trim() });

        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        project.availableBalance += amount;
        await project.save();

        return res.status(200).json(new ApiResponse(200, "Funds added successfully", project.availableBalance));
    } catch (error) {
        return res.status(400).json(new ApiResponse(400, error.message));
    }
};

// Get all fund uses for a specific project based on projectId
export const getFundUsesByprojectId = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Find all fund uses related to the project code
        const fundUses = await useFund.find({ projectId: projectId.trim() });

        if (fundUses.length === 0) {
            throw new ApiError(404, "No fund uses found for this project");
        }

        return res.status(200).json(new ApiResponse(200,fundUses,"Fund uses retrieved successfully"));
    } catch (error) {
        return res.status(400).json(new ApiResponse(400, error.message));
    }
};

export default {
    getAvailableBalance,
    updateAvailableBalance,
    addFunds,
    getFundUsesByprojectId,
};
