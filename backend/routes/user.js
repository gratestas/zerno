import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);

//TODO:use auth middleware for other routes like products, customers..(if acess control is needed)
export default router;
