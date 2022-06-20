import express from "express";
const router = express.Router();

import { verifyRefreshToken } from "../controllers/user.js";

router.get("/", verifyRefreshToken);

export default router;
