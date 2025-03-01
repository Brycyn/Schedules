import React, { useContext } from "react";
import { Menu } from "./Calendar";
import FourOhFour from "../images/FourOhFour.png";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import { useLocation } from "react-router";
import { NavBar } from "../components/NavBar";
import WordSphere from "../components/WordSphere";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

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

function navigateToSite(link) {
  return window.open(link, "_blank");
}

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
          backgroundColor: "black",
        }}
      >
        <Banner />
        <div>
          <div
            className="home-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              top: 0,
              flexDirection: "row",
              width: "100%",
            }}
          >
            <div className="home-header">
              <h4>
                Hello, I am <br />
                <h1>Brycyn Gossett</h1>
              </h4>
              <h1>Software Developer</h1>
              <h1 className="link-icon">
                <FaLinkedin
                  className="link-icon"
                  onClick={() =>
                    navigateToSite(
                      `https://www.linkedin.com/in/brycyn-gossett-241a6126b/`
                    )
                  }
                />
                <FaGithub
                  className="link-icon"
                  onClick={() => navigateToSite(`https://github.com/Brycyn`)}
                />
                <TfiEmail className="link-icon" />
              </h1>
            </div>
            <div className="word-sphere">
              <WordSphere />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
