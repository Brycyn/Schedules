import './App.css'
import React from 'react';

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