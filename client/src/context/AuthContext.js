import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as api from "../api/auth";

const AuthContext = createContext();

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(userData?.token || null);
  const [user, setUser] = useState();

  const origin = location.state?.from?.pathname || "/";

  const signup = async (formData) => {
    try {
      const data = await api.signup(formData);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data.newUser);
      setToken(data.token);
      navigate(origin);
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (formData) => {
    try {
      const data = await api.signin(formData);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data.user);
      setToken(data.token);
      navigate(origin);
    } catch (error) {
      console.log(error);
    }
  };

  const signout = () => {
    setUser(null);
    setToken(null);
    navigate("/auth");
  };
  return (
    <AuthContext.Provider
      value={{
        token,
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

export const useAuth = () => useContext(AuthContext);
