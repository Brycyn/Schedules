import { createContext, useState, useEffect, use } from "react";
import axios from "axios";

const AuthContext = createContext();

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [isAuthenticated, setAuthStatus] = useState(false);

  useEffect(() => {
    const checkForTokenExpirary = async () => {
      const refresh = localStorage.getItem("token_expirary");
      if (!accessToken || (refresh && Date.now() > refresh)) {
        await refreshAccessToken();
      }
    };
    checkForTokenExpirary();
  }, []);

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      });

      const { access_token, refresh_token, expires_in } = response.data;
      const expiryTime = Date.now() + expires_in * 1000;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("token_expirary", expiryTime);

      setAccessToken(accessToken);
      setAuthStatus(true);

      return access_token;

      // Handle the access token (e.g., save to state, localStorage, etc.)
    } catch (error) {
      console.error("Error exchanging code for token:", error);
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      setAuthStatus(false);
      return;
    }
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      });


      const { access_token, expires_in, } = response.data;
      const expiryTime = Date.now() + expires_in * 1000;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("token_expiry", expiryTime);

      setAccessToken(access_token);
      setAuthStatus(true);


      const events = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events/",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log('refresh events', events.data.items)

    } catch (error) {
      console.error("Error refreshing access token:", error);
      setAuthStatus(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiry");
    setAccessToken(null);
    setAuthStatus(false);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, exchangeCodeForToken, refreshAccessToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
