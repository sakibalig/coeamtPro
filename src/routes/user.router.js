import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { registerProject } from "../controllers/project.controller.js";
import registerManPower from "../controllers/manPower.controller.js";
// import { authorization } from "../middlewares/userAuth.js";
import multer from "multer";
import path from 'path'
import {  getAvailableBalance,getFundUsesByprojectId, updateAvailableBalance } from "../controllers/fund.controller.js";
import { projectDetail } from "../controllers/projectDetail.controller.js";
import { addUseFund} from "../controllers/useFund.controller.js";
import { getAllProjects } from "../controllers/getAllProject.controller.js";
import getManPowerByProjectId from "../controllers/getManPowerById/getManPowerById.js";
import { fundDetail } from "../controllers/getFundDetailsById/getFundDetailsById.js";
import { getProjectbyFilter } from "../controllers/getProjectbyFilter/getProjectbyFilter.js";
// import { manPower } from "../models/manPower.model.js";
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/registerUser",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.post("/registerProject",registerProject);
router.post("/registerManPower",registerManPower);
router.get('/projectDetails/:projectId',projectDetail);
router.get('/fundDetails/:projectId',fundDetail);

router.get('/project/:projectId',getAvailableBalance);
router.put('/project/:projectId/fund',updateAvailableBalance);
router.post('/useFund', upload.single('invoice'), addUseFund);
router.get('/getAllProjects',getAllProjects);
router.get('/getFundUses/:projectId',getFundUsesByprojectId);
router.get('/getManpower/:projectId',getManPowerByProjectId);
router.get('/filterProject',getProjectbyFilter);

export default router;
