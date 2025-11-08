// src/App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import VideoMeetComponent from "./pages/VideoMeet";
import HomeComponent from "./pages/home";
import History from "./pages/history";
import Guest from "./pages/guest"; // ✅ added import

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/history" element={<History />} />
        <Route path="/meet/:roomId" element={<VideoMeetComponent />} />
        <Route path="/guest" element={<Guest />} /> {/* ✅ new route */}
      </Routes>
    </div>
  );
}

export default App;
