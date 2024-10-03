import { useEffect, useState } from "react";

import { useAuth } from "@clerk/clerk-react";

let isPulling = false;

const useJwtToken = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [refreshTimeout, setRefreshTimeout] = useState<number | null>(null);

  useEffect(() => {
    // Ensure the process only if we're not already pulling
    if (isPulling) {
      return;
    }

    isPulling = true;

    async function loadToken() {
      const newToken = await getToken();

      if (!newToken) {
        console.log(`No token available. Requesting a fresh one in 1s`);
        const timeoutId = window.setTimeout(loadToken, 1_000);
        setRefreshTimeout(timeoutId);
        return;
      }

      setToken(`Bearer ${newToken}`);

      const now = Date.now();
      const exp = JSON.parse(atob(newToken.split(".")[1])).exp * 1000;
      const tokenExpiresIn = exp - now;

      // Schedule token refresh shortly before it expires
      if (tokenExpiresIn <= 5_000) {
        console.log("Token expiring soon, refreshing in 1 second...");
        const timeoutId = window.setTimeout(loadToken, 1_000);
        setRefreshTimeout(timeoutId);
        return;
      } else {
        const refreshTime = Math.max(tokenExpiresIn - 5_000, 5_000); // Wait at least 5 seconds
        console.log(`Scheduling token refresh in ${refreshTime} ms...`);
        const timeoutId = window.setTimeout(loadToken, refreshTime);
        setRefreshTimeout(timeoutId);
      }
    }

    // Initial token load
    loadToken();

    // Cleanup timeout on component unmount
    return () => {
      if (refreshTimeout) {
        console.log("Cleaning up refresh timeout");
        window.clearTimeout(refreshTimeout);
      }
    };
  }, [token, setToken]);

  return token;
};

export default useJwtToken;
