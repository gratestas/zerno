import axios, { options } from "../api/axios";

const REFRESH_URL = "api/refresh";

export const refreshToken = async () => {
  const { data } = await axios.get(REFRESH_URL, {
    withCredentials: true,
  });

  console.log("from refresh api", data);
  return data;
};
