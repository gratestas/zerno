import express from "express";
const router = express.Router();

import {
  signin,
  signup,
  signout,
  verify,
  forgotPassword,
} from "../controllers/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);
router.get("/verify/:token", verify);
router.post("/forgot-password", forgotPassword);

export default router;
