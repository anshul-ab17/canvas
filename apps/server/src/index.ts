import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import { initSocketServer } from "./socket/socket.js";

const app = express();
const PORT = Number(process.env.PORT) || 3002;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.use("/", authRoutes);
app.use("/", roomRoutes);

const server = http.createServer(app);
initSocketServer(server);

server.listen(PORT, () => console.log(`HTTP + WebSocket server running on port ${PORT}`));
