import { io } from "socket.io-client";

// backend ka URL (port 5000)
const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Connected to NovaMeet Socket Server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("🔴 Disconnected from NovaMeet server");
});

export default socket;
