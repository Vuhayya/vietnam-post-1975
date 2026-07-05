import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useRoom, phaseLabel } from "../lib/useRoom";
import type { Phase } from "@vnr/shared";
import { TIMER_OPTIONS, FINISH_VALUES } from "@vnr/shared";
import Scoreboard from "../components/Scoreboard";

const PHASES: { phase: Phase; label: string }[] = [
  { phase: "lobby", label: "Sanh" },
  { phase: "round1", label: "V1 Khoi dong" },
  { phase: "round2", label: "V2 CNV" },
  { phase: "round3", label: "V3 Tang toc" },
  { phase: "round4", label: "V4 Ve dich" },
  { phase: "finished", label: "Ket thuc" },
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
            <div className="text-xs text-white/60">MA PHONG</div>
            <div className="text-3xl font-black tracking-widest text-[#ffcd00]">{code}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60">{phaseLabel(state?.phase ?? "lobby")}</div>
            <div className="text-sm">
              {state?.players.length ?? 0} nguoi choi ·{" "}
              {state?.players.filter((p) => p.connected).length ?? 0} online
            </div>
          </div>
        </div>

        {/* Chon vong */}
        <div className="card">
          <div className="text-sm font-bold mb-2 text-white/70">CHON VONG THI</div>
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
              <div className="text-sm font-bold text-white/70">DIEU KHIEN CAU HOI</div>
              {q && (
                <div className="text-sm">
                  Cau {q.index + 1}/{q.total}
                </div>
              )}
            </div>

            {/* dieu huong cau */}
            <div className="flex gap-2">
              <button
                className="btn-ghost"
                onClick={() => emit("host:loadQuestionIndex", { index: (q?.index ?? 0) - 1 })}
              >
                ◀ Cau truoc
              </button>
              <button className="btn-ghost" onClick={() => emit("host:nextQuestion")}>
                Cau sau ▶
              </button>
              <button className="btn-yellow" onClick={() => emit("host:showQuestion")}>
                Hien cau hoi
              </button>
            </div>

            {/* AI doc cau hoi (phat tren man hinh trinh chieu) */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-white/60">AI doc:</span>
              <button className="btn-ghost !px-3 !py-1 text-sm" onClick={() => emit("host:tts", { action: "read" })}>
                🔊 Doc
              </button>
              <button className="btn-ghost !px-3 !py-1 text-sm" onClick={() => emit("host:tts", { action: "read" })}>
                🔁 Doc lai
              </button>
              <button className="btn-ghost !px-3 !py-1 text-sm" onClick={() => emit("host:tts", { action: "stop" })}>
                ⏹ Dung
              </button>
              <span className="text-xs text-white/40">(phat qua loa man hinh trinh chieu)</span>
            </div>

            {/* noi dung cau (MC xem, co dap an) */}
            {q && (
              <div className="bg-white/5 rounded-lg p-3">
                <div className="font-semibold">{q.text}</div>
                {q.options && (
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
                )}
                {!q.options && secret?.correctAnswer && (
                  <div className="text-green-300 text-sm mt-1">Dap an: {secret.correctAnswer}</div>
                )}
              </div>
            )}

            {/* dong ho */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-white/60">Dong ho:</span>
              {TIMER_OPTIONS.map((s) => (
                <button
                  key={s}
                  className="btn-ghost !px-3 !py-1 text-sm"
                  onClick={() => emit("host:startTimer", { seconds: s })}
                >
                  {s}s
                </button>
              ))}
              <button className="btn-ghost !px-3 !py-1 text-sm" onClick={() => emit("host:startTimer", {})}>
                ▶ Mac dinh
              </button>
              <button className="btn-ghost !px-3 !py-1 text-sm" onClick={() => emit("host:stopTimer")}>
                ⏸ Dung
              </button>
              <span className="ml-auto text-2xl font-black">{timer.remaining}s</span>
            </div>

            {/* khoa / cong bo */}
            <div className="flex gap-2">
              <button className="btn-ghost" onClick={() => emit("host:lock")}>
                🔒 Khoa
              </button>
              <button className="btn-red" onClick={() => emit("host:reveal")}>
                Cong bo dap an
              </button>
            </div>
          </div>
        )}

        {/* Chuong */}
        {state && state.phase !== "lobby" && (
          <div className="card space-y-2">
            <div className="text-sm font-bold text-white/70">CHUONG</div>
            <div className="flex gap-2 items-center">
              <button className="btn-yellow" onClick={() => emit("host:openBuzzer")}>
                🔔 Mo chuong
              </button>
              <button className="btn-ghost" onClick={() => emit("host:closeBuzzer")}>
                Dong
              </button>
              <button className="btn-ghost" onClick={() => emit("host:resetBuzzer")}>
                Reset
              </button>
              {state.buzzer.winnerId && (
                <>
                  <button
                    className="btn bg-red-600 text-white"
                    onClick={() => emit("host:buzzerWrong")}
                  >
                    ❌ Sai — mo cho nguoi khac
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
          <div className="card space-y-2">
            <div className="text-sm font-bold text-white/70">
              CHUONG NGAI VAT: <span className="text-[#ffcd00]">{state.obstacle.keyword}</span>
            </div>
            <div className="grid gap-2">
              {state.obstacle.rows.map((row, i) => (
                <div key={row.id} className="flex items-center gap-2 text-sm">
                  <span className="flex-1">
                    Hang {i + 1}: {row.clue} → <b className="text-green-300">{row.answer}</b>
                  </span>
                  <button
                    className="btn-ghost !px-3 !py-1"
                    disabled={row.revealed}
                    onClick={() => emit("host:revealRow", { rowId: row.id })}
                  >
                    {row.revealed ? "Da mo" : "Mo hang"}
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-red w-full" onClick={() => emit("host:revealKeyword")}>
              Mo chuong ngai vat (tu khoa)
            </button>
          </div>
        )}

        {/* Vong 4: ve dich */}
        {state?.phase === "round4" && state.finish && (
          <div className="card space-y-3">
            <div className="text-sm font-bold text-white/70">VE DICH - TOP 5</div>
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
              <span className="text-sm text-white/60">Goi diem:</span>
              {FINISH_VALUES.map((v) => (
                <button
                  key={v}
                  className={state.finish!.questionValue === v ? "btn-yellow !px-3 !py-1" : "btn-ghost !px-3 !py-1"}
                  onClick={() =>
                    emit("host:setQuestionValue", { value: v, star: state.finish!.starOfHope })
                  }
                >
                  {v}
                </button>
              ))}
              <button
                className={state.finish.starOfHope ? "btn-red !px-3 !py-1" : "btn-ghost !px-3 !py-1"}
                onClick={() =>
                  emit("host:setQuestionValue", {
                    value: state.finish!.questionValue,
                    star: !state.finish!.starOfHope,
                  })
                }
              >
                ⭐ Ngoi sao hy vong
              </button>
              <button className="btn-ghost !px-3 !py-1 ml-auto" onClick={() => emit("host:openSteal")}>
                Mo chuong cuop quyen
              </button>
            </div>
          </div>
        )}

        {/* Danh sach nguoi choi + cham diem */}
        <div className="card">
          <div className="text-sm font-bold text-white/70 mb-2">
            NGUOI CHOI (cham diem / dieu chinh)
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
                        TL: {ans.answer} ({(ans.timeMs / 1000).toFixed(1)}s)
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="btn bg-green-600 !px-2 !py-1 text-sm"
                      title="Dung"
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
          KET THUC TRAN DAU
        </button>
      </div>

      {/* Cot phai: bang xep hang + link */}
      <div className="space-y-4">
        <div className="card text-sm space-y-1">
          <div className="font-bold text-white/70">MAN HINH</div>
          <a className="text-[#ffcd00] underline" href={`/screen?code=${code}`} target="_blank">
            Mo man hinh trinh chieu ↗
          </a>
          <div className="text-white/50 text-xs">Mo o tab/man hinh khac va chieu len may chieu.</div>
        </div>
        <Scoreboard players={state?.players ?? []} highlightFinal={state?.phase === "round4"} />
      </div>
    </div>
  );
}
