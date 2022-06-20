import express from "express";
const router = express.Router();

import { signin, signup, signout } from "../controllers/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);

export default router;
