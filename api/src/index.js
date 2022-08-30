import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./routes/user.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);

const MONGODB_URL =
  "mongodb+srv://codewithtodoapp:fullstacktodoapp@cluster0.ohvwrgz.mongodb.net/todo-db?retryWrites=true&w=majority";
const PORT = 5000;

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
