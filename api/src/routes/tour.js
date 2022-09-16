import express from "express";
import multer from "multer";

import { createTour, getTours } from "../controllers/tour.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("image"), createTour);
router.get("/get", getTours);

export default router;
