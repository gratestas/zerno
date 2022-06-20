import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/",
});

export const options = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};