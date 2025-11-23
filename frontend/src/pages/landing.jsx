// 🟢 ALL imports must be at top of the file only!
import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import Typed from "react-typed";  // ✔ CORRECT IMPORT
import ParticleBackground from "../components/ParticleBackground";

export default function LandingPage() {
  const router = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("nova_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("nova_user");
    localStorage.removeItem("token");
    setUser(null);
    router("/auth", { replace: true });
  };

  return (
    <div className="landingPageContainer">
      <ParticleBackground />

      {/* 🌐 Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
          background: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "900",
            background: "linear-gradient(90deg, #00bfff, #0077ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          NovaMeet
        </h1>

        <div style={{ display: "flex", gap: "30px" }}>
          {user ? (
            <>
              <p style={{ color: "#00bcd4" }}>Welcome, {user.name} 👋</p>
              <p
                style={{ cursor: "pointer", color: "#ff4d4d" }}
                onClick={handleLogout}
              >
                Logout
              </p>
            </>
          ) : (
            <>
              <p onClick={() => router("/guest")} style={{ cursor: "pointer" }}>Join as Guest</p>
              <p onClick={() => router("/auth")} style={{ cursor: "pointer" }}>Register</p>
              <div
                onClick={() => router("/auth")}
                style={{
                  background: "linear-gradient(90deg, #00bfff, #0077ff)",
                  padding: "8px 18px",
                  color: "#fff",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Login
              </div>
            </>
          )}
        </div>
      </nav>

      {/* ✔ TYPED TEXT FIXED HERE */}
      <div style={{ padding: "90px 10%", color: "white" }}>
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "800",
            marginBottom: "20px",
          }}
        >
          <Typed
            strings={[
              "Hello 👋",
              "Welcome to NovaMeet 🚀",
              "Smart Video Conferencing 📹",
              "Made for Developers 💻"
            ]}
            typeSpeed={50}
            backSpeed={30}
            loop
          />
        </h1>

        <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
          Experience a new era of connection with{" "}
          <span style={{ color: "#00bfff" }}>NovaMeet</span> — your intelligent AI-powered video conferencing platform.
        </p>
      </div>
    </div>
  );
}
