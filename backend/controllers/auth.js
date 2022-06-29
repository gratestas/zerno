import jwt from "jsonwebtoken";
import User from "../models/user.js";
import MailService from "../service/mail.js";
import generateRandomBytes from "../utils/generateRandomBytes.js";

const ONE_DAY_IN_MILLISEC = 24 * 60 * 60 * 1000;

// @desc   Register a new user
// @route  POST /user/signup
// @access Public
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(email, password, firstName, lastName);
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ message: "Please fill in all fields" });

  try {
    const user = await User.findOne({ email }).exec();
    if (user) return res.status(409).json({ message: "User already exists" });

    const activationToken = generateRandomBytes(32);

    await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
      activationToken,
    });

    const activationLink = `${process.env.API_URL}/api/activate/${activationToken}`;
    await MailService.sendActivationMail(email, activationLink);

    res.status(201).json({ message: "User created successfully" });
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
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser)
      return res.status(404).json({ message: "User does not exist" });

    const match = await foundUser.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(foundUser.email, foundUser._id);
    const refreshToken = generateRefreshToken(foundUser.email, foundUser._id);

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: ONE_DAY_IN_MILLISEC,
    });
    res.status(201).json({ accessToken, isAdmin: foundUser.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Oops, something went wrong" });
  }
};

export const signout = async (req, res) => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(204);
};

export const verifyRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.jwt);
  if (!cookies?.jwt) return res.status(401);
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (foundUser.id !== decoded.id) return res.sendStatus(403);

    const accessToken = generateAccessToken(foundUser.email, foundUser.id);
    res.status(201).json({ accessToken, isAdmin: foundUser.isAdmin });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const generateAccessToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10s",
  });
};

const generateRefreshToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15s",
  });
};
