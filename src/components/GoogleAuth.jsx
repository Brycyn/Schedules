import { useState, useEffect } from "react";

import axios from "axios";

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scope = process.env.REACT_APP_SCOPE;
const responseType = process.env.REACT_APP_RESPONSE_TYPE;
const apiKey = process.env.REACT_APP_API_KEY;

export function AuthenticateWithGoogle() {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(
    scope
  )}&access_type=offline`;

  const urlParams = new URLSearchParams(window.location.search);

  console.log("auth params from google", urlParams);
  window.location.href = authUrl;
}

export const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    localStorage.setItem("access_token", response.data.access_token);

    return response.data.access_token;

    // Handle the access token (e.g., save to state, localStorage, etc.)
  } catch (error) {
    console.error("Error exchanging code for token:", error);
  }
};

export const fetchEvents = async (token) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    localStorage.setItem("user", response.data);
    console.log("data", JSON.stringify(response));

    console.log("Events fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching calendar events:", error);
  }
};

export default function GoogleAuth() {
  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    console.log("Client ID: ", process.env.REACT_APP_CLIENT_ID);
    console.log("Client Secret: ", process.env.REACT_APP_CLIENT_SECRET);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);

    if (code) {
      exchangeCodeForToken(code);

      console.log(code);
    }
  }, []);
}

export const createEvents = async (token, body) => {
  try {
    console.log(token, "toke");
    const response = await axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("data", response.data);
  } catch (error) {
    console.error("error", error);
  }
};
