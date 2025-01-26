import FullCalendar from "@fullcalendar/react";
import "../App.css";
import timeGridPlugin from "@fullcalendar/timegrid";
import ReactModal from "react-modal";
import { useState, useEffect } from "react";
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

import Wage from "./Wage";

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scope = process.env.REACT_APP_SCOPE;
const responseType = process.env.REACT_APP_RESPONSE_TYPE;
const apiKey = process.env.REACT_APP_API_KEY;

export const Menu = ({ events }) => {
  const [menuStatus, setMenuStatus] = useState(false);
  const navigation = useNavigate();

  function navigateToWage() {
    const eventString = encodeURIComponent(JSON.stringify(events));

    console.log(" prev events", JSON.stringify(events));
    console.log(" 1 events", JSON.stringify(events[5]));

    console.log(" new events", eventString);

    navigation(`/wage?events=${eventString}`);
  }
  function toggleMenu() {
    console.log("Client IDs: ", clientId);
    console.log("Client Secret: ", process.env.REACT_APP_CLIENT_SECRET);

    return setMenuStatus(!menuStatus);
  }
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li style={{ paddingBottom: "25px" }}>
            <NavLink to="/calendar">Schedule</NavLink>
          </li>
          <li style={{ paddingBottom: "25px" }}>
            <NavLink to="/">Contacts</NavLink>
          </li>
          <li style={{ paddingBottom: "25px" }} onClick={navigateToWage}>
            Wage Calulator
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
  useEffect(() => {
    const fetchGoogleEvents = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      console.log(code);
      console.log(urlParams);

      if (code) {
        try {
          const token = await exchangeCodeForToken(code);
          setAccessToken(token);
          const events = await fetchEvents(token);
          const newCalendarEvents = events?.map((item) => {
            var startDate = new Date(item.start.dateTime).toLocaleString();
            var endDate = new Date(item.end.dateTime).toLocaleString();

            const [dateStart, timeStart] = startDate.split(",");
            const [dateEnd, timeEnd] = endDate.split(",");
            const [sMonth, sDay, sYear] = dateStart.split("/");
            const [eMonth, eDay, eYear] = dateEnd.split("/");

            // const parseTime = (time) => {
            //   const [timePart, modifier] = time.trim().split(" ");
            //   let [hours, minutes] = timePart.split(":");
            //   [hours, minutes] = [hours, minutes].map(Number);
            //   console.log(hours, minutes);

            //   if (modifier === "PM" && hours < 12) hours += 12;
            //   if (modifier === "AM" && hours === 12) hours = 0;

            //   console.log(hours, minutes);

            //   return [hours, minutes];
            // };

            // const [sHour, sMin] = parseTime(timeStart);
            // const [eHour, eMin] = parseTime(timeEnd);
            //test
            return {
              title: item.summary,
              start: item.start.dateTime
                ? new Date(sYear, sMonth - 1, sDay)
                : new Date(item.start.date).toLocaleString(),
              end: item.end.dateTime
                ? new Date(eYear, eMonth - 1, eDay)
                : new Date(item.end.date).toLocaleString(),
            };
          });

          setCalendarEvent(newCalendarEvents);
          console.log(calendarEvents);
          console.log(typeof events[5].start?.dateTime, "helper");
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

  console.log("initial calendar events", calendarEvents);
  return (
    <>
      <div className="App" style={{}}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Menu events={calendarEvents} />
          <button
            style={{ borderRadius: 50, overflow: "hidden" }}
            onClick={() => setModalOpen(true)}
          >
            Add Events
          </button>

          <button
            style={{ borderRadius: 50, overflow: "hidden" }}
            onClick={AuthenticateWithGoogle}
          >
            {" "}
            <FcGoogle /> Login With Google
          </button>
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
            height: 100,
            width: "100%",
            transform: "scale( 0.8)",
            borderWidth: 1,
            borderColor: "black",
          }}
        >
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "timeGridWeek,timeGridDay",
            }}
            timeZone="America/Los_Angeles"
            weekends={false}
            events={calendarEvents}
            allDaySlot={false}
            style={{ borderWidth: 1, borderColor: "black" }}
          />
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
                onClick={() => setModalOpen(false)}
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

          <div style={{ paddingTop: 10 }}>
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
