// src/setupPolyfills.js
// Safe process polyfill for browser (no imports)
if (typeof window.process === "undefined") {
  window.process = {
    env: { NODE_ENV: "production" },
    nextTick: (cb) => setTimeout(cb, 0),
  };
}
