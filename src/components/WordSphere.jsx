import { useEffect, useRef } from "react";

export default function WordSphere() {
  const canvas = useRef(null);
  useEffect(() => {
    if (window.TagCanvas) {
      try {
        window.TagCanvas.Start("tagCanvas", "tags", {
          textColour: "green",
          outlineColour: "#f00",
          reverse: true,
          depth: 0.8,
          maxSpeed: 0.05,
          noSelect: true,
          wheelZoom: false,
        });
      } catch (error) {
        console.error("TagCanvas failed to load", error);
      }
    }
  }, []);

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <div id="myCanvasContainer">
        <canvas width={500} height={500} id="tagCanvas" ref={canvas} />
      </div>
      <div id="tags">
        <ul>
          <li>
            <a href="#">React</a>
          </li>
          <li>
            <a href="#">JavaScript</a>
          </li>
          <li>
            <a href="#">TypeScript</a>
          </li>
          <li>
            <a href="#">CSS</a>
          </li>
          <li>
            <a href="#">HTML</a>
          </li>
          <li>
            <a href="#">Frontend</a>
          </li>
          <li>
            <a href="#">Programming</a>
          </li>
          <li>
            <a href="#">Web Dev</a>
          </li>
          <li>
            <a href="#">Salesforce</a>
          </li>
          <li>
            <a href="#">React Native</a>
          </li>
          <li>
            <a href="#">Java</a>
          </li>
          <li>
            <a href="#">Python</a>
          </li>
          <li>
            <a href="#">Apex</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
