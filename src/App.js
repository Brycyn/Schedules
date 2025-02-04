import { Router, Routes, Route } from 'react-router';
import './App.css'
import Wage from './pages/Wage';
import CalendarEvents from './pages/Calendar';
import AppRoutes from './routesConfig';
import { AuthProvider } from './context/AuthContext';



function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

    </>

  );
}

export default App;