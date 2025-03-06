import { NavBar } from "../components/NavBar";

import HeadShot from "../images/Headshots41.jpg";

export default function AboutMe() {
  return (
    <>
      <NavBar />
      <div className="header-container">
        <div
          className="about-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100vh",
            width: "100%",
          }}
        >
          <img
            src={HeadShot}
            alt="Headshot"
            style={{ height: "350px", width: "350px", borderRadius: 360 }}
          />

          <h3
            style={{
              color: "white",

              width: "800px",
              overflow: "scroll",
            }}
          >
            I'm Brycyn Gossett, a software developer with a passion for building
            efficient, user-friendly applications. With expertise in Salesforce
            development, Lightning Web Components (LWC), and React Native, I
            focus on creating scalable solutions that improve workflows and
            enhance user experiences. I studied Business & Economics at Santa
            Barbar City College and Computer Science at Westmont College. There,
            I developed a strong foundation in software development, database
            management, and UI/UX design. My academic and professional
            experiences have allowed me to work on projects that integrate
            Salesforce as a core database, leveraging wrapper classes, dynamic
            data tables, and custom Lightning components to optimize data
            processing. On the mobile side, I build interactive apps with React
            Native and Expo Router, focusing on seamless navigation, calendar
            integration, and user account management. Beyond coding, I’m a
            former athlete who still enjoys staying active, working out, and
            pushing myself physically. When I’m not developing software, you can
            find me exploring new tech, refining my skills, or diving into a
            good challenge—whether it’s in the gym or a complex coding problem.
            I’m always looking for innovative ways to solve problems through
            technology, whether it’s refining complex systems, building
            interactive mobile solutions, or developing efficient workflows for
            businesses and organizations.
          </h3>
        </div>
      </div>
    </>
  );
}
