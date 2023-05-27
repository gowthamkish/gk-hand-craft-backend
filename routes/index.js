import express from "express";
import taskRoute from "../routes/taskRoute.js";
import authRoute from "../routes/authRoute.js";
import userRoute from "../routes/userRoute.js";
import { checkAuth } from "../controller/checkAuth.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", checkAuth, userRoute);
router.use("/tasks", checkAuth, taskRoute);

export default router;
