import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param {*} events
 * @returns calculations for amount of hours worked
 */

function WageCalc(events) {
  let startTime = events.start?.split("T")[1];
  let endTime = events.end?.split("T")[1];
  var [startHour, startMin] = startTime?.split(":").map(Number);
  var [endHour, endtMin] = endTime?.split(":").map(Number);
  var strtInMin = startHour * 60 + startMin;
  var endInMin = endHour * 60 + endtMin;
  if (endInMin < strtInMin) {
    endInMin += 24 * 60;
  }
  let totalMinutesWorked = Math.abs(strtInMin - endInMin);
  let totalHoursWorked = Math.floor(totalMinutesWorked / 60);
  const workedMinutes = totalMinutesWorked % 60;
  const wageResult = { hours: totalHoursWorked, minutes: workedMinutes };
  return wageResult;
}

/**
 *
 * @returns wage page
 */
export default function Wage() {
  const navigation = useNavigate();

  const location = useLocation();

  const eventsParam = location.state.evnt;

  console.log("param", eventsParam);

  var [totalHours, setTotalHours] = useState(0);
  var [totalMinutes, setTotalMin] = useState(0);

  function handleWageCalculation() {
    let totalMinutesWorked = 0;
    eventsParam.forEach((shift) => {
      const { hours, minutes } = WageCalc(shift);

      totalMinutesWorked += hours * 60 + minutes;

      setTotalHours(totalMinutesWorked / 60);
      setTotalMin(totalMinutesWorked % 60);
    });
  }
  return (
    <>
      <button onClick={() => navigation(-1)}>back</button>
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

      <button onClick={handleWageCalculation}> calculate</button>

      <h4>
        {totalHours} Hours and {totalMinutes} minutes
      </h4>
      <h5>wage: {totalHours * 23}</h5>
    </>
  );
}
