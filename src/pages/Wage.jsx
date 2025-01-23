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
    <div
      style={{
        alignSelf: "center",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
      }}
    >
      <button onClick={handleWageCalculation}> calculate</button>
      {parsedEvents.map((event, index) => {
        return (
          <>
            <div
              style={{
                textAlign: "center",
                border: "1px solid black",
                alignSelf: "center",
                width: 200,
                height: 200,
              }}
              key={index}
            >
              <h3> {event.title}</h3>
              <p>{event.start.split("T")[1]}</p>
              <p>{event.end.split("T")[1]}</p>
            </div>
          </>
        );
      })}
      <h4>
        {totalHours} Hours and {totalMinutes} minutes
      </h4>
      <h5>wage: {totalHours * 23}</h5>
    </div>
  );
}
