import express from "express";

import { createTour, getTours } from "../controllers/tour.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), createTour);
router.get("/get", getTours);

export default router;
