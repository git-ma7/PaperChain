import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ZoomScaler from './components/ZoomScaler';
import Navbar from "./components/Navbar";

// Wrapper to use useLocation inside Router
function AppWrapper() {

  return (
    <div className="relative">
      <ZoomScaler />
      <Navbar/>
      <div className="fixed h-screen inset-0 -z-10 flex items-center justify-center">
        <div className='absolute md:block -z-20 top-2/4 md:top-1/3 left-1/3 md:left-1/4 w-[150px] h-[150px] md:w-[300px] md:h-[300px] blur-xl rounded-full md:blur-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 animate-blob-1 opacity-40 '></div>
        <div className='absolute md:block -z-20 top-2/5 md:top-[500px] left-[130px] md:left-[1100px] w-[120px] h-[120px] md:w-[300px] md:h-[300px] blur-xl rounded-full md:blur-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 opacity-40 animate-blob-2'></div>
        <div className='absolute md:block -z-20 top-1/3 md:top-[540px] left-[190px] md:left-[750px] w-[90px] h-[90px] md:w-[200px] md:h-[200px] blur-xl rounded-full md:blur-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 animate-blob-3 opacity-40'></div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

