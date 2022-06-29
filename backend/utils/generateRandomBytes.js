import crypto from "crypto";

const generateRandomBytes = (length) => {
  return crypto.randomBytes(length).toString("hex");
};
export default generateRandomBytes;
