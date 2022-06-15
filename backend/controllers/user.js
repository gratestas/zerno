import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
import User from "../models/user.js";

// @desc   Register a new user
// @route  POST /user/signup
// @access Public
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ message: "Please fill in all fields" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: password,
    });
    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.email, newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid user data" });
  }
};

// @desc   Authenticate a user
// @route  POST /user/signin
// @access Public
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user.email, user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Oops, something went wrong" });
  }
};

// @desc   Get user's profile information
// @route  POST /user/profile
// @access Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user)
      res.status(200).json({
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    res.status(401).json({ message: "User not authorized to view this page" });
  }
};

// @desc   Update user's profile information
// @route  POST /user/profile
// @access Private
export const updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = `${firstName} ${lastName}` || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

const generateToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};
