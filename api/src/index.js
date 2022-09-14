import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/tours", tourRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Backend is running successfully to database and running at http://localhost:${PORT}/`
      );
    });
  })
  .catch((error) =>
    console.log("Backend did not get connect to MongoDB", error.message)
  );
