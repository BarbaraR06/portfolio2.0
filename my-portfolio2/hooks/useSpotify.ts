
import { useState, useEffect } from "react";

export function useSpotify() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch("/api/spotify/token");
        const data = await res.json();
        if (res.ok && data.access_token) {
          setAccessToken(data.access_token);
          setIsAuthenticated(true);
        } else {
          setAccessToken(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        setAccessToken(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, []);

  return { accessToken, isAuthenticated, loading, setAccessToken, setIsAuthenticated };
}
