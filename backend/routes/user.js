import express from "express";
const router = express.Router();

import {
  signin,
  signup,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.js";
import { protect } from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
