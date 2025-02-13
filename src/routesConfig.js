import Wage from "./pages/Wage";
import CalendarEvents from "./pages/Calendar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/wage" element={<Wage />} />
    <Route path="/calendar" element={<CalendarEvents />} />
  </Routes>
);

export default AppRoutes;
