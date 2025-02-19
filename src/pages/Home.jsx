import React, { useContext } from "react";
import { Menu } from "./Calendar";
import FourOhFour from "../images/FourOhFour.png";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import { useLocation } from "react-router";
import { NavBar } from "../components/NavBar";

export const Banner = () => {
  return <NavBar />;
};

export const CenteredImage = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center", // Centers both horizontally and vertically
      }}
    >
      <img
        src={FourOhFour}
        alt="under construction"
        style={{ maxWidth: "100%", maxHeight: "100%" }} // Optional scaling
      />
    </div>
  );
};

export default function Home() {
  const location = useLocation();

  const eventsParam = location.state;
  const auth = useContext(AuthContext);
  console.log(auth.isAuthenticated);
  console.log("ppm", eventsParam);

  return (
    <>
      <div
        style={{
          backgroundColor: "#b68e70",
        }}
      >
        <Banner />
        <p style={{ textAlign: "center" }}>Home</p>

        <CenteredImage />
      </div>
    </>
  );
}
