import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useRoom, phaseLabel } from "../lib/useRoom";
import type { Phase } from "@vnr/shared";
import { TIMER_OPTIONS } from "@vnr/shared";
import Scoreboard from "../components/Scoreboard";

const PHASES: { phase: Phase; label: string }[] = [
  { phase: "lobby", label: "Sảnh" },
  { phase: "round1", label: "V1 Khởi động" },
  { phase: "round2", label: "V2 CNV" },
  { phase: "round3", label: "V3 Tăng tốc" },
  { phase: "round4", label: "V4 Về đích" },
  { phase: "finished", label: "Kết thúc" },
];

export default function Host() {
  const nav = useNavigate();
  const { state, secret, timer } = useRoom();
  const code = sessionStorage.getItem("vnr_code") ?? "";

  useEffect(() => {
    if (!code) {
      nav("/");
      return;
    }
    const resume = () => socket.emit("host:resume", { code }, () => {});
    resume();
    socket.on("connect", resume);
    return () => {
      socket.off("connect", resume);
    };
  }, []);

  const q = state?.question;
  const emit = (ev: any, payload?: any) => socket.emit(ev, payload);

  return (
    <div className="min-h-screen p-4 grid lg:grid-cols-[1fr_320px] gap-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="card flex items-center justify-between !py-3">
          <div>
            <div className="text-xs text-white/60">MÃ PHÒNG</div>
            <div className="text-3xl font-black tracking-widest text-[#ffcd00]">{code}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60">{phaseLabel(state?.phase ?? "lobby")}</div>
            <div className="text-sm">
              {state?.players.length ?? 0} người chơi ·{" "}
              {state?.players.filter((p) => p.connected).length ?? 0} online
            </div>
          </div>
        </div>

        {/* Chon vong */}
        <div className="card">
          <div className="text-sm font-bold mb-2 text-white/70">CHỌN VÒNG THI</div>
          <div className="flex flex-wrap gap-2">
            {PHASES.map((p) => (
              <button
                key={p.phase}
                className={state?.phase === p.phase ? "btn-yellow" : "btn-ghost"}
                onClick={() => emit("host:startPhase", { phase: p.phase })}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dieu khien cau hoi */}
        {state && state.phase !== "lobby" && state.phase !== "finished" && (
          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-white/70">ĐIỀU KHIỂN CÂU HỎI</div>
              {q && state.phase !== "round4" && (
                <div className="text-sm">
                  Câu {q.index + 1}/{q.total}
                </div>
              )}
            </div>

            {/* dieu huong cau (vong 2 chon hang ngang o panel rieng ben duoi) */}
            <div className="flex gap-2">
              {state.phase !== "round2" && state.phase !== "round4" && (
                <>
                  <button
                    className="btn-ghost"
                    onClick={() => emit("host:loadQuestionIndex", { index: (q?.index ?? 0) - 1 })}
                  >
                    ◀ Câu trước
                  </button>
                  <button className="btn-ghost" onClick={() => emit("host:nextQuestion")}>
                    Câu sau ▶
                  </button>
                </>
              )}
              <button className="btn-yellow" onClick={() => emit("host:showQuestion")}>
                Hiện câu hỏi
              </button>
            </div>

            {/* AI doc cau hoi (phat tren man hinh trinh chieu) */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-white/60">AI đọc:</span>
              <button className="btn-ghost !px-3 !py-1 text-sm" onClick={() => emit("host:tts", { action: "read" })}>
                🔊 Đọc
              </button>
              <button className="btn-ghost !px-3 !py-1 text-sm" onClick={() => emit("host:tts", { action: "read" })}>
                🔁 Đọc lại
              </button>
              <button className="btn-ghost !px-3 !py-1 text-sm" onClick={() => emit("host:tts", { action: "stop" })}>
                ⏹ Dừng
              </button>
              <span className="text-xs text-white/40">(phát qua loa màn hình trình chiếu)</span>
            </div>

            {/* noi dung cau (MC xem, co dap an) */}
            {q && (
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold">{q.text}</div>
                {q.timeline && (
                  <div className="text-sm text-white/70 mt-1">
                    {q.timeline.map((s) => `${s.date}: ${s.label}`).join("  →  ")}
                  </div>
                )}
                {q.options && q.answerFormat === "match" ? (
                  <div className="grid grid-cols-2 gap-1 mt-2 text-sm">
                    {q.options.map((o, idx) => {
                      const correctPillId = secret?.correctAnswer?.[idx];
                      const correctPill = q.matchOptions?.find((p) => p.id === correctPillId);
                      return (
                        <div key={o.id} className="text-green-300 font-bold">
                          {idx + 1}. {o.text} → {correctPill?.text ?? o.note}
                        </div>
                      );
                    })}
                  </div>
                ) : q.options && q.answerFormat === "sequence" ? (
                  <div className="grid grid-cols-2 gap-1 mt-2 text-sm">
                    {q.options.map((o) => {
                      const order = secret?.correctAnswer
                        ? secret.correctAnswer.toUpperCase().indexOf(o.id.toUpperCase())
                        : -1;
                      return (
                        <div key={o.id} className={order !== -1 ? "text-green-300 font-bold" : "text-white/70"}>
                          {order !== -1 ? `${order + 1}. ` : `${o.id}. `}
                          {o.text}
                          {o.note ? ` (${o.note})` : ""}
                        </div>
                      );
                    })}
                  </div>
                ) : q.options ? (
                  <div className="grid grid-cols-2 gap-1 mt-2 text-sm">
                    {q.options.map((o) => (
                      <div
                        key={o.id}
                        className={
                          secret?.correctAnswer === o.id
                            ? "text-green-300 font-bold"
                            : "text-white/70"
                        }
                      >
                        {o.id}. {o.text}
                        {secret?.correctAnswer === o.id && " ✓"}
                      </div>
                    ))}
                  </div>
                ) : (
                  secret?.correctAnswer && (
                    <div className="text-green-300 text-sm mt-1">Đáp án: {secret.correctAnswer}</div>
                  )
                )}
              </div>
            )}

            {/* dong ho */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-white/60">Đồng hồ:</span>
              {TIMER_OPTIONS.map((s) => (
                <button
                  key={s}
                  className={
                    state?.selectedDuration === s
                      ? "btn-yellow !px-3 !py-1 text-sm"
                      : "btn-ghost !px-3 !py-1 text-sm"
                  }
                  onClick={() => emit("host:startTimer", { seconds: s })}
                >
                  {s}s
                </button>
              ))}
              <button
                className={
                  q && state?.selectedDuration === q.timeLimit
                    ? "btn-yellow !px-3 !py-1 text-sm"
                    : "btn-ghost !px-3 !py-1 text-sm"
                }
                onClick={() => emit("host:startTimer", {})}
              >
                ▶ Mặc định
              </button>
              <button className="btn-ghost !px-3 !py-1 text-sm" onClick={() => emit("host:stopTimer")}>
                ⏸ Dừng
              </button>
              <span className="ml-auto text-2xl font-black">{timer.remaining}s</span>
            </div>

            {/* khoa / cong bo */}
            <div className="flex gap-2">
              <button className="btn-ghost" onClick={() => emit("host:lock")}>
                🔒 Khóa
              </button>
              <button className="btn-red" onClick={() => emit("host:reveal")}>
                Công bố đáp án
              </button>
            </div>
          </div>
        )}

        {/* Chuong (vong 4 cuop quyen la tu dong nen an bang dieu khien chuong thu cong) */}
        {state && state.phase !== "lobby" && state.phase !== "round4" && (
          <div className="card space-y-2">
            <div className="text-sm font-bold text-white/70">CHUÔNG</div>
            <div className="flex gap-2 items-center">
              <button className="btn-yellow" onClick={() => emit("host:openBuzzer")}>
                🔔 Mở chuông
              </button>
              <button className="btn-ghost" onClick={() => emit("host:closeBuzzer")}>
                Đóng
              </button>
              <button className="btn-ghost" onClick={() => emit("host:resetBuzzer")}>
                Reset
              </button>
              {state.buzzer.winnerId && (
                <>
                  {state.phase === "round2" && (
                    <button
                      className="btn bg-green-600 text-white"
                      onClick={() => emit("host:judgeKeyword", { playerId: state.buzzer.winnerId! })}
                    >
                      ✓ Đúng (+{state.obstacle?.keywordBuzzValue ?? 0}đ)
                    </button>
                  )}
                  <button
                    className="btn bg-red-600 text-white"
                    onClick={() => emit("host:buzzerWrong")}
                  >
                    ❌ Sai — {state.phase === "round2" ? "loại khỏi phần thi này" : "mở cho người khác"}
                  </button>
                  <span className="ml-auto text-green-300 font-bold">
                    🏆 {state.players.find((p) => p.id === state.buzzer.winnerId)?.name}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Vong 2: chuong ngai vat */}
        {state?.phase === "round2" && state.obstacle && (
          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-white/70">
                CHƯỚNG NGẠI VẬT:{" "}
                <span className="text-[#ffcd00]">
                  {state.obstacle.keywordRevealed ? state.obstacle.keyword : `(${state.obstacle.keywordLength} chữ cái)`}
                </span>
              </div>
              <div className="text-xs text-white/60">
                Bấm chuông đúng từ khóa lúc này:{" "}
                <b className="text-[#ffcd00]">{state.obstacle.keywordBuzzValue}đ</b>
              </div>
            </div>

            {/* 4 hang ngang: bam de chon + hien cau hoi hang do (dung chung dong ho o tren) */}
            <div className="grid gap-2">
              {state.obstacle.rows.map((row, i) => (
                <div
                  key={row.id}
                  className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 border ${
                    row.revealed ? "bg-green-600/20 border-green-500/40" : "bg-white/5 border-white/10"
                  } ${q?.id === row.id ? "ring-2 ring-[#ffcd00]" : ""}`}
                >
                  <span className="flex-1">
                    Hàng {i + 1}: {row.clue}
                    {row.revealed && <> → <b className="text-green-300">{row.answer}</b></>}
                  </span>
                  <button
                    className="btn-ghost !px-3 !py-1"
                    disabled={row.revealed}
                    onClick={() => emit("host:selectObstacleRow", { rowId: row.id })}
                  >
                    {row.revealed ? "Đã mở" : q?.id === row.id ? "Đang chọn" : "Chọn hàng này"}
                  </button>
                </div>
              ))}
            </div>

            {/* manh ghep thu 5: goi y trung tam, khong tinh diem hang ngang */}
            <div
              className={`rounded-lg px-3 py-2 border text-sm ${
                state.obstacle.centerHint.revealed
                  ? "bg-green-600/20 border-green-500/40"
                  : "bg-white/5 border-white/10"
              }`}
            >
              {state.obstacle.centerHint.revealed ? (
                <>
                  <span className="text-white/60">Gợi ý trung tâm: </span>
                  {state.obstacle.centerHint.clue}
                </>
              ) : (
                <button className="btn-ghost !px-3 !py-1" onClick={() => emit("host:revealCenterHint")}>
                  Mở gợi ý trung tâm (mảnh ghép thứ 5)
                </button>
              )}
            </div>

            <button className="btn-red w-full" onClick={() => emit("host:revealKeyword")}>
              Công bố từ khóa (bỏ cuộc / hết giờ)
            </button>
          </div>
        )}

        {/* Vong 4: ve dich */}
        {state?.phase === "round4" && state.finish && (
          <div className="card space-y-3">
            <div className="text-sm font-bold text-white/70">VỀ ĐÍCH - TOP 5</div>
            <div className="flex flex-wrap gap-2">
              {state.players
                .filter((p) => p.inFinalFive)
                .map((p) => (
                  <button
                    key={p.id}
                    className={state.finish!.currentPlayerId === p.id ? "btn-yellow" : "btn-ghost"}
                    onClick={() => emit("host:selectFinishPlayer", { playerId: p.id })}
                  >
                    {p.name} ({p.score})
                  </button>
                ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-white/60">
                Còn {state.finish.questionsLeftForTurn}/3 câu
              </span>
              <button
                className={state.finish.starOfHope ? "btn-red !px-3 !py-1" : "btn-ghost !px-3 !py-1"}
                onClick={() => emit("host:toggleStar")}
              >
                ⭐ Ngôi sao hy vọng
              </button>
              {state.finish.stealOpen && (
                <span className="ml-auto text-sm font-bold text-orange-300">🔔 Đang mở CƯỚP QUYỀN</span>
              )}
              {state.finish.resolved && !state.finish.stealOpen && (
                <span className="ml-auto text-sm font-bold text-green-300">✓ Đã xong câu này</span>
              )}
            </div>
            {(() => {
              const owner = state.players.find((p) => p.id === state.finish!.currentPlayerId);
              if (!owner)
                return (
                  <div className="text-xs text-white/50">
                    Chọn 1 thí sinh ở trên, rồi chọn 1 câu hỏi bên dưới cho thí sinh đó.
                  </div>
                );
              return (
                <div className="text-xs text-white/60">
                  Đang thi: <b className="text-white">{owner.name}</b> · Gói{" "}
                  {state.finish!.questionValue}đ{state.finish!.starOfHope ? " · ⭐ x2" : ""}
                  {state.finish!.ownerJudged &&
                    (owner.lastCorrect ? (
                      <b className="text-green-300"> · ĐÚNG (tự cộng điểm)</b>
                    ) : (
                      <b className="text-red-300"> · SAI → tự mở chuông cướp quyền</b>
                    ))}
                  <div className="text-white/40 mt-0.5">
                    Hết giờ tự chấm: đúng → cộng điểm; sai → mở chuông cướp quyền (không lộ đáp án).
                    Bấm 🔒 Khóa để chấm sớm; "Công bố đáp án" chỉ dùng sau khi đã chấm.
                  </div>
                </div>
              );
            })()}

            {/* Kho cau hoi: MC chon truc tiep 1 cau cho thi sinh. Cau da hoi bi khoa. */}
            {(() => {
              const all = secret?.finishQuestions ?? [];
              if (all.length === 0)
                return (
                  <div className="text-xs text-white/40">Đang tải kho câu hỏi...</div>
                );
              const canPick =
                !!state.finish!.currentPlayerId && state.finish!.questionsLeftForTurn > 0;
              const groups: { label: string; points: number }[] = [
                { label: "Gói 20 điểm", points: 20 },
                { label: "Gói 30 điểm", points: 30 },
              ];
              return (
                <div className="grid md:grid-cols-2 gap-3 pt-1">
                  {groups.map((g) => {
                    const qs = all.filter((x) => x.points === g.points);
                    const remaining = qs.filter((x) => !x.used).length;
                    return (
                      <div key={g.points} className="bg-white/5 rounded-lg p-2">
                        <div className="text-xs font-bold text-[#ffcd00] mb-1">
                          {g.label} · còn {remaining}/{qs.length}
                        </div>
                        <div className="grid gap-1 max-h-64 overflow-y-auto pr-1">
                          {qs.map((x, i) => (
                            <button
                              key={x.id}
                              disabled={x.used || !canPick}
                              title={x.text}
                              onClick={() => emit("host:loadFinishQuestion", { questionId: x.id })}
                              className={`text-left text-xs px-2 py-1 rounded border transition ${
                                x.current
                                  ? "bg-[#ffcd00] text-red-950 border-yellow-300 font-bold"
                                  : x.used
                                  ? "bg-white/5 border-white/5 text-white/30 line-through cursor-not-allowed"
                                  : canPick
                                  ? "bg-white/10 border-white/10 hover:bg-white/20"
                                  : "bg-white/5 border-white/5 text-white/40 cursor-not-allowed"
                              }`}
                            >
                              <span className="font-black mr-1">C{i + 1}.</span>
                              {x.text.length > 46 ? x.text.slice(0, 46) + "…" : x.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Danh sach nguoi choi + cham diem */}
        <div className="card">
          <div className="text-sm font-bold text-white/70 mb-2">
            NGƯỜI CHƠI (chấm điểm / điều chỉnh)
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {state?.players.map((p) => {
              const ans = secret?.playerAnswers.find((a) => a.playerId === p.id);
              return (
                <div key={p.id} className="bg-white/5 rounded-lg p-2 flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {p.name}{" "}
                      <span className="text-[#ffcd00] font-black">{p.score}</span>
                    </div>
                    {ans && (
                      <div className="text-xs text-white/60 truncate">
                        Trả lời: {ans.answer} ({(ans.timeMs / 1000).toFixed(1)}s)
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {state?.phase !== "round4" && (
                      <>
                        <button
                          className="btn bg-green-600 !px-2 !py-1 text-sm"
                          title="Đúng"
                          onClick={() => emit("host:judge", { playerId: p.id, correct: true })}
                        >
                          ✓
                        </button>
                        <button
                          className="btn bg-red-600 !px-2 !py-1 text-sm"
                          title="Sai"
                          onClick={() => emit("host:judge", { playerId: p.id, correct: false })}
                        >
                          ✗
                        </button>
                      </>
                    )}
                    <button
                      className="btn bg-white/10 !px-2 !py-1 text-sm"
                      onClick={() => emit("host:adjustScore", { playerId: p.id, delta: 5 })}
                    >
                      +5
                    </button>
                    <button
                      className="btn bg-white/10 !px-2 !py-1 text-sm"
                      onClick={() => emit("host:adjustScore", { playerId: p.id, delta: -5 })}
                    >
                      -5
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="btn-red w-full" onClick={() => emit("host:endGame")}>
          KẾT THÚC TRẬN ĐẤU
        </button>
      </div>

      {/* Cot phai: bang xep hang + link */}
      <div className="space-y-4">
        <div className="card text-sm space-y-1">
          <div className="font-bold text-white/70">MÀN HÌNH</div>
          <a className="text-[#ffcd00] underline" href={`/screen?code=${code}`} target="_blank">
            Mở màn hình trình chiếu ↗
          </a>
          <div className="text-white/50 text-xs">Mở ở tab/màn hình khác và chiếu lên máy chiếu.</div>
        </div>
        <Scoreboard players={state?.players ?? []} highlightFinal={state?.phase === "round4"} />
      </div>
    </div>
  );
}
