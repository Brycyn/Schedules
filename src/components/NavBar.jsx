import { NavLink, useLocation } from "react-router";
import { TfiUser } from "react-icons/tfi";
import Modal from "react-modal";
import { useContext, useState, useRef } from "react";
import AuthContext from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { AuthenticateWithGoogle, fetchEvents } from "../components/GoogleAuth";

export const UserModal = ({ isOpen, position, onClose }) => {
  const auth = useContext(AuthContext);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: "200px", // Adjust width as needed
          height: "100px", // Adjust height as needed
          position: "absolute",
          top: position.top + position.height + 5,
          left: position.left,
          borderRadius: "10px",
          padding: "10px",
        },
        overlay: {
          backgroundColor: "none",
          zIndex: 10001,
        },
      }}
    >
      <p>{`Hello, ${auth.username}`}</p>
      <p style={{ cursor: "pointer" }} onClick={onClose}>
        Logout
      </p>
      <button
        style={{ borderRadius: 50, overflow: "hidden" }}
        onClick={() => {
          AuthenticateWithGoogle();
        }}
      >
        {" "}
        <FcGoogle /> Login With Google
      </button>
    </Modal>
  );
};

export const NavBar = ({ events }) => {
  const [openM, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0, height: 0 });
  const userIconRef = useRef(null);
  const location = useLocation();

  const handleOpen = () => {
    if (userIconRef.current) {
      const rect = userIconRef.current.getBoundingClientRect();
      setPosition({ top: 30, right: 0, height: rect.height });
    }
    setOpen(true);
  };

  return (
    <>
      {openM && (
        <UserModal
          isOpen={openM}
          position={position}
          onClose={() => setOpen(false)}
        />
      )}

      <div className="header-container">
        <div className="nav-contents">
          {location.pathname !== "/" && (
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          )}
          {!location.pathname.includes("calendar") && (
            <NavLink to="/calendar" className="nav-link">
              Schedule
            </NavLink>
          )}
          <NavLink className="nav-link" to="/">
            Contacts
          </NavLink>
          {location.pathname.includes("calendar") && (
            <NavLink to="/wage" className="nav-link" state={{ evnt: events }}>
              Finance
            </NavLink>
          )}
        </div>

        {/* User Icon */}
        <TfiUser className="user" ref={userIconRef} onClick={handleOpen} />
      </div>
    </>
  );
};
