import express from "express";
import { saveJob, getAppliedJobs, getSavedJobs, applyJob, checkIfJobSaved } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/save-job/:jobId",requireAuth,saveJob);
router.post("/apply/:jobId",requireAuth,applyJob);
router.get("/saved-jobs",requireAuth,getSavedJobs);
router.get("/applied-jobs",requireAuth,getAppliedJobs);
router.get("/saved-jobs/:jobId",requireAuth,checkIfJobSaved);
router.get("/applied-jobs/:jobId",requireAuth,checkIfJobSaved);

export default router;


