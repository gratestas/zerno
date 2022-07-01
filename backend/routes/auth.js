import express from "express";
const router = express.Router();

import {
  signin,
  signup,
  signout,
  verify,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";
import { validateResetPasswordToken } from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);
router.get("/verify/:token", verify);
router.post("/forgot-password", forgotPassword);
router.post(
  "/reset-password/:id/:token",
  validateResetPasswordToken,
  resetPassword
);

export default router;
