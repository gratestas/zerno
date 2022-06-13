// @desc   Register a new user
// @route  POST /user/signup
// @access Public
export const signup = async (req, res) => {
  res.json({ message: "Register user" });
};

// @desc   Authenticate a user
// @route  POST /user/signin
// @access Public
export const signin = async (req, res) => {
  res.json({ message: "Login user" });
};
