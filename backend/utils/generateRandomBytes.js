import crypto from "crypto";

const generateRandomBytes = (length) =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(length, (error, buffer) => {
      if (error) reject(error);

      const token = buffer.toString("hex");
      resolve(token);
    });
  });

export default generateRandomBytes;
