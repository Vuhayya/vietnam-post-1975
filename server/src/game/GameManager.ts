import type { Server } from "socket.io";
import { customAlphabet } from "nanoid";
import type { ClientToServerEvents, ServerToClientEvents } from "@vnr/shared";
import { Room } from "./Room.js";

const genCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 5);

type IO = Server<ClientToServerEvents, ServerToClientEvents>;

export class GameManager {
  private rooms = new Map<string, Room>();
  constructor(private io: IO) {}

  createRoom(): Room {
    let code = genCode();
    while (this.rooms.has(code)) code = genCode();
    const room = new Room(code, this.io);
    this.rooms.set(code, room);
    return room;
  }

  getRoom(code: string): Room | undefined {
    return this.rooms.get(code?.toUpperCase?.() ?? code);
  }

  removeRoom(code: string) {
    this.rooms.delete(code);
  }

  /** Don phong rong (goi dinh ky) */
  cleanup() {
    for (const [code, room] of this.rooms) {
      if (room.isEmpty()) this.rooms.delete(code);
    }
  }
}
