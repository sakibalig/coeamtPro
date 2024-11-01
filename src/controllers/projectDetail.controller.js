import { Project } from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const projectDetail  = async(req,res)=>{
        
     try{
           const {projectId} = req.params;
           console.log(projectId);

           const project = await Project.findById(projectId);

            console.log(project);

            if(!project){
                   throw new ApiError(404,"project not found");
            }

            return res.status(200).json(new ApiResponse(200,project," this is the all detail about the project "));
     }catch(error){
            return res.status(400).json(new ApiResponse(400,error.message));
     }
}

export {projectDetail};