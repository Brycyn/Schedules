import { NavLink, useLocation } from "react-router";
import { TfiUser } from "react-icons/tfi";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
export default function NavBar() {
  const location = useLocation();
  const auth = useContext(AuthContext);
  return (
    <>
      <div className="header-container">
        {console.log("loc", auth.username)}
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
        <TfiUser
          className="user"
          onClick={() => {
            alert(auth.username ? `hello ${auth.username}` : "login");
          }}
        />
      </div>
    </>
  );
}
