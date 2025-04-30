import express from "express";
import { saveJob, getAppliedJobs, getSavedJobs, applyJob } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/save-job/:jobId",saveJob);
router.post("/apply/:jobId",applyJob);
router.get("/saved-jobs",getSavedJobs);
router.get("/applied-jobs",getAppliedJobs);

export default router;


