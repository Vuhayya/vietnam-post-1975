import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Co ket noi duoc DB khong. Neu khong -> game van chay, chi khong luu lich su.
export let dbAvailable = false;

export async function initDb() {
  if (!process.env.DATABASE_URL) {
    console.warn("  (DB) Chua cau hinh DATABASE_URL - khong luu lich su tran.");
    return;
  }
  try {
    await prisma.$connect();
    dbAvailable = true;
    console.log("  (DB) Da ket noi PostgreSQL - se luu lich su tran.");
  } catch (e) {
    dbAvailable = false;
    console.warn(
      "  (DB) Khong ket noi duoc PostgreSQL - game van chay binh thuong, chi khong luu lich su."
    );
  }
}
