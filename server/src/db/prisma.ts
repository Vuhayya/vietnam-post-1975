// DB la TUY CHON. Prisma chi duoc khoi tao khi co DATABASE_URL va client da
// duoc generate. Moi buoc deu boc try/catch + dynamic import de neu thieu DB
// hoac chua "prisma generate" thi server VAN chay (chi khong luu lich su),
// tuyet doi khong crash luc khoi dong (quan trong khi deploy tren Render...).
export let prisma: any = null;

// Co ket noi duoc DB khong. Neu khong -> game van chay, chi khong luu lich su.
export let dbAvailable = false;

export async function initDb() {
  if (!process.env.DATABASE_URL) {
    console.warn("  (DB) Chua cau hinh DATABASE_URL - khong luu lich su tran.");
    return;
  }
  try {
    const { PrismaClient } = await import("@prisma/client");
    prisma = new PrismaClient();
    await prisma.$connect();
    dbAvailable = true;
    console.log("  (DB) Da ket noi PostgreSQL - se luu lich su tran.");
  } catch (e) {
    dbAvailable = false;
    prisma = null;
    console.warn(
      "  (DB) Khong khoi tao duoc PostgreSQL (chua generate client hoac khong ket noi duoc) - game van chay binh thuong, chi khong luu lich su."
    );
  }
}
