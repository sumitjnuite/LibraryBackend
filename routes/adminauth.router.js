import express from "express";
const router = express.Router();
import { loginAdminUser } from "../controllers/adminauth.controller.js";

// router.post("/register", registerUser);
router.post('/adminlogin', loginAdminUser);

export default router;