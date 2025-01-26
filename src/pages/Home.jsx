import React from "react";
import { Menu } from "./Calendar";
import FourOhFour from "../images/FourOhFour.png";

export const Banner = () => {
  return (
    <div
      class="banner"
      style={{
        border: "1px solid black",
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", // Vertically center items in the banner
      }}
    >
      <Menu />
      <div
        style={{
          flex: 1, // Takes up remaining space
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginRight: 34,
        }}
        class="banner-text"
      >
        <p>Welcome</p>
      </div>
    </div>
  );
};

export const CenteredImage = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center", // Centers both horizontally and vertically
        height: 400, // Full height viewport
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
  return (
    <>
      <Banner />
      <p style={{ textAlign: "center" }}>Home</p>
      <div>
        <CenteredImage />
      </div>
    </>
  );
}
