import FullCalendar from "@fullcalendar/react";
import "../App.css";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useLocation } from "react-router-dom";
import ReactModal from "react-modal";
import { useState, useEffect, useContext } from "react";
import {
  AuthenticateWithGoogle,
  exchangeCodeForToken,
  fetchEvents,
  createEvents,
} from "../components/GoogleAuth";
import { FcGoogle } from "react-icons/fc";
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const clientId = process.env.REACT_APP_CLIENT_ID;
let logged_in = true;

export const Menu = ({ events }) => {
  const [menuStatus, setMenuStatus] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    logged_in = true;
  });

  function navigateToWage() {
    const eventString = JSON.stringify(events);

    console.log(" prev events", JSON.stringify(events));
    console.log(" 1 events", JSON.stringify(events[5]));

    console.log(" new events", eventString);

    navigation(`/wage`, { state: { evnt: events } });
  }

  function toggleMenu() {
    console.log("Client IDs: ", clientId);
    console.log("Client Secret: ", process.env.REACT_APP_CLIENT_SECRET);

    return setMenuStatus(!menuStatus);
  }

  const auth = useContext(AuthContext);
  return (
    <>
      <button
        style={{ background: "none", border: "none" }}
        onClick={toggleMenu}
      >
        <TfiMenuAlt size={20} />
      </button>
      <div style={{ display: menuStatus !== true ? "none" : "flex" }}>
        <button
          style={{ background: "none", border: "none" }}
          onClick={toggleMenu}
        >
          x
        </button>
        <ul
          style={{
            fontSize: "20px",
            listStyle: "none",
            position: "fixed", // Fixes the menu position
            top: 0,
            left: menuStatus ? "0" : "-200px", // Slide in/out logic
            height: "100%",
            width: "200px",
            backgroundColor: "#f9f9f9",
            borderRight: "2px solid black",
            transition: "left 0.5s ease", // Smooth slide transition
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)", // Optional shadow for depth
            zIndex: 1000, // Ensures it appears above other elements
          }}
        >
          <li style={{ paddingBottom: "25px" }}>
            <NavLink
              to="/"
              state={{
                code: localStorage.getItem("code")
                  ? localStorage.getItem("code")
                  : "",
              }}
            >
              Home
            </NavLink>
          </li>
          <li style={{ paddingBottom: "25px" }}>
            <NavLink
              to="/calendar"
              state={{
                code: localStorage.getItem("code")
                  ? localStorage.getItem("code")
                  : "",
              }}
            >
              Schedule
            </NavLink>
          </li>
          <li style={{ paddingBottom: "25px" }}>
            <NavLink to="/">Contacts</NavLink>
          </li>
          <li style={{ paddingBottom: "25px" }} onClick={navigateToWage}>
            Wage Calulator
          </li>
          <li>
            <button
              style={{ borderRadius: 50, overflow: "hidden" }}
              onClick={() => {
                AuthenticateWithGoogle();
              }}
            >
              {" "}
              <FcGoogle /> Login With Google
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default function CalendarEvents() {
  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [calendarEvents, setCalendarEvent] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [closeModal, setModalClosed] = useState(!modalOpen);
  const [eventSummary, setEventSummary] = useState("");
  const [username, setUsername] = useState("");
  const location = useLocation();

  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchGoogleEvents = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const navCode = location.state?.code;
      console.log(code);
      console.log("perms", urlParams);
      console.log("perms h", navCode);

      if (code) {
        localStorage.setItem("code", code);

        try {
          const token = await auth.exchangeCodeForToken(code);
          setAccessToken(token);
          const tkn = localStorage.getItem("access_token");

          const events = await fetchEvents(tkn);
          setUsername(events.summary);
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
        try {
          const token = await auth.exchangeCodeForToken(navCode);
          setAccessToken(token);
          const tkn = localStorage.getItem("access_token");

          const events = await fetchEvents(tkn);
          setUsername(events.summary);
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
    };

    fetchGoogleEvents();
  }, []);

  useEffect(() => {
    // Log calendar events when they are updated
    console.log("Updated Calendar Events:", calendarEvents);
  }, [calendarEvents]);

  const insertEvent = async (body) => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      if (!accessToken) {
        alert("Need access Code");
        return;
      } else {
        console.log("this code", code);

        const request = await createEvents(accessToken, body);

        console.log("Complete events", request);
      }
    }
  };
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  console.log("auth parameter", auth);
  console.log("initial calendar events", calendarEvents);
  return (
    <>
      <div className="App" style={{ alignItems: "center", width: "100%" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Menu events={calendarEvents} />
        </header>

        <div>
          {userInfo && (
            <>
              <h1>{userInfo.name}</h1>
              <h2>{userInfo.email}</h2>
            </>
          )}
        </div>
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
            {auth.isAuthenticated ? (
              <h2 style={{ textAlign: "center" }}>
                Hello, {username.split("@")[0]}
              </h2>
            ) : (
              " "
            )}

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
          <button
            style={{
              borderRadius: 50,
              overflow: "hidden",
              justifyContent: "center",
              marginTop: 10,
            }}
            onClick={() => setModalOpen(true)}
          >
            Add Events
          </button>
        </div>

        <ReactModal
          isOpen={modalOpen}
          contentLabel="Add Event"
          style={{
            content: {
              width: "50%", // Adjust as needed
              height: "50%", // Adjust as needed
              margin: "auto", // Center the modal
              padding: "20px", // Add padding inside the modal
              borderRadius: "10px", // Optional: Rounded corners
              transform: "scale(0.7)", // Scaling if desired
              alignContent: "center",
              justifyContent: "center",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
            },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "9px",
              flexDirection: "row",
            }}
          >
            <header>
              Add Event{" "}
              <button
                title="close modal"
                onClick={() => {
                  console.log("hello");
                  return setModalOpen(false);
                }}
                style={{ justifyContent: "flex-end" }}
              >
                X
              </button>
            </header>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p>
              <strong>Date:</strong>
            </p>
            <input
              type="date"
              title="Select Date"
              onChange={(e) => {
                setStartDate(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p>
              <strong>Event Name:</strong>
            </p>{" "}
            <input
              onChange={(e) => {
                setEventName(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
          </div>

          <div
            style={{
              paddingTop: 10,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <button
              title="close modal"
              onClick={() =>
                insertEvent({
                  summary: eventName,
                  start: { date: startDate },
                  end: { date: startDate },
                })
              }
              style={{ justifyContent: "center" }}
            >
              Create Event
            </button>
          </div>
        </ReactModal>
      </div>
    </>
  );
}
