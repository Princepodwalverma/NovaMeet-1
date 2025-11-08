// src/pages/guest.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./guest.css"; // optional styling

function Guest() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!roomId) {
      alert("Please enter a meeting ID");
      return;
    }
    // Save name to localStorage (optional)
    localStorage.setItem("guestName", name || "Guest");
    navigate(`/meet/${roomId}`);
  };

  return (
    <div className="guest-container">
      <h1>Join as Guest</h1>
      <form className="guest-form" onSubmit={handleJoin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Meeting ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button type="submit">Join Meeting</button>
      </form>
    </div>
  );
}

export default Guest;
