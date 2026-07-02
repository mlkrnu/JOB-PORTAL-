import express from "express";
import {
    postjob,
    getAllJobs,
    getJobById,
    getAdminJobs
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Recruiter/Admin only
router.route("/post").post(isAuthenticated, postjob);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// Public Routes
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);

export default router;