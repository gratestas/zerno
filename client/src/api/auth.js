import axios, { options } from "../api/axios";

const AUTH_URL = "/api/auth";

export const signup = async (formData) => {
  console.log(formData);
  const { data } = await axios.post(`${AUTH_URL}/signup`, formData, options);

  console.log("from signup api", data);
  return data; //data = { newUser, token}
};

export const signin = async (formData) => {
  console.log("signin api: got here");
  const { data } = await axios.post(`${AUTH_URL}/signin`, formData, options);
  console.log("from signin api", data);
  return data;
};

export const signout = async () => {
  await axios.post(`${AUTH_URL}/signout`, options);
};

export const forgotPassword = async (email) => {
  await axios.post(`${AUTH_URL}/forgot-password`, { email: email }, options);
};

export const resetPassword = async (password, id, token) => {
  await axios.post(
    `${AUTH_URL}/reset-password/${id}/${token}`,
    { password },
    options
  );
};
