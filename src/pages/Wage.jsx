import { useState } from "react";
import { useLocation } from "react-router-dom";

function WageCalc(events) {
  let startTime = events.start?.split("T")[1];
  let endTime = events.end?.split("T")[1];
  var [startHour, startMin] = startTime?.split(":").map(Number);
  var [endHour, endtMin] = endTime?.split(":").map(Number);

  console.log(startHour, "hour", startMin);
  console.log(endHour, "min", endtMin);

  var strtInMin = startHour * 60 + startMin;
  var endInMin = endHour * 60 + endtMin;

  if (endInMin < strtInMin) {
    endInMin += 24 * 60;
  }
  let totalMinutesWorked = Math.abs(strtInMin - endInMin);

  console.log("tmw", totalMinutesWorked);

  let totalHoursWorked = Math.floor(totalMinutesWorked / 60);
  const workedMinutes = totalMinutesWorked % 60;

  const wageResult = { hours: totalHoursWorked, minutes: workedMinutes };

  return wageResult;
}
export default function Wage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const parameters = searchParams.get("events");
  const parsedEvents = JSON.parse(decodeURIComponent(parameters));
  console.log("parameters", parsedEvents);
  var [totalHours, setTotalHours] = useState(0);
  var [totalMinutes, setTotalMin] = useState(0);

  function handleWageCalculation() {
    let totalMinutesWorked = 0;
    parsedEvents.forEach((shift) => {
      const { hours, minutes } = WageCalc(shift);

      totalMinutesWorked += hours * 60 + minutes;

      setTotalHours(totalMinutesWorked / 60);
      setTotalMin(totalMinutesWorked % 60);
    });
  }
  return (
    <>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          overflowX: "scroll", // "auto" instead of "scroll" to show only when needed
          height: "100%",
        }}
      >
        {parsedEvents.map((event, index) => {
          return (
            <div
              style={{
                border: "1px solid black",
                width: "100%",
                height: " 100%",
                borderRadius: 40,
                overflow: "hidden",
                margin: 5,
                padding: 50,
                position: "relative", // Make this relative to position the checkbox
                justifyContent: "center",
              }}
              key={index}
            >
              <input
                style={{
                  position: "absolute",
                  top: 10, // Adjust the top positioning
                  left: 10, // Adjust the right positioning
                }}
                type="checkbox"
                onClick={() => {
                  console.log(event.title);
                }}
              />
              <div
                class="details"
                style={{
                  display: "flex", // Flexbox layout
                  flexDirection: "column", // Stack children vertically
                  justifyContent: "center", // Center content horizontally
                  alignItems: "center", // Center content vertically
                  height: 50, // Ensure it takes full height of the parent
                  textAlign: "center", // Center-align text
                  fontSize: 12,
                  borderWidth: 1,
                  borderColor: "black",
                }}
              >
                <h4>{event.title}</h4>
                <p>{event.start.split("T")[1]}</p>
                <p>{event.end.split("T")[1]}</p>
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
