import  express from "express"; 
import{applyjob,getAppliedjob,getApplicants,updateStatus} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();

router.route("/apply/:id").get(isAuthenticated,applyjob);
router.route("/get").get(isAuthenticated,getAppliedjob);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);
export default router;