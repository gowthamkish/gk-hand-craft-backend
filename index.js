console.log("Hello world");

import express from "express";
import path from "path";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

const PORT = process.env.PORT || 5000;
const app = express();

const url = process.env.MONGO_URI;

console.log(url);

const connectionParams = {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
};

// middleware

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

console.log(path.join(__dirname, "../client", "index.html"));

// add middleware
app.use(express.static(path.join(__dirname, "../client", "build")));

// routes

app.use("/api", allRoutes);

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

const dbConnect = async () => {
  try {
    await mongoose.connect(url, connectionParams);
    console.log("Connected to the database ");
  } catch (error) {
    console.error(`Error connecting to the database. ${error}`);
  }
};

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running at port ${PORT}`);
});
