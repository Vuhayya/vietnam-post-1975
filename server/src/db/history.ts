import { prisma, dbAvailable } from "./prisma.js";
import type { Room } from "../game/Room.js";

/** Luu ket qua mot tran da ket thuc (goi khi MC bam Ket thuc). */
export async function saveMatch(room: Room) {
  if (!dbAvailable) return;
  const players = room.snapshot().players; // da sap xep diem giam dan
  if (players.length === 0) return;
  try {
    await prisma.match.create({
      data: {
        code: room.code,
        endedAt: new Date(),
        winner: players[0]?.name ?? null,
        results: {
          create: players.map((p, i) => ({ name: p.name, score: p.score, rank: i + 1 })),
        },
      },
    });
    console.log(`  (DB) Da luu lich su tran ${room.code} (${players.length} nguoi choi).`);
  } catch (e) {
    console.warn("  (DB) Luu lich su that bai:", (e as Error).message);
  }
}

/** Lay lich su cac tran gan day (cho API / trang thong ke). */
export async function getHistory() {
  if (!dbAvailable) return [];
  try {
    return await prisma.match.findMany({
      orderBy: { startedAt: "desc" },
      take: 50,
      include: { results: { orderBy: { rank: "asc" } } },
    });
  } catch {
    return [];
  }
}
