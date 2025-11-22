import { Buffer } from "buffer";

if (typeof global === "undefined") {
  window.global = window;
}

if (!window.Buffer) {
  window.Buffer = Buffer;
}

if (!window.process) {
  window.process = { env: { NODE_ENV: "development" } };
}
