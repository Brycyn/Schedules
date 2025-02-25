import FullCalendar from "@fullcalendar/react";
import "../App.css";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthenticateWithGoogle, fetchEvents } from "../components/GoogleAuth";
import { FcGoogle } from "react-icons/fc";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import EventModal from "../components/EventModal";
import { Banner } from "./Home";

const clientId = process.env.REACT_APP_CLIENT_ID;
let logged_in = true;

export default function CalendarEvents({ socket }) {
  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [calendarEvents, setCalendarEvent] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [username, setUsername] = useState("");
  const location = useLocation();

  const auth = useContext(AuthContext);
  useEffect(() => {
    auth.refreshAccessToken();
    const fetchGoogleEvents = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const navCode = location.state?.code;
      console.log(code);
      console.log("perms", urlParams);
      console.log("perms h", navCode);
      console.log("nav loc ", location);

      if (code) {
        localStorage.setItem("code", code);

        try {
          const token = await auth.exchangeCodeForToken(code);
          setAccessToken(token);
          const tkn = localStorage.getItem("access_token");

          const events = await auth.fetchEvents(socket);

          setUsername(events.summary);

          socket.emit("newUser", {
            username: events.summary,
            socketID: socket.id,
          });

          console.log("my events", events.summary);
          const newCalendarEvents = events.items?.map((e) => {
            var startDate = new Date(e.start.dateTime);
            var endDate = new Date(e.end.dateTime);

            return {
              title: e.summary,
              start: startDate,
              end: endDate,
            };
          });

          setCalendarEvent(newCalendarEvents);
          console.log(calendarEvents);
        } catch (error) {}
      } else if (!code && navCode) {
        if (auth.isAuthenticated) {
          try {
            const token = await auth.exchangeCodeForToken(navCode);
            setAccessToken(token);
            const tkn = localStorage.getItem("access_token");
            console.log(username, socket.id);

            const events = await auth.fetchEvents();

            setUsername(events.summary);
            socket.emit("newUser", {
              username: events.summary,
              socketID: socket.id,
            });

            console.log("my events", events.summary);
            const newCalendarEvents = events.items?.map((e) => {
              var startDate = new Date(e.start.dateTime);
              var endDate = new Date(e.end.dateTime);

              return {
                title: e.summary,
                start: startDate,
                end: endDate,
              };
            });

            setCalendarEvent(newCalendarEvents);
            console.log(calendarEvents);
          } catch (error) {}
        }
      }
    };

    fetchGoogleEvents();
  }, []);

  useEffect(() => {
    // Log calendar events when they are updated
    console.log("Updated Calendar Events:", calendarEvents);
  }, [calendarEvents]);

  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  console.log("auth parameter", auth);
  console.log("initial calendar events", calendarEvents);
  return (
    <>
      <Banner events={calendarEvents} />
      <div className="App" style={{ alignItems: "center", width: "100%" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        ></header>

        <div
          style={{
            height: "100vh",
            width: "100%",
            margin: "0 auto", // Horizontally centers the div

            // transform: "scale( 0.8)",
            borderWidth: 1,
            borderColor: "black",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FullCalendar
              plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: "title",
                left: "prev,next",
                center: "title",
                right: "dayGridWeek,dayGridMonth",
              }}
              dayHeaderFormat={{
                weekday: "short",

                omitCommas: true,
              }}
              weekends={true}
              events={calendarEvents}
              allDaySlot={false}
              slotMinTime={"06:00:00"}
              nowIndicator={true}
              slotMaxTime={"23:00:00"}
              timeZone="local"
              expandRows={true}
              eventClick={(e) => {
                const title = e.event.title;
                const start = e.event.start.toLocaleTimeString();
                const end = e.event.end.toLocaleTimeString();
                const notice = `you have ${title} from ${start} to ${end} `;
                alert(notice);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
