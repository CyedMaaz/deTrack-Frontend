import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/index';

const App = () => {
  useEffect(()=>{
    fetch('https://de-track-9hkuumg4t-shahirs-projects.vercel.app/', {
      method: 'GET',
      

    }).then((response) => response.json()).catch(e=>{
      console.log("🚀 ~ handleSubmit ~ e:", e)

    })

    
  })
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
