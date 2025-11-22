// src/polyfill.js
// Safe Buffer/global polyfills for browser
try {
  // buffer package available at build time via dependency
  const { Buffer } = require("buffer");
  if (typeof window !== "undefined" && !window.Buffer) {
    window.Buffer = Buffer;
  }
} catch (e) {
  // ignore in browser runtime if require not present
}
if (typeof global === "undefined" && typeof window !== "undefined") {
  window.global = window;
}
if (!window.process) {
  window.process = { env: { NODE_ENV: "production" } };
}
