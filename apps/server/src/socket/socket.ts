import { WebSocketServer, WebSocket } from "ws";
import { IncomingMessage, Server } from "http";
import { JWT_SECRET } from "@repo/jwt";
import jwt from "jsonwebtoken";
import {
  getRoomElements,
  upsertElement,
  softDeleteElements,
  clearRoomElements,
} from "../services/socket.service.js";

const rooms = new Map<string, Set<WebSocket>>();
const clients = new Map<WebSocket, { userId: string; roomId?: string }>();

function broadcast(roomId: string, sender: WebSocket, message: object) {
  const roomClients = rooms.get(roomId);
  if (!roomClients) return;
  const data = JSON.stringify(message);
  roomClients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

async function handleMessage(ws: WebSocket, raw: string) {
  const message = JSON.parse(raw);
  const client = clients.get(ws);
  if (!client) return;

  switch (message.type) {
    case "join_room": {
      const roomId = String(message.roomId);
      client.roomId = roomId;
      if (!rooms.has(roomId)) rooms.set(roomId, new Set());
      rooms.get(roomId)!.add(ws);

      const elements = await getRoomElements(parseInt(roomId));
      ws.send(JSON.stringify({
        type: "init_room",
        elements: elements.map((e) => JSON.parse(e.data)),
      }));
      broadcast(roomId, ws, { type: "user_joined", userId: client.userId });
      break;
    }

    case "draw": {
      const { element } = message;
      const { roomId } = client;
      if (!roomId) return;
      await upsertElement(element.id, parseInt(roomId), element.type, JSON.stringify(element), client.userId);
      broadcast(roomId, ws, { type: "draw", element, userId: client.userId });
      break;
    }

    case "erase": {
      const { elementIds } = message;
      const { roomId } = client;
      if (!roomId) return;
      await softDeleteElements(elementIds);
      broadcast(roomId, ws, { type: "erase", elementIds, userId: client.userId });
      break;
    }

    case "cursor": {
      const { x, y } = message;
      const { roomId } = client;
      if (!roomId) return;
      broadcast(roomId, ws, { type: "cursor", x, y, userId: client.userId });
      break;
    }

    case "clear": {
      const { roomId } = client;
      if (!roomId) return;
      await clearRoomElements(parseInt(roomId));
      broadcast(roomId, ws, { type: "clear", userId: client.userId });
      break;
    }
  }
}

export function initSocketServer(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket, request: IncomingMessage) => {
    const url = request.url;
    if (!url) { ws.close(); return; }

    const token = new URLSearchParams(url.split("?")[1]).get("token") || "";
    let decode: any;
    try {
      decode = jwt.verify(token, JWT_SECRET);
    } catch {
      ws.close();
      return;
    }

    if (typeof decode === "string" || !decode?.userId) { ws.close(); return; }

    clients.set(ws, { userId: decode.userId });

    ws.on("message", async (data) => {
      try { await handleMessage(ws, data.toString()); }
      catch (e) { console.error("Socket error:", e); }
    });

    ws.on("close", () => {
      const client = clients.get(ws);
      if (client?.roomId) {
        rooms.get(client.roomId)?.delete(ws);
        broadcast(client.roomId, ws, { type: "user_left", userId: client.userId });
      }
      clients.delete(ws);
    });
  });

  console.log("WebSocket server started.");
  return wss;
}
