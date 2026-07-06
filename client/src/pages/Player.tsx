import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useRoom, phaseLabel } from "../lib/useRoom";
import Media from "../components/Media";

export default function Player() {
  const nav = useNavigate();
  const { state, timer, toast } = useRoom();
  const [myAnswer, setMyAnswer] = useState<string>("");
  const [textAnswer, setTextAnswer] = useState("");

  const code = sessionStorage.getItem("vnr_code") ?? "";
  const name = sessionStorage.getItem("vnr_name") ?? "";
  const playerId = localStorage.getItem("vnr_playerId") ?? "";

  // tu dong join lai khi mo trang / khi socket reconnect
  useEffect(() => {
    if (!code || !name) {
      nav("/");
      return;
    }
    const rejoin = () =>
      socket.emit("player:join", { code, name, playerId: playerId || undefined }, (res) => {
        if (res.ok && res.playerId) localStorage.setItem("vnr_playerId", res.playerId);
        if (res.ok && res.currentAnswer !== undefined) {
          setMyAnswer(res.currentAnswer);
          setTextAnswer(res.currentAnswer);
        }
      });
    rejoin();
    socket.on("connect", rejoin);
    return () => {
      socket.off("connect", rejoin);
    };
  }, []);

  const me = useMemo(
    () => state?.players.find((p) => p.id === playerId),
    [state, playerId]
  );
  const rank = useMemo(
    () => (state ? state.players.findIndex((p) => p.id === playerId) + 1 : 0),
    [state, playerId]
  );

  // reset lua chon khi thuc su sang cau hoi khac (khong reset luc dong bo lan dau /
  // khi rejoin, va khong reset khi MC cong bo dap an - de con hien thi dung/sai)
  const lastQuestionId = useRef<string | null>(null);
  useEffect(() => {
    const qId = state?.question?.id ?? null;
    if (lastQuestionId.current !== null && qId !== lastQuestionId.current) {
      setMyAnswer("");
      setTextAnswer("");
    }
    lastQuestionId.current = qId;
  }, [state?.question?.id]);

  const q = state?.question;
  // Nguoi choi co the bam lai de doi dap an cho toi khi het gio / MC cong bo dap an.
  const canAnswer = state?.questionVisible && !state?.revealed && timer.running;

  const answer = (val: string) => {
    if (!canAnswer) return;
    setMyAnswer(val);
    socket.emit("player:answer", { answer: val });
  };

  const buzz = () => socket.emit("player:buzz");
  const iAmBuzzWinner = state?.buzzer.winnerId === playerId;
  const iAmLocked = state?.buzzer.lockedOut.includes(playerId);

  return (
    <div className="min-h-screen p-4 max-w-lg mx-auto flex flex-col gap-4">
      {/* header */}
      <div className="flex items-center justify-between card !p-3">
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-xs text-white/60">Phòng {code}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-[#ffcd00]">{me?.score ?? 0}</div>
          <div className="text-xs text-white/60">Hạng {rank || "-"}</div>
        </div>
      </div>

      <div className="text-center text-sm text-white/70">{phaseLabel(state?.phase ?? "lobby")}</div>

      {/* dong ho */}
      {timer.duration > 0 && (
        <div className="text-center">
          <div className={`text-4xl font-black ${timer.remaining <= 5 ? "text-red-400" : ""}`}>
            {timer.remaining}s
          </div>
        </div>
      )}

      {/* trang thai cho */}
      {(!q || !state?.questionVisible) && (
        <div className="card text-center py-10 text-white/70">
          {state?.phase === "finished"
            ? "Trận đấu đã kết thúc. Cảm ơn bạn đã tham gia!"
            : "Chờ MC ra câu hỏi..."}
        </div>
      )}

      {/* CHUONG (buzzer) */}
      {state?.buzzer.open || iAmBuzzWinner ? (
        <button
          onClick={buzz}
          disabled={!state?.buzzer.open || !!iAmLocked || !!state?.buzzer.winnerId}
          className={`w-full py-10 rounded-2xl text-2xl font-black transition ${
            iAmBuzzWinner
              ? "bg-green-500 text-white"
              : iAmLocked
              ? "bg-white/10 text-white/40"
              : "bg-[#ffcd00] text-red-950 animate-pulse"
          }`}
        >
          {iAmBuzzWinner ? "BẠN GIÀNH QUYỀN TRẢ LỜI!" : iAmLocked ? "ĐÃ BỊ KHÓA" : "BẤM CHUÔNG!"}
        </button>
      ) : null}

      {/* CAU HOI + tra loi */}
      {q && state?.questionVisible && (
        <div className="card space-y-4">
          <div className="text-lg font-semibold">{q.text}</div>
          {q.media?.url && <Media media={q.media} />}

          {q.options ? (
            <div className="grid grid-cols-1 gap-2">
              {q.options.map((opt) => {
                const chosen = myAnswer === opt.id;
                const isCorrect = state.revealed && state.revealedAnswer === opt.id;
                const isWrongChosen = state.revealed && chosen && !isCorrect;
                return (
                  <button
                    key={opt.id}
                    onClick={() => answer(opt.id)}
                    disabled={!canAnswer}
                    className={`text-left px-4 py-3 rounded-xl font-medium border transition ${
                      isCorrect
                        ? "bg-green-500 border-green-300"
                        : isWrongChosen
                        ? "bg-red-600 border-red-400"
                        : chosen
                        ? "bg-[#ffcd00] text-red-950 border-yellow-300"
                        : "bg-white/10 border-white/10 hover:bg-white/20"
                    }`}
                  >
                    <span className="font-black mr-2">{opt.id}.</span>
                    {opt.text}
                  </button>
                );
              })}
            </div>
          ) : (
            // cau tu luan (vong 4 / dien dap an) -> gui text, MC cham
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 outline-none"
                placeholder="Nhập đáp án..."
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={!canAnswer}
              />
              <button
                className="btn-yellow"
                disabled={!canAnswer || !textAnswer.trim()}
                onClick={() => answer(textAnswer.trim())}
              >
                Gửi
              </button>
            </div>
          )}

          {me?.answered && !state.revealed && (
            <div className="text-center text-green-300 text-sm">
              {canAnswer ? "Đã chọn đáp án. Bạn có thể bấm lại để đổi." : "Đã chốt đáp án. Chờ kết quả..."}
            </div>
          )}
          {state.revealed && me?.lastCorrect !== undefined && (
            <div
              className={`text-center font-bold ${
                me.lastCorrect ? "text-green-300" : "text-red-300"
              }`}
            >
              {me.lastCorrect ? "Chính xác! 🎉" : "Chưa đúng 😢"}
            </div>
          )}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 rounded-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}
