// Safe process polyfill (SimplePeer fix)
if (typeof window.process === "undefined") {
  window.process = {
    env: { NODE_ENV: "development" },
    nextTick: (cb) => setTimeout(cb, 0),
  };
}
