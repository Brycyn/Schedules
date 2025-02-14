import { NavLink, useLocation } from "react-router";
import { TfiUser } from "react-icons/tfi";
export default function NavBar() {
  const location = useLocation();
  return (
    <>
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
        <TfiUser className="user" />
      </div>
    </>
  );
}
