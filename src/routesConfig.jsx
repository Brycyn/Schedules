import { Routes, Route } from "react-router-dom";
import Wage from "./pages/Wage";
import CalendarEvents from "./pages/Calendar";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<CalendarEvents />} />
    <Route path="/wage" element={<Wage />} />
  </Routes>
);

export default AppRoutes;
