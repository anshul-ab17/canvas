import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import { initSocketServer } from "./socket/socket.js";

const app = express();
const HTTP_PORT = Number(process.env.PORT) || 3002;
const WS_PORT = Number(process.env.WS_PORT) || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.use("/", authRoutes);
app.use("/", roomRoutes);

app.listen(HTTP_PORT, () => console.log(`HTTP server running on port ${HTTP_PORT}`));
initSocketServer(WS_PORT);
