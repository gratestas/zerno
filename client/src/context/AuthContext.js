import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as api from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const origin = location.state?.from?.pathname || "/";

  const [token, setToken] = useState();
  const [user, setUser] = useState();

  const signup = async (formData) => {
    try {
      const data = await api.signup(formData);
      setUser(data.newUser);
      setToken(data.token);
      navigate(origin, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (formData) => {
    try {
      const { accessToken, isAdmin } = await api.signin(formData);
      setUser({ isAdmin });
      setToken(accessToken);
      navigate(origin, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    try {
      await api.signout();
      setUser(null);
      setToken(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        signup,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
