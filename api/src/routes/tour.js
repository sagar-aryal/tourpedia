import express from "express";

import { createTour, getTours } from "../controllers/tour.js";

const router = express.Router();

router.post("/create", createTour);
router.get("/get", getTours);

export default router;
