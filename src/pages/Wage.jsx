import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthProvider } from "../context/AuthContext";

/**
 *
 * @param {*} events
 * @returns calculations for amount of hours worked
 */

/**
 *
 * @returns wage page
 */

export default function Wage() {
  const navigation = useNavigate();
  const location = useLocation();
  const today = new Date();
  const eventsParam = location.state.evnt;

  const auth = useContext(AuthContext);
  useEffect(() => {
    const loggedinUser = localStorage.getItem("user");

    console.log("username", auth);
  }, []);
  console.log("param", eventsParam);

  //calc
  function calculateExpectedWage(events) {
    // for Each event being calculated
    var weeklyhours = 0;
    var weeklyMin = 0;
    const evnt = events.filter((ev) => ev.end >= today);

    evnt?.forEach((e) => {
      console.log("filtered_events", evnt);
      var startHours = 0;
      var endHours = 0;

      let totalShiftHours = 0;
      let totalShiftMin = 0;

      // grab start timne and time of day
      const startTime = e.start.toLocaleTimeString().split(" ");
      // grab end timne and time of day
      const endTimme = e.end.toLocaleTimeString().split(" ");
      //split start time into minutes and hours
      const [sHours, sMin] = startTime[0].split(":");
      //split end time into  minutes and hours
      const [sEnd, eMin] = endTimme[0].split(":");
      // convert the start of shift to int
      startHours += parseInt(sHours, 10);
      // convert the end of shift to int

      endHours += parseInt(sEnd, 10);
      // get total hours worked from start to end of shift

      totalShiftHours = Math.abs(endHours - startHours);

      weeklyhours += totalShiftHours;
      totalShiftMin = Math.abs(eMin - sMin);
      weeklyMin += totalShiftMin;

      console.log(
        e.title,
        "hours worked",
        totalShiftHours,
        "min worked",
        totalShiftMin,
        "from",
        startTime,
        "to",
        endTimme
      );
    });

    if (weeklyMin >= 60) {
      let hoursToAdd = weeklyMin / 60;
      weeklyMin = 0;
      weeklyhours += hoursToAdd;
    }
    console.log("totla hours worked", weeklyhours);

    return weeklyhours;
  }

  return (
    <>
      <button
        onClick={async () => {
          navigation(-1);
          await auth.refreshAccessToken();
        }}
      >
        back
      </button>
      <div
        className="detail-container"
        style={{
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
          // overflowX: "auto", // "auto" instead of "scroll" to show only when needed
          height: "100%",
          width: "100%",

          overflow: "scroll",
        }}
      >
        {eventsParam.map((event, index) => {
          if (event.end >= today)
            return (
              <div
                className="shifts"
                style={{
                  border: "1px solid black",
                  height: 180,
                  minWidth: 100,
                  maxWidth: 100,
                  borderRadius: 10,
                  overflow: "hidden",
                  alignSelf: "center", // Center content vertically
                  margin: 5,
                  position: "relative", // Make this relative to position the checkbox
                  justifyContent: "center",
                }}
                key={index}
              >
                <input
                  style={{
                    position: "relative",
                    top: 10, // Adjust the top positioning
                    left: 10, // Adjust the right positioning
                    paddingBottom: 3,
                  }}
                  type="checkbox"
                  onClick={() => {
                    console.log(event.title);
                  }}
                />
                <div
                  className="details"
                  style={{
                    flexDirection: "column", // Stack children vertically
                    justifyContent: "center", // Center content horizontally
                    height: "100vh", // Ensure it takes full height of the parent
                    textAlign: "center", // Center-align text
                    fontSize: 12,
                    borderWidth: 1,
                    borderColor: "black",
                    width: "100%",
                  }}
                >
                  <p>{event.title}</p>
                  <p>start: {event.start.toLocaleTimeString()}</p>
                  <p>end: {event.end.toLocaleTimeString()}</p>
                </div>
              </div>
            );
        })}
      </div>

      <h3 style={{ textAlign: "center" }}>
        Scheduled hours this week: {calculateExpectedWage(eventsParam)}
      </h3>
    </>
  );
}
