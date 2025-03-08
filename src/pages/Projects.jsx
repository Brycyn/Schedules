import { NavLink } from "react-router";
import { NavBar } from "../components/NavBar";
export default function Projects() {
  const navLinks = [
    { to: "/calendar", label: "Calendar" },
    { to: "/chat", label: "Chat" },
  ];
  return (
    <div className="">
      <NavBar />
      <div
        className="grid-container header-container"
        style={{ display: "grid", height: "100vh" }}
      >
        {navLinks.map((proj) => (
          <NavLink className="nav-link" to={proj.to}>
            <h1 className="tile">{proj.label}</h1>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
