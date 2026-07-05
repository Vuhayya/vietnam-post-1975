// Nap bien moi truong tu server/.env (Node >= 20.12 co process.loadEnvFile).
// Import file nay DAU TIEN trong index.ts de env san sang truoc cac import khac.
try {
  process.loadEnvFile();
} catch {
  // Khong co .env cung khong sao - game chay che do khong DB.
}
