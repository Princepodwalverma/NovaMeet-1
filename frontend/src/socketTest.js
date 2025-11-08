import { io } from "socket.io-client";

// backend ka URL daal (tera backend port 8000 pe chal raha hai)
// backend ka URL daal (tera backend port 5000 pe chal raha hai)
const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000", {
  transports: ["websocket"],
});


socket.on("connect", () => {
  console.log("ðŸŸ¢ Connected to NovaMeet Socket Server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("ðŸ”´ Disconnected from NovaMeet server");
});

export default socket;
