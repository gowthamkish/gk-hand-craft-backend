import express from "express";
const router = express.Router();
import { register, login } from "../controller/auth.js";

router.post("/register", register);
router.post("/login", login);
// router.get("/hello", (req, res) => {
//   res.json("Hello World");
// });

export default router;
