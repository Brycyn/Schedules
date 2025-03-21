import Wage from "./pages/Wage";
import CalendarEvents from "./pages/Calendar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import AboutMe from './pages/Info'
import Projects from "./pages/Projects";
import Bot from "./components/ChatBot.mjs";
import { Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";

const socket = socketIO.connect('http://localhost:4000/')

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home socket={socket} />} />
    <Route path="/wage" element={<Wage socket={socket} />} />
    <Route path="/calendar" element={<CalendarEvents socket={socket} />} />
    <Route path="/chat" element={<Chat socket={socket} />} />
    <Route path="/Info" element={<AboutMe socket={socket} />} />
    <Route path="/projects" element={<Projects socket={socket} />} />
    <Route path="/bot" element={<Bot socket={socket} />} />



  </Routes>
);

export default AppRoutes;
