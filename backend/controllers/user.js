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
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid user data" });
  }
};

// @desc   Authenticate a user
// @route  POST /user/signin
// @access Public
export const signin = async (req, res) => {
  res.json({ message: "Login user" });
};
