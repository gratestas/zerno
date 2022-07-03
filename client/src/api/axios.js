import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_URL_DEV;
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

export const options = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};
