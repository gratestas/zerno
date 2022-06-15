import axios from "axios";

const baseUrl = "/api/user";

export const signup = async (formData) => {
  console.log(formData);
  const { data } = await axios.post(`${baseUrl}/signup`, formData);

  console.log("from signup api", data);
  return data; //data = { newUser, token}
};

export const signin = async (formData) => {
  const { data } = await axios.post(`${baseUrl}/signin`, formData);
  console.log("from signin api", data);
  return data;
};
