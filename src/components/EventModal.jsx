import React, { useState } from "react";
import ReactModal from "react-modal";
import { createEvents } from "./GoogleAuth";
import { TfiCalendar } from "react-icons/tfi";
const insertEvent = async (body) => {
  const accessToken = localStorage.getItem("access_token");
  console.log(" bought-e", body);
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

export default function EventModal({ closeModal }) {
  const [isOpen, setModalOpen] = useState(true);
  const [startDate, setStartDate] = useState({});

  const [eventName, setEventName] = useState({});

  const [endDate, setEndDate] = useState({});

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Add Event"
      style={{
        content: {
          width: "25%", // Adjust as needed
          height: "50%", // Adjust as needed
          margin: "auto", // Center the modal
          borderRadius: "10px", // Optional: Rounded corners
          alignContent: "center",
          justifyContent: "center",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
          zIndex: 10001, // Ensure overlay is above FullCalendar
        },
      }}
    >
      <div className="modal-content">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{}}> Add Event </h1>
          <button
            title="close modal"
            onClick={() => {
              closeModal();
            }}
            style={{
              justifyContent: "flex-end",
              overflow: "hidden",
              borderRadius: 60,
              marginLeft: "auto",
              height: "50%",
              backgroundColor: "white",
              border: "none",
            }}
          >
            X
          </button>
        </div>

        <div
          className="mEvent-name"
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>
            <strong>Event Name:</strong>
          </p>{" "}
          <input
            style={{
              border: "none",
              padding: 3,
              marginLeft: 5,
              borderBottom: "solid black",
              height: "10px",
            }}
            onChange={(e) => {
              setEventName(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <strong> Start: </strong>

          <input
            type="datetime-local"
            title="Select Start Date"
            className="dateSelect"
            style={{
              border: "none",
              justifyContent: "flex-end",
              display: "flex",
            }}
            onChange={(e) => {
              setStartDate(e.target.value + ":00");
              console.log(e.target.value);
            }}
          ></input>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <strong> End: </strong>
          <input
            type="datetime-local"
            title="Select End Date"
            className="dateSelect"
            style={{ border: "none" }}
            onChange={(e) => {
              setEndDate(e.target.value + ":00");
              console.log(e.target.value);
            }}
          ></input>
        </div>
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
          title="insert event"
          onClick={() => {
            console.log({
              summary: eventName,
              start: { dateTime: startDate, timeZone: "America/Los_Angeles" },
              end: { dateTime: endDate, timeZone: "America/Los_Angeles" },
            });
            insertEvent({
              summary: eventName,
              start: { dateTime: startDate, timeZone: "America/Los_Angeles" },
              end: { dateTime: endDate, timeZone: "America/Los_Angeles" },
            });

            closeModal();
          }}
          style={{
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: 50,
            backgroundColor: "maroon",
            position: "absolute",
            bottom: 5,
            right: 5,
          }}
        >
          <p style={{ color: "white" }}> Create Event</p>
        </button>
      </div>
    </ReactModal>
  );
}
