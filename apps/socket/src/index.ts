import "dotenv/config";
import { WebSocketServer, WebSocket } from "ws";
import { JWT_SECRET } from "@repo/jwt";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db/client";

const PORT = Number(process.env.PORT) || 3001;
const wss = new WebSocketServer({ port: PORT });

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

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) { ws.close(); return; }

  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token") || "";

  let decode: any;
  try {
    decode = jwt.verify(token, JWT_SECRET);
  } catch {
    ws.close();
    return;
  }

  if (typeof decode === "string" || !decode?.userId) {
    ws.close();
    return;
  }

  const userId: string = decode.userId;
  clients.set(ws, { userId });

  ws.on("message", async (data) => {
    try {
      const message = JSON.parse(data.toString());
      const client = clients.get(ws);
      if (!client) return;

      switch (message.type) {
        case "join_room": {
          const roomId: string = String(message.roomId);
          client.roomId = roomId;
          if (!rooms.has(roomId)) rooms.set(roomId, new Set());
          rooms.get(roomId)!.add(ws);

          const elements = await prisma.element.findMany({
            where: { roomId: parseInt(roomId), isDeleted: false },
          });
          ws.send(JSON.stringify({
            type: "init_room",
            elements: elements.map((e) => JSON.parse(e.data)),
          }));

          broadcast(roomId, ws, { type: "user_joined", userId });
          break;
        }

        case "draw": {
          const { element } = message;
          const { roomId } = client;
          if (!roomId) return;

          await prisma.element.upsert({
            where: { id: element.id },
            create: {
              id: element.id,
              roomId: parseInt(roomId),
              type: element.type,
              data: JSON.stringify(element),
              userId,
            },
            update: { data: JSON.stringify(element) },
          });

          broadcast(roomId, ws, { type: "draw", element, userId });
          break;
        }

        case "erase": {
          const { elementIds } = message;
          const { roomId } = client;
          if (!roomId) return;
          await prisma.element.updateMany({
            where: { id: { in: elementIds } },
            data: { isDeleted: true },
          });
          broadcast(roomId, ws, { type: "erase", elementIds, userId });
          break;
        }

        case "cursor": {
          const { x, y } = message;
          const { roomId } = client;
          if (!roomId) return;
          broadcast(roomId, ws, { type: "cursor", x, y, userId });
          break;
        }

        case "clear": {
          const { roomId } = client;
          if (!roomId) return;
          await prisma.element.updateMany({
            where: { roomId: parseInt(roomId) },
            data: { isDeleted: true },
          });
          broadcast(roomId, ws, { type: "clear", userId });
          break;
        }
      }
    } catch (e) {
      console.error(e);
    }
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

console.log(`Socket server running on port ${PORT}`);
