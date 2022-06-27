import useAuth from "./useAuth";
import * as api from "../api/refreshToken";

const useRefreshToken = () => {
  const { setToken, setUser } = useAuth();

  const refresh = async () => {
    const { accessToken, isAdmin } = await api.refreshToken();
    console.log("new token", accessToken);
    setToken(accessToken);
    setUser({ isAdmin });

    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
