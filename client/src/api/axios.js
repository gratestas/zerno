import axios from "axios";

const BASE_URL = process.env.BASE_URL;
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
