import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
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

export const validateResetPasswordToken = async (req, res, next) => {
  const { id, token } = req.params;
  if (!id || !token)
    return res.status(400).json({ message: "Invalid request" });

  const user = await User.findById(id);
  console.log(user);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.resetPasswordToken !== token)
    return res.status(400).json({ message: "Password reset token is invalid" });

  req.userId = user._id;
  next();
};
