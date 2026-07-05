import type { Server, Socket } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "@vnr/shared";
import { GameManager } from "../game/GameManager.js";
import { saveMatch } from "../db/history.js";

type IO = Server<ClientToServerEvents, ServerToClientEvents>;
type Sock = Socket<ClientToServerEvents, ServerToClientEvents>;

interface SocketMeta {
  code?: string;
  role?: "host" | "player" | "screen";
  playerId?: string;
}

export function registerHandlers(io: IO, manager: GameManager) {
  io.on("connection", (socket: Sock) => {
    const meta: SocketMeta = {};

    const room = () => (meta.code ? manager.getRoom(meta.code) : undefined);
    const isHost = () => meta.role === "host";

    // ---- tao / vao phong -------------------------------------------------
    socket.on("host:create", (cb) => {
      const r = manager.createRoom();
      meta.code = r.code;
      meta.role = "host";
      r.hostSocketId = socket.id;
      socket.join(r.code);
      socket.join(`${r.code}:host`);
      cb({ code: r.code });
      r.broadcast();
    });

    socket.on("host:resume", ({ code }, cb) => {
      const r = manager.getRoom(code);
      if (!r) return cb({ ok: false, error: "Phòng không tồn tại" });
      meta.code = r.code;
      meta.role = "host";
      r.hostSocketId = socket.id;
      socket.join(r.code);
      socket.join(`${r.code}:host`);
      cb({ ok: true });
      r.broadcast();
    });

    socket.on("player:join", ({ code, name, playerId }, cb) => {
      const r = manager.getRoom(code);
      if (!r) return cb({ ok: false, error: "Mã phòng không đúng" });
      if (!name?.trim()) return cb({ ok: false, error: "Tên không được trống" });
      const pid = playerId || `p_${socket.id}_${Date.now().toString(36)}`;
      meta.code = r.code;
      meta.role = "player";
      meta.playerId = pid;
      socket.join(r.code);
      socket.join(`${r.code}:players`);
      r.addPlayer(pid, name.trim(), socket.id);
      cb({ ok: true, playerId: pid });
    });

    socket.on("screen:join", ({ code }, cb) => {
      const r = manager.getRoom(code);
      if (!r) return cb({ ok: false, error: "Mã phòng không đúng" });
      meta.code = r.code;
      meta.role = "screen";
      socket.join(r.code);
      socket.join(`${r.code}:screen`);
      cb({ ok: true });
      r.broadcast();
    });

    // ---- guard: chi host moi dieu khien ---------------------------------
    const hostOnly = (fn: () => void) => () => {
      if (isHost() && room()) fn();
    };

    // ---- dieu khien vong -------------------------------------------------
    socket.on("host:startPhase", ({ phase }) => isHost() && room()?.startPhase(phase));
    socket.on("host:showQuestion", hostOnly(() => room()!.showQuestion()));
    socket.on("host:nextQuestion", hostOnly(() => room()!.nextQuestion()));
    socket.on("host:loadQuestionIndex", ({ index }) => isHost() && room()?.loadQuestionIndex(index));
    socket.on("host:startTimer", ({ seconds }) => isHost() && room()?.startTimer(seconds));
    socket.on("host:stopTimer", hostOnly(() => room()!.stopTimer()));
    socket.on("host:lock", hostOnly(() => room()!.lock()));
    socket.on("host:reveal", hostOnly(() => room()!.reveal()));
    socket.on("host:endGame", hostOnly(() => {
      const r = room()!;
      r.endGame();
      void saveMatch(r); // luu lich su (bo qua neu khong co DB)
    }));
    socket.on("host:adjustScore", ({ playerId, delta }) =>
      isHost() && room()?.adjustScore(playerId, delta)
    );
    socket.on("host:judge", ({ playerId, correct, points }) =>
      isHost() && room()?.judge(playerId, correct, points)
    );

    // ---- chuong ----------------------------------------------------------
    socket.on("host:openBuzzer", hostOnly(() => room()!.openBuzzer()));
    socket.on("host:closeBuzzer", hostOnly(() => room()!.closeBuzzer()));
    socket.on("host:resetBuzzer", hostOnly(() => { room()!.resetBuzzer(); room()!.broadcast(); }));
    socket.on("host:buzzerWrong", hostOnly(() => room()!.buzzerWrong()));
    socket.on("player:buzz", () => {
      if (meta.role === "player" && meta.playerId) room()?.buzz(meta.playerId);
    });

    // ---- tra loi ---------------------------------------------------------
    socket.on("player:answer", ({ answer }) => {
      if (meta.role === "player" && meta.playerId) room()?.submitAnswer(meta.playerId, answer);
    });

    // ---- vong 2 ----------------------------------------------------------
    socket.on("host:revealRow", ({ rowId }) => isHost() && room()?.revealRow(rowId));
    socket.on("host:revealCorner", ({ corner }) => isHost() && room()?.revealCorner(corner));
    socket.on("host:revealKeyword", hostOnly(() => room()!.revealKeyword()));

    // ---- vong 4 ----------------------------------------------------------
    socket.on("host:selectFinishPlayer", ({ playerId }) =>
      isHost() && room()?.selectFinishPlayer(playerId)
    );
    socket.on("host:setQuestionValue", ({ value, star }) =>
      isHost() && room()?.setQuestionValue(value, star)
    );
    socket.on("host:openSteal", hostOnly(() => room()!.openSteal()));

    // ---- AI doc cau hoi --------------------------------------------------
    socket.on("host:tts", ({ action }) => {
      if (!isHost()) return;
      if (action === "read") room()?.ttsRead();
      else room()?.ttsStop();
    });

    // ---- ngat ket noi ----------------------------------------------------
    socket.on("disconnect", () => {
      room()?.markDisconnected(socket.id);
    });
  });

  // don phong rong moi 5 phut
  setInterval(() => manager.cleanup(), 5 * 60 * 1000);
}
