import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useRefreshToken, useAuth, useLocalStorage } from "../hooks";

const PersistentAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { token } = useAuth();
  const [rememberMe] = useLocalStorage("rememberMe", false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log({ isLoading });
    console.log(`accessToken: ${JSON.stringify(token)}`);
  }, [isLoading]);

  if (!rememberMe) return <Outlet />;
  return <>{isLoading ? <p>Loading ...</p> : <Outlet />}</>;
};

export default PersistentAuth;
