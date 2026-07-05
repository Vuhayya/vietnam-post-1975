import { io, type Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "@vnr/shared";

// Dev: client (5173) va server (4000) khac cong -> tro toi :4000.
// Production: client duoc server phuc vu cung origin -> dung location.origin.
const env = (import.meta as any).env ?? {};
const URL =
  env.VITE_SERVER_URL ??
  (env.DEV
    ? `${window.location.protocol}//${window.location.hostname}:4000`
    : window.location.origin);

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: true,
  transports: ["websocket", "polling"],
});
