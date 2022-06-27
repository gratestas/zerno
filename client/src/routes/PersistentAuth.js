import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistentAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { token } = useAuth();

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

  return <>{isLoading ? <p>Loading ...</p> : <Outlet />}</>;
};

export default PersistentAuth;
