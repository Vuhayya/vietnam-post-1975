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
  imageUrl?: string; // anh minh hoa cho tung phuong an (vd: cau sap xep thu tu)
  note?: string; // ghi chu hien kem khi cong bo dap an (vd: moc thoi gian cua su kien)
}

export interface MediaAsset {
  kind: "image" | "video" | "audio";
  url: string;
}

// ---- Timeline hien thi (vd: chuoi su kien -> doan chu de) ------------------
export interface TimelineStep {
  imageUrl?: string;
  date: string;
  label: string;
}

export interface Question {
  id: string;
  phase: Phase;
  type: QuestionType;
  text: string;
  options?: QuestionOption[]; // cho mcq / media dang trac nghiem
  correctAnswer: string; // option id ("A"), dap an dang text, hoac chuoi thu tu ("BDAC") neu answerFormat = "sequence"
  timeLimit: number; // giay
  points: number; // diem co ban
  media?: MediaAsset;
  explanation?: string; // giai thich hien khi reveal
  answerFormat?: "single" | "sequence" | "match"; // "sequence" = sap xep lai thu tu options; "match" = ghep moi option (anh) voi 1 the trong matchOptions
  music?: string; // nhac nen lap lai tren man hinh trinh chieu trong luc tra loi cau nay (vd: "/music/xxx.mp3")
  matchOptions?: QuestionOption[]; // cac "the" de ghep voi tung option (dung khi answerFormat = "match"), da xao tron san
  timeline?: TimelineStep[]; // chuoi su kien hien thi tinh (vd: "chuoi su kien nay phan anh qua trinh nao?")
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
  ownerJudged: boolean; // thi sinh chinh da duoc cham (dung/sai) cho cau hien tai chua
  resolved: boolean; // cau hien tai da xu ly xong (dung, hoac cuop xong, hoac da cong bo)
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
  answerFormat?: "single" | "sequence" | "match";
  music?: string;
  matchOptions?: QuestionOption[];
  timeline?: TimelineStep[];
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
  // Vong 4: toan bo kho cau hoi de MC chon truc tiep cau cho tung thi sinh
  // (chi gui cho host). used = da hoi roi (khoa lai), current = dang nap.
  finishQuestions?: { id: string; points: number; text: string; used: boolean; current: boolean }[];
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
  "host:loadFinishQuestion": (data: { questionId: string }) => void; // MC chon truc tiep 1 cau ve dich cho thi sinh
  "host:toggleStar": () => void; // bat/tat ngoi sao hy vong cho cau hien tai
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
  | "answerReveal" // am thanh phat khi cong bo dap an (file vuot_chuong_ngai_vat_intro)
  | "buzz"
  | "victory"
  | "applause"
  | "suspense";

export const FINISH_VALUES = [20, 30] as const;
export const TIMER_OPTIONS = [15, 20, 30, 45, 60] as const;
