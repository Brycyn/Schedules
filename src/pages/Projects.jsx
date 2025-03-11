import { NavLink } from "react-router";
import { NavBar } from "../components/NavBar";
export default function Projects() {
  const navLinks = [
    { to: "/calendar", label: "Calendar" },
    { to: "/chat", label: "Chat" },
    { to: "/bot", label: "ChatBot" },
  ];
  const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

  console.log("yy", openaiApiKey); // This will print the API key

  return (
    <div className="">
      <NavBar />
      <div
        className="grid-container"
        style={{ display: "grid", height: "100vh" }}
      >
        {navLinks.map((proj) => (
          <NavLink className="nav-link" to={proj.to}>
            <h1 className={proj.label}>{proj.label}</h1>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
