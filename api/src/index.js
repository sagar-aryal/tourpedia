import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";

const app = express();
dotenv.config();

// global middlewares

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// set uploads file public
app.use("./uploads", express.static("uploads"));

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
