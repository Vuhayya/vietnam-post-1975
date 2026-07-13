import type { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  Phase,
  Player,
  PublicQuestion,
  Question,
  RoomStateSnapshot,
  ObstaclePuzzle,
  PublicObstacle,
  FinishState,
  BuzzerState,
  SoundName,
} from "@vnr/shared";
import { ROUND1, ROUND3, ROUND4, OBSTACLE } from "../data/questions.js";
import { scoreRound1, scoreRound3, isCorrect } from "./scoring.js";
import { synthesize } from "../tts/edgeTts.js";

type IO = Server<ClientToServerEvents, ServerToClientEvents>;

interface PlayerInternal extends Player {
  socketId: string | null;
}

interface AnswerRecord {
  answer: string;
  timeMs: number;
}

export class Room {
  code: string;
  io: IO;
  hostSocketId: string | null = null;

  phase: Phase = "lobby";
  players = new Map<string, PlayerInternal>();

  // cau hoi
  questionList: Question[] = [];
  questionIndex = -1;
  current: Question | null = null;
  questionVisible = false;

  // dong ho
  timer = { running: false, remaining: 0, duration: 0 };
  // thoi gian MC da chon truoc khi bam "Hien cau hoi" (null = dung mac dinh cua cau)
  selectedDuration: number | null = null;
  private timerHandle: NodeJS.Timeout | null = null;
  private questionStartAt = 0;

  // chuong
  buzzer: BuzzerState = { open: false, winnerId: null, lockedOut: [] };

  // dap an
  revealed = false;
  answers = new Map<string, AnswerRecord>();

  // vong 2
  obstacle: ObstaclePuzzle;

  // vong 4
  finish: FinishState | null = null;

  constructor(code: string, io: IO) {
    this.code = code;
    this.io = io;
    this.obstacle = structuredClone(OBSTACLE);
  }

  // -- helpers phong -----------------------------------------------------
  private roomAll() {
    return this.io.to(this.code);
  }
  sound(name: SoundName) {
    this.roomAll().emit("sound", { name });
  }
  toast(message: string, kind: "info" | "success" | "error" = "info") {
    this.roomAll().emit("toast", { message, kind });
  }

  // -- nguoi choi --------------------------------------------------------
  addPlayer(playerId: string, name: string, socketId: string) {
    const existing = this.players.get(playerId);
    if (existing) {
      existing.connected = true;
      existing.socketId = socketId;
      existing.name = name;
    } else {
      this.players.set(playerId, {
        id: playerId,
        name,
        score: 0,
        connected: true,
        answered: false,
        socketId,
      });
    }
    this.broadcast();
  }

  markDisconnected(socketId: string) {
    for (const p of this.players.values()) {
      if (p.socketId === socketId) {
        p.connected = false;
        p.socketId = null;
      }
    }
    if (this.hostSocketId === socketId) this.hostSocketId = null;
    this.broadcast();
  }

  adjustScore(playerId: string, delta: number) {
    const p = this.players.get(playerId);
    if (!p) return;
    p.score += delta;
    this.broadcast();
  }

  // -- dieu khien vong ---------------------------------------------------
  startPhase(phase: Phase) {
    this.phase = phase;
    this.questionIndex = -1;
    this.current = null;
    this.questionVisible = false;
    this.revealed = false;
    this.resetTimer();
    this.resetBuzzer();
    this.answers.clear();
    this.selectedDuration = null;
    for (const p of this.players.values()) {
      p.answered = false;
      p.lastCorrect = undefined;
    }

    if (phase === "round1") this.questionList = ROUND1;
    else if (phase === "round3") this.questionList = ROUND3;
    else if (phase === "round4") {
      this.questionList = ROUND4;
      this.setupFinal();
    } else this.questionList = [];

    if (phase === "round2") this.obstacle = structuredClone(OBSTACLE);

    // Nap san cau dau tien de MC thay ngay noi dung, khong can bam "Cau sau".
    // Nguoi choi van khong thay gi cho toi khi MC bam "Hien cau hoi" (xem broadcast()).
    if (this.questionList.length > 0) {
      this.questionIndex = 0;
      this.current = this.questionList[0];
      this.prewarmTts();
    }

    this.broadcast();
  }

  private setupFinal() {
    // Top 5 theo diem
    const top5 = [...this.players.values()]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    for (const p of this.players.values()) p.inFinalFive = false;
    for (const p of top5) p.inFinalFive = true;
    this.finish = {
      currentPlayerId: null,
      questionValue: 20,
      starOfHope: false,
      stealOpen: false,
      stealerId: null,
      turnOrder: top5.map((p) => p.id),
      turnIndex: -1,
      questionsLeftForTurn: 0,
    };
  }

  loadQuestionIndex(index: number) {
    if (index < 0 || index >= this.questionList.length) return;
    this.questionIndex = index;
    this.current = this.questionList[index];
    this.questionVisible = false;
    this.revealed = false;
    this.answers.clear();
    // Khong reset selectedDuration: thoi gian MC da chon se ap dung cho ca cau tiep theo.
    for (const p of this.players.values()) {
      p.answered = false;
      p.lastCorrect = undefined;
    }
    this.resetTimer();
    this.resetBuzzer();
    this.prewarmTts();
    this.broadcast();
  }

  nextQuestion() {
    this.loadQuestionIndex(this.questionIndex + 1);
  }

  showQuestion() {
    if (!this.current) return;
    this.questionVisible = true;
    this.sound("reveal");
    // Bam gio ngay khi hien cau hoi, dung thoi gian MC da chon truoc do
    // (hoac thoi gian mac dinh cua cau neu MC chua chon).
    this.startTimer(this.selectedDuration ?? this.current.timeLimit);
  }

  // MC chon truoc thoi gian se dung (truoc khi hien cau hoi thi chi luu lua chon;
  // neu cau da dang hien thi thi bam gio lai ngay voi thoi gian moi).
  setTimerDuration(seconds: number) {
    this.selectedDuration = seconds;
    if (this.questionVisible && !this.revealed) {
      this.startTimer(seconds);
    } else {
      this.broadcast();
    }
  }

  // -- dong ho -----------------------------------------------------------
  startTimer(seconds?: number) {
    const duration = seconds ?? this.current?.timeLimit ?? 30;
    this.timer = { running: true, remaining: duration, duration };
    this.questionStartAt = Date.now();
    this.emitTimer();
    if (this.timerHandle) clearInterval(this.timerHandle);
    this.timerHandle = setInterval(() => {
      this.timer.remaining -= 1;
      if (this.timer.remaining <= 5 && this.timer.remaining > 0) this.sound("tick");
      if (this.timer.remaining <= 0) {
        this.timer.remaining = 0;
        this.timer.running = false;
        if (this.timerHandle) clearInterval(this.timerHandle);
        this.timerHandle = null;
        this.lock();
      }
      this.emitTimer();
    }, 1000);
    this.broadcast();
  }
  stopTimer() {
    this.timer.running = false;
    if (this.timerHandle) clearInterval(this.timerHandle);
    this.timerHandle = null;
    this.emitTimer();
    this.broadcast();
  }
  resetTimer() {
    if (this.timerHandle) clearInterval(this.timerHandle);
    this.timerHandle = null;
    this.timer = { running: false, remaining: 0, duration: 0 };
  }
  private emitTimer() {
    this.roomAll().emit("timer", {
      remaining: this.timer.remaining,
      duration: this.timer.duration,
      running: this.timer.running,
    });
  }

  lock() {
    this.timer.running = false;
    if (this.timerHandle) clearInterval(this.timerHandle);
    this.timerHandle = null;
    this.buzzer.open = false;
    this.emitTimer();
    this.broadcast();
  }

  // -- tra loi -------------------------------------------------------------
  // Nguoi choi co the doi dap an nhieu lan cho toi khi het gio / cong bo dap an
  // (diem toc do vong 3 tinh theo lan chon cuoi cung).
  submitAnswer(playerId: string, answer: string) {
    if (!this.current || !this.questionVisible || this.revealed) return;
    if (!this.timer.running && this.timer.duration > 0 && this.timer.remaining === 0) return;
    const p = this.players.get(playerId);
    if (!p) return;
    const timeMs = this.questionStartAt ? Date.now() - this.questionStartAt : 0;
    this.answers.set(playerId, { answer, timeMs });
    p.answered = true;
    this.broadcast();
  }

  // dap an hien tai cua 1 nguoi choi cho cau dang hien thi (de dong bo lai khi ho reconnect)
  getCurrentAnswer(playerId: string): string | undefined {
    if (!this.questionVisible || this.revealed) return undefined;
    return this.answers.get(playerId)?.answer;
  }

  // -- cong bo dap an + cham diem tu dong (vong 1, 2 hang ngang & 3) -------
  reveal() {
    if (!this.current) return;
    this.revealed = true;
    const q = this.current;

    if (this.phase === "round1") {
      for (const [playerId, rec] of this.answers) {
        const p = this.players.get(playerId);
        if (!p) continue;
        const ok = isCorrect(rec.answer, q.correctAnswer);
        p.lastCorrect = ok;
        p.score += scoreRound1(q, ok);
      }
    } else if (this.phase === "round3") {
      // Hang theo thoi gian tra loi rieng cua tung nguoi (timeMs, nho hon = nhanh hon),
      // chi xep hang trong so nhung nguoi tra loi DUNG (lan chon cuoi cung).
      const correctByTime = [...this.answers.entries()]
        .filter(([, rec]) => isCorrect(rec.answer, q.correctAnswer))
        .sort((a, b) => a[1].timeMs - b[1].timeMs);
      const rankByPlayer = new Map(correctByTime.map(([playerId], idx) => [playerId, idx + 1]));
      for (const [playerId, rec] of this.answers) {
        const p = this.players.get(playerId);
        if (!p) continue;
        const ok = isCorrect(rec.answer, q.correctAnswer);
        p.lastCorrect = ok;
        p.score += scoreRound3(q, ok, rankByPlayer.get(playerId) ?? 0);
      }
    } else if (this.phase === "round2") {
      // Hang ngang: diem bang nhau cho tat ca nguoi tra loi dung (khong thuong toc do).
      for (const [playerId, rec] of this.answers) {
        const p = this.players.get(playerId);
        if (!p) continue;
        const ok = isCorrect(rec.answer, q.correctAnswer);
        p.lastCorrect = ok;
        if (ok) p.score += q.points;
      }
      const row = this.obstacle.rows.find((r) => r.id === q.id);
      if (row) {
        row.revealed = true;
        const idx = this.obstacle.rows.indexOf(row);
        if (idx >= 0 && idx < 4) this.obstacle.cornersRevealed[idx] = true;
      }
    }
    this.sound("reveal");
    this.broadcast();
  }

  // -- cham thu cong (vong 2 & 4) ---------------------------------------
  judge(playerId: string, correct: boolean, points?: number) {
    const p = this.players.get(playerId);
    if (!p) return;
    const q = this.current;
    const base = points ?? q?.points ?? 10;

    if (this.phase === "round4" && this.finish) {
      const val = this.finish.questionValue;
      const isOwner = playerId === this.finish.currentPlayerId;
      if (isOwner) {
        // Thi sinh ve dich: Ngoi sao hy vong nhan doi neu dung, bi tru neu sai.
        const mult = this.finish.starOfHope ? 2 : 1;
        if (correct) {
          p.score += val * mult;
        } else if (this.finish.starOfHope) {
          p.score -= val;
        }
      } else {
        // Nguoi cuop quyen: khong ap dung Ngoi sao hy vong (do la cuoc cua thi
        // sinh goc). Dung = tron diem goi cau; sai = bi tru dung so diem do.
        if (correct) p.score += val;
        else p.score -= val;
      }
      p.lastCorrect = correct;
    } else {
      // vong 2
      if (correct) p.score += base;
      p.lastCorrect = correct;
    }
    this.sound(correct ? "correct" : "wrong");
    this.broadcast();
  }

  // -- chuong ------------------------------------------------------------
  openBuzzer() {
    this.buzzer = { open: true, winnerId: null, lockedOut: this.buzzer.lockedOut };
    this.sound("suspense");
    this.broadcast();
  }
  closeBuzzer() {
    this.buzzer.open = false;
    this.broadcast();
  }
  resetBuzzer() {
    this.buzzer = { open: false, winnerId: null, lockedOut: [] };
  }
  buzz(playerId: string) {
    if (!this.buzzer.open) return;
    if (this.buzzer.winnerId) return; // da co nguoi nhanh hon
    if (this.buzzer.lockedOut.includes(playerId)) return;
    const p = this.players.get(playerId);
    if (!p) return;
    // Vong 4 (Ve dich): chi Top 5 duoc cuop quyen, nhung nguoi khac chi theo doi.
    if (this.phase === "round4" && !p.inFinalFive) return;
    this.buzzer.winnerId = playerId;
    this.buzzer.open = false;
    this.sound("buzz");
    this.roomAll().emit("buzz", { playerId, name: p.name });
    if (this.finish) this.finish.stealerId = playerId;
    this.broadcast();
  }
  /** MC bao nguoi thang chuong tra loi SAI -> mo chuong cho nguoi khac.
   * Vong 2: nguoi nay bi khoa VINH VIEN cho toi het vong (lockedOut khong bi xoa
   * cho toi khi sang hang/vong khac), dung nhu luat "tuoc quyen tham gia". */
  buzzerWrong() {
    const wid = this.buzzer.winnerId;
    if (wid) {
      this.buzzer.lockedOut.push(wid);
      const p = this.players.get(wid);
      if (p) p.lastCorrect = false;
    }
    this.buzzer.winnerId = null;
    this.buzzer.open = true;
    this.sound("wrong");
    this.broadcast();
  }

  // -- vong 2: chuong ngai vat -----------------------------------------------
  /** MC chon 1 hang ngang chua mo -> hien thi nhu 1 cau hoi (dung chung flow
   * "Hien cau hoi -> dem gio -> Cong bo dap an" cua vong 1/3/4). */
  selectObstacleRow(rowId: string) {
    if (this.phase !== "round2") return;
    const row = this.obstacle.rows.find((r) => r.id === rowId);
    if (!row || row.revealed) return;
    this.current = {
      id: row.id,
      phase: "round2",
      type: "obstacle",
      text: row.clue,
      correctAnswer: row.answer,
      timeLimit: 15,
      points: 10,
    };
    this.questionIndex = this.obstacle.rows.indexOf(row);
    this.questionVisible = false;
    this.revealed = false;
    this.answers.clear();
    this.selectedDuration = null;
    for (const p of this.players.values()) {
      p.answered = false;
      p.lastCorrect = undefined;
    }
    this.resetTimer();
    this.prewarmTts();
    this.broadcast();
  }

  /** Mo goi y manh ghep thu 5 (o trung tam) - khong tinh diem hang ngang,
   * chi tang du kien doan tu khoa. Tu do ve sau bam chuong dung tu khoa = 20d. */
  revealCenterHint() {
    if (this.obstacle.centerHint.revealed) return;
    this.obstacle.centerHint.revealed = true;
    this.sound("reveal");
    this.broadcast();
  }

  revealKeyword() {
    this.obstacle.keywordRevealed = true;
    this.obstacle.cornersRevealed = [true, true, true, true];
    this.sound("victory");
    this.broadcast();
  }

  /** Diem neu bam chuong dung tu khoa NGAY LUC NAY: 80 (sau hang 1) / 40 (tu hang 2
   * den truoc goi y trung tam) / 20 (sau khi mo goi y trung tam) / 0 (chua du dieu kien). */
  private keywordBuzzValue(): number {
    if (this.obstacle.centerHint.revealed) return 20;
    const revealedRows = this.obstacle.rows.filter((r) => r.revealed).length;
    if (revealedRows >= 2) return 40;
    if (revealedRows >= 1) return 80;
    return 0;
  }

  /** Nguoi thang chuong doan DUNG tu khoa: cong diem theo moc hien tai. */
  judgeKeyword(playerId: string) {
    const p = this.players.get(playerId);
    if (!p) return;
    p.score += this.keywordBuzzValue();
    p.lastCorrect = true;
    this.obstacle.keywordRevealed = true;
    this.obstacle.cornersRevealed = [true, true, true, true];
    this.sound("victory");
    this.broadcast();
  }

  // -- vong 4: ve dich ---------------------------------------------------
  selectFinishPlayer(playerId: string) {
    if (!this.finish) return;
    this.finish.currentPlayerId = playerId;
    this.finish.stealOpen = false;
    this.finish.stealerId = null;
    this.finish.starOfHope = false;
    this.finish.questionsLeftForTurn = 3;
    this.resetBuzzer();
    this.broadcast();
  }
  setQuestionValue(value: number, star: boolean) {
    if (!this.finish) return;
    this.finish.questionValue = value;
    this.finish.starOfHope = star;
    this.broadcast();
  }
  openSteal() {
    if (!this.finish) return;
    this.finish.stealOpen = true;
    // Thi sinh dang tra loi khong duoc cuop quyen cua chinh minh.
    const owner = this.finish.currentPlayerId;
    if (owner && !this.buzzer.lockedOut.includes(owner)) {
      this.buzzer.lockedOut.push(owner);
    }
    this.openBuzzer();
  }

  // -- AI doc cau hoi ------------------------------------------------------
  /** Tao truoc audio ngay khi cau hoi duoc nap (chua can bam "Doc"), de luc MC
   * bam "Doc" thi da co san trong cache cua synthesize() -> phat gan nhu tuc thi. */
  private prewarmTts() {
    const text = this.current?.text;
    if (!text) return;
    synthesize(text).catch((err) => {
      console.error("Loi prewarm Edge TTS:", err);
    });
  }
  async ttsRead() {
    const text = this.current?.text;
    if (!text) return;
    try {
      const id = await synthesize(text);
      this.roomAll().emit("tts", { action: "read", url: `/api/tts/${id}.mp3` });
    } catch (err) {
      console.error("Loi tao giong Edge TTS, dung giong trinh duyet du phong:", err);
      this.roomAll().emit("tts", { action: "read", text });
    }
  }
  ttsStop() {
    this.roomAll().emit("tts", { action: "stop" });
  }

  endGame() {
    this.phase = "finished";
    this.resetTimer();
    this.sound("victory");
    this.broadcast();
  }

  // -- snapshot ----------------------------------------------------------
  private publicQuestion(): PublicQuestion | null {
    if (!this.current) return null;
    return {
      id: this.current.id,
      type: this.current.type,
      text: this.current.text,
      options: this.current.options,
      timeLimit: this.current.timeLimit,
      points: this.current.points,
      media: this.current.media,
      index: this.questionIndex,
      total: this.phase === "round2" ? this.obstacle.rows.length : this.questionList.length,
      answerFormat: this.current.answerFormat,
      music: this.current.music,
      matchOptions: this.current.matchOptions,
      timeline: this.current.timeline,
    };
  }

  /** Ban day du (dung cho host/man hinh) kem do dai chu + diem bam chuong hien tai. */
  private decoratedObstacle(): PublicObstacle {
    const o = this.obstacle;
    return {
      id: o.id,
      imageUrl: o.imageUrl,
      imageUrlAfter: o.imageUrlAfter,
      keyword: o.keyword,
      keywordLength: o.keyword.replace(/\s+/g, "").length,
      rows: o.rows.map((r) => ({
        id: r.id,
        clue: r.clue,
        answer: r.answer,
        answerLength: r.answer.replace(/\s+/g, "").length,
        revealed: r.revealed,
      })),
      centerHint: { ...o.centerHint },
      keywordRevealed: o.keywordRevealed,
      cornersRevealed: [...o.cornersRevealed],
      keywordBuzzValue: this.keywordBuzzValue(),
    };
  }

  /** An dap an/tu khoa chua mo (chi gui do dai) - dung cho nguoi choi, chong xem truoc. */
  private redactObstacleForPlayers(o: PublicObstacle): PublicObstacle {
    return {
      ...o,
      keyword: o.keywordRevealed ? o.keyword : "",
      rows: o.rows.map((r) => ({ ...r, answer: r.revealed ? r.answer : "" })),
    };
  }

  /** An cau hoi (clue) cua hang chua duoc MC bam "Hien cau hoi" - dung cho man hinh
   * trinh chieu/nguoi choi, chi lo clue khi hang da mo hoac dang la hang dang hien. */
  private redactObstacleCluesForDisplay(o: PublicObstacle): PublicObstacle {
    return {
      ...o,
      rows: o.rows.map((r) => ({
        ...r,
        clue: r.revealed || (this.questionVisible && this.current?.id === r.id) ? r.clue : "",
      })),
    };
  }

  snapshot(): RoomStateSnapshot {
    return {
      code: this.code,
      phase: this.phase,
      players: [...this.players.values()]
        .map(({ socketId, ...pub }) => pub)
        .sort((a, b) => b.score - a.score),
      question: this.publicQuestion(),
      questionVisible: this.questionVisible,
      selectedDuration: this.selectedDuration ?? this.current?.timeLimit ?? 30,
      timer: { ...this.timer },
      buzzer: { ...this.buzzer },
      revealed: this.revealed,
      revealedAnswer: this.revealed ? this.current?.correctAnswer ?? null : null,
      obstacle: this.phase === "round2" ? this.decoratedObstacle() : null,
      finish: this.finish,
      answeredCount: this.answers.size,
    };
  }

  broadcast() {
    const full = this.snapshot();
    // Nguoi choi CHI nhan cau hoi khi MC da hien len (chong xem truoc/gian lan).
    // Dap an dung (ca hang ngang/tu khoa vong 2) khong bao gio nam trong snapshot cho nguoi choi.
    const playerSnap: RoomStateSnapshot = {
      ...full,
      question: this.questionVisible ? full.question : null,
      obstacle: full.obstacle
        ? this.redactObstacleCluesForDisplay(this.redactObstacleForPlayers(full.obstacle))
        : null,
    };
    // Man hinh trinh chieu: chi lo clue cua hang MC da bam "Hien cau hoi" (hoac da mo).
    const screenSnap: RoomStateSnapshot = {
      ...full,
      obstacle: full.obstacle ? this.redactObstacleCluesForDisplay(full.obstacle) : null,
    };
    this.io.to(`${this.code}:host`).emit("state", full);
    this.io.to(`${this.code}:screen`).emit("state", screenSnap);
    this.io.to(`${this.code}:players`).emit("state", playerSnap);

    if (this.hostSocketId) {
      this.io.to(this.hostSocketId).emit("host:secret", {
        correctAnswer: this.current?.correctAnswer ?? null,
        playerAnswers: [...this.answers.entries()].map(([playerId, rec]) => ({
          playerId,
          name: this.players.get(playerId)?.name ?? "?",
          answer: rec.answer,
          timeMs: rec.timeMs,
        })),
      });
    }
  }

  isEmpty() {
    return this.players.size === 0 && !this.hostSocketId;
  }
}
