// backend/src/app.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);





// --- MIDDLEWARES ---
app.use(cors());                // allow cross origin requests
app.use(express.json());        // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // handle form posts

// health check
app.get("/", (req, res) => res.json({ ok: true, time: new Date() }));

// mount routes
app.use("/api/v1/users", userRoutes);

// set port from env or fallback
app.set("port", process.env.PORT || 5000);

// connect to Mongo and start
const startServer = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MONGO Connected to: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`🚀 Server running on PORT ${app.get("port")}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();
