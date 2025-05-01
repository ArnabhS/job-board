import express from "express";
import { getJobs, getJobById, uploadJobs } from "../controllers/jobs.controller.js";

const router = express.Router();

router.get("/",getJobs);
router.get("/:id", getJobById);
router.post("/upload", uploadJobs);

export default router;