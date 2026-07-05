const env = (import.meta as any).env ?? {};
export const SERVER_URL: string =
  env.VITE_SERVER_URL ??
  (env.DEV ? `${window.location.protocol}//${window.location.hostname}:4000` : window.location.origin);

export interface MatchResult {
  id: string;
  name: string;
  score: number;
  rank: number;
}
export interface MatchRecord {
  id: string;
  code: string;
  startedAt: string;
  endedAt: string | null;
  winner: string | null;
  results: MatchResult[];
}

export async function fetchHistory(): Promise<MatchRecord[]> {
  const r = await fetch(`${SERVER_URL}/api/history`);
  if (!r.ok) throw new Error("Không tải được lịch sử");
  return r.json();
}
