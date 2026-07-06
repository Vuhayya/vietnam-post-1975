// ============================================================================
// VNR202 Challenge - Shared types (hop dong chung giua Server va Client)
// ============================================================================

export type Phase =
  | "lobby" // dang cho nguoi choi vao phong
  | "round1" // Khoi dong
  | "round2" // Vuot chuong ngai vat
  | "round3" // Tang toc
  | "round4" // Ve dich
  | "finished"; // Ket thuc

export type Role = "host" | "player" | "screen";

export type QuestionType =
  | "mcq" // trac nghiem A/B/C/D  (Vong 1, co the Vong 3)
  | "obstacle" // chuong ngai vat  (Vong 2)
  | "media" // hinh anh / video / su kien  (Vong 3)
  | "finish"; // cau hoi ve dich  (Vong 4)

export interface QuestionOption {
  id: string; // "A" | "B" | "C" | "D"
  text: string;
}

export interface MediaAsset {
  kind: "image" | "video" | "audio";
  url: string;
}

export interface Question {
  id: string;
  phase: Phase;
  type: QuestionType;
  text: string;
  options?: QuestionOption[]; // cho mcq / media dang trac nghiem
  correctAnswer: string; // option id ("A") hoac dap an dang text
  timeLimit: number; // giay
  points: number; // diem co ban
  media?: MediaAsset;
  explanation?: string; // giai thich hien khi reveal
}

// ---- Vong 2: Chuong ngai vat ----------------------------------------------
export interface ObstacleRow {
  id: string;
  clue: string; // cau hoi hang ngang (goi y)
  answer: string; // dap an hang ngang
  revealed: boolean; // da tra loi dung / MC da cong bo dap an chua
}

export interface ObstacleCenterHint {
  clue: string; // goi y cho manh ghep thu 5 (o trung tam), doc sau khi het 4 hang ngang
  revealed: boolean;
}

export interface ObstaclePuzzle {
  id: string;
  imageUrl: string; // buc anh bi che 4 manh (nua trai neu co imageUrlAfter)
  imageUrlAfter?: string; // anh nua phai (doi lap voi imageUrl) - vd truoc/sau doi moi
  keyword: string; // tu khoa trung tam (chuong ngai vat)
  rows: ObstacleRow[]; // 4 hang ngang, moi hang mo 1 manh anh
  centerHint: ObstacleCenterHint; // manh ghep thu 5
  keywordRevealed: boolean;
  cornersRevealed: boolean[]; // 4 goc anh da lat chua
}

// ---- Ban rut gon gui cho nguoi choi/man hinh (an dap an chua mo, kem do dai) ----
export interface PublicObstacleRow {
  id: string;
  clue: string;
  answer: string; // "" neu chua revealed (an dap an voi nguoi choi)
  answerLength: number; // luon dung, de ve o chu trong
  revealed: boolean;
}

export interface PublicObstacle {
  id: string;
  imageUrl: string;
  imageUrlAfter?: string;
  keyword: string; // "" neu chua keywordRevealed
  keywordLength: number;
  rows: PublicObstacleRow[];
  centerHint: ObstacleCenterHint;
  keywordRevealed: boolean;
  cornersRevealed: boolean[];
  keywordBuzzValue: number; // diem neu bam chuong dung tu khoa luc nay (80/40/20, 0 = chua duoc bam)
}

// ---- Nguoi choi ------------------------------------------------------------
export interface Player {
  id: string; // persistent id (luu localStorage)
  name: string;
  score: number;
  connected: boolean;
  answered: boolean; // da tra loi cau hien tai chua
  lastCorrect?: boolean; // ket qua cau vua roi (dung/sai)
  inFinalFive?: boolean; // co trong Top 5 vong 4 khong
}

// ---- Trang thai vong 4 (Ve dich) ------------------------------------------
export interface FinishState {
  currentPlayerId: string | null; // nguoi dang toi luot
  questionValue: number; // goi diem player chon (10/20/30)
  starOfHope: boolean; // ngoi sao hy vong (nhan doi)
  stealOpen: boolean; // dang mo chuong cho 4 nguoi con lai cuop
  stealerId: string | null; // nguoi gianh quyen cuop
  turnOrder: string[]; // thu tu 5 nguoi
  turnIndex: number; // dang o nguoi thu may
  questionsLeftForTurn: number; // con may cau trong luot nay (3)
}

// ---- Trang thai chuong (buzzer) -------------------------------------------
export interface BuzzerState {
  open: boolean;
  winnerId: string | null; // nguoi bam nhanh nhat
  lockedOut: string[]; // nhung nguoi da bi khoa (tra loi sai)
}

// ---- Snapshot gui cho client (da lam sach - KHONG kem dap an) --------------
export interface PublicQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: QuestionOption[];
  timeLimit: number;
  points: number;
  media?: MediaAsset;
  index: number; // cau thu may
  total: number; // tong so cau cua vong
}

export interface RoomStateSnapshot {
  code: string;
  phase: Phase;
  players: Player[];
  question: PublicQuestion | null;
  questionVisible: boolean; // MC da show cau hoi len chua
  selectedDuration: number; // thoi gian MC dang chon (dung khi bam "Hien cau hoi")
  timer: { running: boolean; remaining: number; duration: number };
  buzzer: BuzzerState;
  revealed: boolean; // da cong bo dap an chua
  revealedAnswer: string | null; // dap an (chi co khi revealed = true)
  obstacle: PublicObstacle | null; // vong 2
  finish: FinishState | null; // vong 4
  answeredCount: number; // bao nhieu nguoi da tra loi
}

// Payload bi mat chi gui cho MC (host)
export interface HostSecret {
  correctAnswer: string | null;
  playerAnswers: { playerId: string; name: string; answer: string; timeMs: number }[];
}

// ============================================================================
// Socket events
// ============================================================================
export interface ClientToServerEvents {
  // --- tao / vao phong ---
  "host:create": (cb: (res: { code: string }) => void) => void;
  "player:join": (
    data: { code: string; name: string; playerId?: string },
    cb: (res: { ok: boolean; playerId?: string; error?: string; currentAnswer?: string }) => void
  ) => void;
  "screen:join": (data: { code: string }, cb: (res: { ok: boolean; error?: string }) => void) => void;
  "host:resume": (data: { code: string }, cb: (res: { ok: boolean; error?: string }) => void) => void;

  // --- dieu khien chung ---
  "host:startPhase": (data: { phase: Phase }) => void;
  "host:showQuestion": () => void;
  "host:nextQuestion": () => void;
  "host:startTimer": (data: { seconds?: number }) => void;
  "host:stopTimer": () => void;
  "host:lock": () => void;
  "host:reveal": () => void;
  "host:adjustScore": (data: { playerId: string; delta: number }) => void;
  "host:judge": (data: { playerId: string; correct: boolean; points?: number }) => void;
  "host:endGame": () => void;
  "host:loadQuestionIndex": (data: { index: number }) => void;

  // --- chuong ---
  "host:openBuzzer": () => void;
  "host:closeBuzzer": () => void;
  "host:resetBuzzer": () => void;
  "host:buzzerWrong": () => void; // nguoi thang chuong tra loi sai -> mo cho nguoi khac
  "player:buzz": () => void;

  // --- tra loi ---
  "player:answer": (data: { answer: string }) => void;

  // --- vong 2: chuong ngai vat ---
  "host:selectObstacleRow": (data: { rowId: string }) => void; // MC chon hang + hien cau hoi hang do
  "host:revealCenterHint": () => void; // mo goi y manh ghep thu 5 (khong tinh diem)
  "host:revealKeyword": () => void; // MC tu cong bo tu khoa (bo cuoc / het gio)
  "host:judgeKeyword": (data: { playerId: string }) => void; // nguoi thang chuong doan dung tu khoa

  // --- vong 4: ve dich ---
  "host:selectFinishPlayer": (data: { playerId: string }) => void;
  "host:setQuestionValue": (data: { value: number; star: boolean }) => void;
  "host:openSteal": () => void;

  // --- AI doc cau hoi ---
  "host:tts": (data: { action: "read" | "stop" }) => void;
}

export interface ServerToClientEvents {
  state: (snapshot: RoomStateSnapshot) => void;
  "host:secret": (secret: HostSecret) => void;
  buzz: (data: { playerId: string; name: string }) => void;
  timer: (data: { remaining: number; duration: number; running: boolean }) => void;
  sound: (data: { name: SoundName }) => void;
  tts: (data: { action: "read" | "stop"; url?: string; text?: string }) => void;
  toast: (data: { message: string; kind?: "info" | "success" | "error" }) => void;
}

export type SoundName =
  | "intro"
  | "countdown"
  | "tick"
  | "correct"
  | "wrong"
  | "reveal"
  | "buzz"
  | "victory"
  | "applause"
  | "suspense";

export const FINISH_VALUES = [10, 20, 30] as const;
export const TIMER_OPTIONS = [15, 20, 30, 45, 60] as const;
