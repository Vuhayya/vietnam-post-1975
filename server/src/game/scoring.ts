import type { Question } from "@vnr/shared";

/** Vong 1: dung an diem co ban (co the them chut thuong toc do nhe). */
export function scoreRound1(q: Question, correct: boolean): number {
  return correct ? q.points : 0;
}

/**
 * Vong 3 (Tang toc): tinh theo DUNG + NHANH.
 * Dung -> diem co ban + thuong toc do (toi da them 100% diem neu tra loi tuc thi).
 */
export function scoreRound3(
  q: Question,
  correct: boolean,
  remaining: number,
  duration: number
): number {
  if (!correct) return 0;
  const ratio = duration > 0 ? Math.max(0, Math.min(1, remaining / duration)) : 0;
  const speedBonus = Math.round(q.points * ratio);
  return q.points + speedBonus;
}

/** So sanh dap an (chuan hoa: bo dau cach thua, khong phan biet hoa thuong). */
export function isCorrect(given: string, answer: string): boolean {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
  return norm(given) === norm(answer);
}
