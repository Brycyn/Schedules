import './App.css'
import React from 'react';
import socketIO from 'socket.io-client'
import AppRoutes from './routesConfig';
import { AuthProvider } from './context/AuthContext';

const socket = socketIO.connect('http://localhost:4000')


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