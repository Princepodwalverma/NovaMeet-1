// src/environment.js
export const IS_PROD = process.env.NODE_ENV === "production";
const server = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default server;
