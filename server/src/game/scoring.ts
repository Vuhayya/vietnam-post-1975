import type { Question } from "@vnr/shared";

/** Vong 1: dung an diem co ban (co the them chut thuong toc do nhe). */
export function scoreRound1(q: Question, correct: boolean): number {
  return correct ? q.points : 0;
}

/**
 * Vong 3 (Tang toc): tinh theo DUNG + HANG tra loi dung (nguoi tra loi dung nhanh nhat duoc thuong nhieu nhat).
 * Hang 1: +100% diem (toi da), hang 2: +75%, hang 3: +50%, hang 4: +25%, hang 5 tro di: +0% (chi diem goc).
 * rank = 0 hoac bo qua khi khong dung (khong thuong).
 */
export function scoreRound3(q: Question, correct: boolean, rank: number): number {
  if (!correct) return 0;
  const bonusRatio = Math.max(0, 1 - (rank - 1) * 0.25);
  return q.points + Math.round(q.points * bonusRatio);
}

/** So sanh dap an (chuan hoa: bo dau cach thua, khong phan biet hoa thuong). */
export function isCorrect(given: string, answer: string): boolean {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
  return norm(given) === norm(answer);
}
