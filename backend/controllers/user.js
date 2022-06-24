import User from "../models/user.js";

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
