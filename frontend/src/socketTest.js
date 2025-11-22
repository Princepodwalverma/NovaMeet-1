// src/socketTest.js
import { io } from "socket.io-client";

// Backend URL - development or production
const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

// Create a socket instance
const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"], // ensure websocket transport
});

// Event listener: on connection
socket.on("connect", () => {
  console.log("Connected to socket server:", socket.id);
});

// Event listener: on disconnect
socket.on("disconnect", () => {
  console.log("Disconnected from socket server");
});

// Event listener example: custom event
socket.on("message", (data) => {
  console.log("Message received from server:", data);
});

// Export the socket instance as default
export default socket;
