import React, { useState } from "react";
import ReactModal from "react-modal";
import { createEvents } from "./GoogleAuth";

const insertEvent = async (body) => {
  const accessToken = localStorage.getItem("access_token");

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
        <header
          style={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <h1> Add Event </h1>
          <button
            title="close modal"
            onClick={() => {
              console.log("hello");
              closeModal();
            }}
            style={{
              justifyContent: "flex-end",
              overflow: "hidden",
              borderRadius: 60,
              height: "50%",
            }}
          >
            X
          </button>
        </header>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p>
            <strong>Date: </strong>
          </p>
          <input
            type="datetime-local"
            title="Select Start Date"
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setStartDate(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
          <br />
        </div>
        <input
          type="datetime-local"
          title="Select End Date"
          onChange={(e) => {
            setStartDate(e.target.value);
            console.log(e.target.value);
          }}
        ></input>
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
            onClick={() => {
              insertEvent({
                summary: eventName,
                start: { date: startDate },
                end: { date: startDate },
              });

              closeModal();
            }}
            style={{
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: 50,
            }}
          >
            Create Event
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
