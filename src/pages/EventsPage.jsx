import "./App.css";
import SearchButton from "./components/Calendar";
import { useState, useEffect, useContext } from "react";
import {
  AuthenticateWithGoogle,
  exchangeCodeForToken,
  fetchEvents,
} from "./components/GoogleAuth";
import CalendarEvents from "./components/Calendar";
import AuthContext from "../context/AuthContext";

function EventsPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);
    console.log(urlParams);

    if (code) {
      auth.exchangeCodeForToken(code).then((token) => {
        setAccessToken(token);
        fetchEvents(token).then((events) => {
          setEvents(events);
        });
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={AuthenticateWithGoogle}>Login With Google</button>
      </header>
      <div>
        {userInfo && (
          <>
            <h1>{userInfo.name}</h1>
            <h2>{userInfo.email}</h2>
          </>
        )}
      </div>
      <div>
        <h3>Your Calendar Events:</h3>
        {events ? (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.summary}</strong>
                <p>
                  {new Date(
                    event.start.dateTime || event.start.date
                  ).toLocaleString()}{" "}
                  -{" "}
                  {new Date(
                    event.end.dateTime || event.end.date
                  ).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found.</p>
        )}
      </div>
      <CalendarEvents />
    </div>
  );
}

export default EventsPage;
