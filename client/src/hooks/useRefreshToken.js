import useAuth from "./useAuth";
import * as api from "../api/refreshToken";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  const refresh = async () => {
    const { accessToken } = await api.refreshToken();
    console.log("new token", accessToken);
    setToken(accessToken);
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
