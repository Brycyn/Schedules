import React from "react";
import { Menu } from "./Calendar";

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
        }}
        class="banner-text"
      >
        <p>Welcome</p>
      </div>
    </div>
  );
};
export default function Home() {
  return (
    <>
      <Banner />
      <p>Home</p>
    </>
  );
}
