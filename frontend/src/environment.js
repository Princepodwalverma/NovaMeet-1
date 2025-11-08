let IS_PROD = true;
// src/environment.js
// Use your local backend while developing
const server = process.env.REACT_APP_API_URL || "http://localhost:5000";
export default server;
