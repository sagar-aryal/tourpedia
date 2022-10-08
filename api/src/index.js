import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

const app = express();
dotenv.config();

// global middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// set uploads file public
app.use("/uploads", express.static("uploads"));

app.use("/users", userRouter);
app.use("/tours", tourRouter);

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Backend is running successfully to database and running at http://localhost:${PORT}/`
      );
    });
  })
  .catch((error) =>
    console.log("Backend did not get connect to MongoDB", error.message)
  );
