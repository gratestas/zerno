import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      //get user from the token excluding password field
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(403).json({ message: "Not authorized" });
    }
  }

  if (!token)
    return res.status(401).json({ message: "Not authorized. Token not found" });
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    res.status(403);
    throw new Error("Access not granted");
  }
};
