import "./env.js"; // phai dau tien: nap .env truoc cac import khac
import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";
import { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "@vnr/shared";
import { GameManager } from "./game/GameManager.js";
import { registerHandlers } from "./socket/handlers.js";
import { initDb } from "./db/prisma.js";
import { getHistory } from "./db/history.js";

const PORT = Number(process.env.PORT ?? 4000);
const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "vnr202-challenge" }));

// Lich su cac tran dau (Phase 3: lich su + thong ke)
app.get("/api/history", async (_req, res) => {
  res.json(await getHistory());
});

// --- Production: phuc vu luon ban build cua client (chay 1 tien trinh) -------
const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDist = join(__dirname, "../../client/dist");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  // SPA fallback: moi route khac tra ve index.html (React Router lo phan con lai)
  app.get(/^\/(?!socket\.io|health|api).*/, (_req, res) => {
    res.sendFile(join(clientDist, "index.html"));
  });
  console.log("  Che do production: dang phuc vu client tu", clientDist);
}

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: { origin: true, methods: ["GET", "POST"] },
});

const manager = new GameManager(io);
registerHandlers(io, manager);

initDb(); // ket noi DB (khong chan server neu that bai)

httpServer.listen(PORT, () => {
  console.log(`\n  VNR202 Challenge server chay tai http://localhost:${PORT}`);
  console.log(`  Socket.IO san sang. Cho ket noi...\n`);
});
