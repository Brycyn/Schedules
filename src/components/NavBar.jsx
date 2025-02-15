import { NavLink, useLocation } from "react-router";
import { TfiUser } from "react-icons/tfi";
import Modal from "react-modal";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export const UserModal = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <Modal
      isOpen={true}
      style={{
        content: {
          width: "30%", // Adjust as needed
          height: "25%", // Adjust as needed
          margin: "auto", // Center the modal
          borderRadius: "10px", // Optional: Rounded corners
          alignContent: "center",
          justifyContent: "center",
          top: 0,
          right: 0,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
          zIndex: 10001, // Ensure overlay is above FullCalendar
        },
      }}
    >
      <p>{`Hello, ${auth.username}`}</p>
      <p> logout</p>
      <TfiUser className="user" />
    </Modal>
  );
};

export default function NavBar() {
  const [openM, setOpen] = useState();
  const location = useLocation();
  return (
    <>
      {openM && <UserModal />}

      <div className="header-container">
        {console.log("loc", location.pathname)}
        <div className="nav-contents">
          {location.pathname !== "/" && (
            <NavLink
              to="/"
              className="nav-link"
              state={{
                code: localStorage.getItem("code")
                  ? localStorage.getItem("code")
                  : "",
              }}
            >
              Home
            </NavLink>
          )}

          <NavLink
            to="/calendar"
            className="nav-link"
            state={{
              code: localStorage.getItem("code")
                ? localStorage.getItem("code")
                : "",
            }}
          >
            Schedule
          </NavLink>
          <NavLink className="nav-link" to="/">
            Contacts
          </NavLink>
        </div>
        <TfiUser className="user" onClick={() => setOpen(true)} />
      </div>
    </>
  );
}
