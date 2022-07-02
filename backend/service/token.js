import jwt from "jsonwebtoken";

const generateAccessToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const tokenService = { generateAccessToken, generateRefreshToken };
export default tokenService;
