import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useRoom, phaseLabel } from "../lib/useRoom";
import Media from "../components/Media";
import PatrioticDecor from "../components/PatrioticDecor";

export default function Player() {
  const nav = useNavigate();
  const { state, timer, toast } = useRoom();
  const [myAnswer, setMyAnswer] = useState<string>("");
  const [textAnswer, setTextAnswer] = useState("");
  const [sequence, setSequence] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});

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
          if (res.currentAnswer && /^[A-Za-z]+$/.test(res.currentAnswer)) {
            setSequence(res.currentAnswer.toUpperCase().split(""));
          }
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
      setSequence([]);
      setMatches({});
    }
    lastQuestionId.current = qId;
  }, [state?.question?.id]);

  const q = state?.question;
  // Nguoi choi co the bam lai de doi dap an cho toi khi het gio / MC cong bo dap an.
  let canAnswer = !!state?.questionVisible && !state?.revealed && timer.running;
  // Vong 4 (Ve dich): chi 1 nguoi duoc tra loi tai moi thoi diem.
  // - Binh thuong: thi sinh dang toi luot (currentPlayerId).
  // - Khi MC mo chuong cuop quyen: chi nguoi gianh duoc chuong (stealerId).
  // 4 nguoi con lai khong the chon dap an cho toi khi cuop duoc quyen.
  if (state?.phase === "round4" && state.finish) {
    const f = state.finish;
    const activeId = f.stealOpen ? f.stealerId : f.currentPlayerId;
    const iAmActive = activeId === playerId;
    const windowOpen = f.stealOpen ? true : timer.running;
    canAnswer = !!state.questionVisible && !state.revealed && iAmActive && windowOpen;
  }

  const answer = (val: string) => {
    if (!canAnswer) return;
    setMyAnswer(val);
    socket.emit("player:answer", { answer: val });
  };

  const isSequenceMode = q?.answerFormat === "sequence" && !!q.options;
  const isMatchMode = q?.answerFormat === "match" && !!q.options && !!q.matchOptions;

  const toggleSequencePick = (id: string) => {
    if (!canAnswer || !q?.options) return;
    const total = q.options.length;
    setSequence((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      if (next.length === total) {
        const joined = next.join("");
        setMyAnswer(joined);
        socket.emit("player:answer", { answer: joined });
      }
      return next;
    });
  };

  // "match": cham the moc thoi gian -> gan cho anh dau tien chua co the (theo thu tu options).
  // Cham lai 1 the da dung -> bo gan (tra the ve pool).
  const toggleMatchPill = (pillId: string) => {
    if (!canAnswer || !q?.options) return;
    setMatches((prev) => {
      const assignedImgId = Object.keys(prev).find((k) => prev[k] === pillId);
      const next = { ...prev };
      if (assignedImgId) {
        delete next[assignedImgId];
      } else {
        const targetImg = q.options!.find((o) => !next[o.id]);
        if (!targetImg) return prev;
        next[targetImg.id] = pillId;
      }
      if (Object.keys(next).length === q.options!.length) {
        const joined = q.options!.map((o) => next[o.id]).join("");
        setMyAnswer(joined);
        socket.emit("player:answer", { answer: joined });
      }
      return next;
    });
  };

  const buzz = () => socket.emit("player:buzz");
  const iAmBuzzWinner = state?.buzzer.winnerId === playerId;
  const iAmLocked = state?.buzzer.lockedOut.includes(playerId);

  // Vong 4 (Ve dich): chi Top 5 thi dau; nhung nguoi con lai chi theo doi.
  const isFinalRound = state?.phase === "round4";
  const iAmFinalist = !!me?.inFinalFive;
  const finalSpectator = isFinalRound && !iAmFinalist;

  return (
    <div className="min-h-screen p-4 max-w-lg mx-auto flex flex-col gap-4">
      <PatrioticDecor />
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
      {(!q || !state?.questionVisible) && !finalSpectator && (
        <div className="card text-center py-10 text-white/70">
          {state?.phase === "finished"
            ? "Trận đấu đã kết thúc. Cảm ơn bạn đã tham gia!"
            : "Chờ MC ra câu hỏi..."}
        </div>
      )}

      {/* Vong 4: nguoi ngoai Top 5 chi theo doi */}
      {finalSpectator && (
        <div className="card text-center py-8 space-y-1">
          <div className="text-3xl">👀</div>
          <div className="font-bold">Vòng Về đích – chỉ Top 5 thi đấu</div>
          <div className="text-sm text-white/70">
            Bạn không nằm trong Top 5. Hãy theo dõi phần thi trên màn hình chính và cổ vũ nhé!
          </div>
        </div>
      )}

      {/* CHUONG (buzzer) */}
      {(state?.buzzer.open || iAmBuzzWinner) && !finalSpectator ? (
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
      {q && state?.questionVisible && !finalSpectator && (
        <div className="card space-y-4">
          <div className="text-lg font-semibold">{q.text}</div>
          {/* Video xem chung tren man hinh trinh chieu (tranh tua truoc lo dap an tren dien thoai rieng) */}
          {q.media?.url && q.media.kind !== "video" && <Media media={q.media} />}
          {q.media?.url && q.media.kind === "video" && (
            <div className="text-center text-sm text-white/60">
              📺 Xem video gợi ý trên màn hình trình chiếu
            </div>
          )}

          {q.timeline && (
            <div className="space-y-1">
              {q.timeline.map((step, idx) => (
                <div key={idx}>
                  <div className="flex gap-3 items-center bg-white/5 rounded-lg p-2">
                    {step.imageUrl && (
                      <img src={step.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg shrink-0" />
                    )}
                    <div>
                      <div className="text-[#ffcd00] font-bold text-sm">{step.date}</div>
                      <div className="text-sm">{step.label}</div>
                    </div>
                  </div>
                  {idx < q.timeline!.length - 1 && (
                    <div className="text-center text-white/40 text-lg">⬇️</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {isMatchMode ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {q.options!.map((opt, idx) => {
                  const assignedPillId = matches[opt.id];
                  const assignedPill = q.matchOptions!.find((p) => p.id === assignedPillId);
                  const correctPillId = state.revealed ? state.revealedAnswer?.[idx] : undefined;
                  const isCorrect = state.revealed && !!assignedPillId && assignedPillId === correctPillId;
                  const isWrong = state.revealed && !!assignedPillId && assignedPillId !== correctPillId;
                  return (
                    <div
                      key={opt.id}
                      className={`relative rounded-xl overflow-hidden border-2 ${
                        isCorrect
                          ? "border-green-400"
                          : isWrong
                          ? "border-red-500"
                          : assignedPill
                          ? "border-[#ffcd00]"
                          : "border-white/10"
                      }`}
                    >
                      {opt.imageUrl && (
                        <img src={opt.imageUrl} alt="" className="w-full h-24 object-cover" />
                      )}
                      <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-black/70 text-[#ffcd00] font-black flex items-center justify-center text-sm">
                        {idx + 1}
                      </div>
                      <div className="px-2 py-1 bg-black/60 text-xs font-medium">
                        {opt.text}
                        <div className={`font-bold ${assignedPill ? "text-[#ffcd00]" : "text-white/40"}`}>
                          {assignedPill ? assignedPill.text : "Chưa chọn"}
                        </div>
                        {state.revealed && opt.note && (
                          <div className="text-green-300 font-bold">Đáp án: {opt.note}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {q.matchOptions!.map((pill) => {
                  const used = Object.values(matches).includes(pill.id);
                  return (
                    <button
                      key={pill.id}
                      onClick={() => toggleMatchPill(pill.id)}
                      disabled={!canAnswer}
                      className={`px-3 py-2 rounded-lg font-medium border transition ${
                        used
                          ? "bg-[#ffcd00] text-red-950 border-yellow-300"
                          : "bg-white/10 border-white/10 hover:bg-white/20"
                      }`}
                    >
                      {pill.text}
                    </button>
                  );
                })}
              </div>
              <div className="text-center text-sm text-white/70">
                Chạm thẻ mốc thời gian theo thứ tự ảnh 1 → 2 → 3 → 4
              </div>
            </div>
          ) : isSequenceMode ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {q.options!.map((opt) => {
                  const pickIndex = sequence.indexOf(opt.id);
                  const picked = pickIndex !== -1;
                  const correctOrder = state.revealed
                    ? state.revealedAnswer?.toUpperCase().indexOf(opt.id.toUpperCase()) ?? -1
                    : -1;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleSequencePick(opt.id)}
                      disabled={!canAnswer}
                      className={`relative rounded-xl overflow-hidden border-2 text-left transition ${
                        picked ? "border-[#ffcd00]" : "border-white/10"
                      }`}
                    >
                      {opt.imageUrl && (
                        <img src={opt.imageUrl} alt="" className="w-full h-24 object-cover" />
                      )}
                      <div className="px-2 py-1 bg-black/60 text-xs font-medium">
                        {opt.text}
                        {correctOrder !== -1 && opt.note && (
                          <div className="text-green-300 font-bold">{opt.note}</div>
                        )}
                      </div>
                      {picked && (
                        <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-[#ffcd00] text-red-950 font-black flex items-center justify-center text-sm">
                          {pickIndex + 1}
                        </div>
                      )}
                      {correctOrder !== -1 && (
                        <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-green-500 text-white font-black flex items-center justify-center text-sm">
                          {correctOrder + 1}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="text-center text-sm text-white/70">
                {sequence.length > 0
                  ? `Thứ tự đã chọn: ${sequence.join(" → ")}`
                  : "Chạm vào ảnh theo thứ tự từ sớm nhất đến muộn nhất"}
              </div>
              {sequence.length > 0 && canAnswer && (
                <button className="btn-ghost w-full !py-2 text-sm" onClick={() => setSequence([])}>
                  Chọn lại
                </button>
              )}
              {state.revealed && state.revealedAnswer && (
                <div className="text-center text-sm text-green-300 font-bold">
                  Thứ tự đúng: {state.revealedAnswer.toUpperCase().split("").join(" → ")}
                </div>
              )}
            </div>
          ) : q.options ? (
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

          {isFinalRound && iAmFinalist && !canAnswer && !state.revealed && !me?.answered && (
            <div className="text-center text-white/60 text-sm">
              {state.finish?.stealOpen
                ? iAmLocked
                  ? "Bạn không được cướp quyền ở câu này."
                  : "Bấm chuông phía trên để giành quyền trả lời!"
                : "Thí sinh khác đang trả lời. Chờ MC mở chuông cướp quyền..."}
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

      {/* Chan trang: cham yeu nuoc, lap khoang trong phia duoi */}
      <div className="mt-auto pt-6 text-center text-white/35 text-xs flex items-center justify-center gap-2">
        <span className="text-[#ffcd00]/70">★</span>
        <span className="italic">Nước Việt Nam là một, dân tộc Việt Nam là một</span>
        <span className="text-[#ffcd00]/70">★</span>
      </div>

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 rounded-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}
