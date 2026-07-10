import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useRoom, phaseLabel } from "../lib/useRoom";
import Obstacle from "../components/Obstacle";
import Scoreboard from "../components/Scoreboard";
import Media from "../components/Media";
import { playSound, unlockAudio } from "../lib/sound";
import { tts } from "../lib/tts";
import { bgMusic } from "../lib/bgMusic";

export default function Screen() {
  const nav = useNavigate();
  const { state, timer } = useRoom();
  const urlCode = new URLSearchParams(window.location.search).get("code")?.toUpperCase();
  const code = urlCode || sessionStorage.getItem("vnr_code") || "";
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    if (!code) {
      nav("/");
      return;
    }
    const rejoin = () => socket.emit("screen:join", { code }, () => {});
    rejoin();
    socket.on("connect", rejoin);

    // Am thanh + AI doc cau hoi (phat tren man hinh trinh chieu)
    const onSound = (d: { name: any }) => playSound(d.name);
    const onTts = (d: { action: "read" | "stop"; url?: string; text?: string }) => {
      if (d.action === "stop") tts.stop();
      else if (d.url) tts.playUrl(d.url);
      else if (d.text) tts.speak(d.text);
    };
    socket.on("sound", onSound);
    socket.on("tts", onTts);

    return () => {
      socket.off("connect", rejoin);
      socket.off("sound", onSound);
      socket.off("tts", onTts);
    };
  }, []);

  const enableAudio = () => {
    unlockAudio();
    tts.warmup();
    bgMusic.warmup();
    playSound("intro");
    setAudioReady(true);
  };

  const q = state?.question;

  // Nhac nen lap lai trong luc cau hoi dang mo va chua khoa/cong bo dap an.
  useEffect(() => {
    if (q?.music && state?.questionVisible && !state?.revealed && timer.running) {
      bgMusic.play(q.music);
    } else {
      bgMusic.stop();
    }
  }, [q?.id, q?.music, state?.questionVisible, state?.revealed, timer.running]);
  const winner = state?.buzzer.winnerId
    ? state.players.find((p) => p.id === state.buzzer.winnerId)
    : null;

  return (
    <div className="min-h-screen p-8 flex flex-col">
      {/* Bat am thanh - can 1 lan click (chinh sach autoplay cua trinh duyet) */}
      {!audioReady && (
        <button
          onClick={enableAudio}
          className="fixed top-4 right-4 z-50 bg-[#ffcd00] text-red-950 font-bold px-4 py-2 rounded-full shadow-lg animate-pulse"
        >
          🔊 Bấm để bật âm thanh & AI đọc
        </button>
      )}

      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-black">
          VNR202 <span className="text-[#ffcd00]">CHALLENGE</span>
        </div>
        <div className="text-xl font-bold bg-[#da251d] px-5 py-2 rounded-full">
          {phaseLabel(state?.phase ?? "lobby")}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6">
        {/* khu vuc chinh */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* dong ho lon */}
          {timer.duration > 0 && (
            <div className="text-center">
              <div
                className={`inline-block text-7xl font-black px-8 py-2 rounded-2xl ${
                  timer.remaining <= 5 ? "text-red-400 animate-pulse" : "text-[#ffcd00]"
                }`}
              >
                {timer.remaining}
              </div>
            </div>
          )}

          {/* Vong 2: chuong ngai vat */}
          {state?.phase === "round2" && state.obstacle ? (
            <Obstacle
              data={state.obstacle}
              activeRowId={state.questionVisible ? q?.id : undefined}
            />
          ) : q && state?.questionVisible ? (
            <div className="card flex-1 flex flex-col justify-center">
              <div className="text-sm text-[#ffcd00] mb-2">
                Câu {q.index + 1}/{q.total} · {q.points} điểm
              </div>
              <div className="text-4xl font-bold leading-snug mb-6">{q.text}</div>
              {q.media?.url && (
                <div className="mb-4">
                  <Media media={q.media} />
                </div>
              )}
              {q.timeline && (
                <div className="flex items-center gap-3 mb-6">
                  {q.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10 w-52">
                        {step.imageUrl && (
                          <img src={step.imageUrl} alt="" className="w-full h-28 object-cover rounded-lg mb-2" />
                        )}
                        <div className="text-[#ffcd00] font-black text-lg">{step.date}</div>
                        <div className="text-base font-medium leading-snug">{step.label}</div>
                      </div>
                      {idx < q.timeline!.length - 1 && (
                        <div className="text-3xl text-white/40">➡️</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {q.options && q.answerFormat === "match" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {q.options.map((o, idx) => (
                      <div
                        key={o.id}
                        className={`relative rounded-xl overflow-hidden border ${
                          state.revealed ? "border-green-300" : "border-white/10"
                        }`}
                      >
                        {o.imageUrl && (
                          <img src={o.imageUrl} alt="" className="w-full h-40 object-cover" />
                        )}
                        <div className="absolute top-2 left-2 w-9 h-9 rounded-full bg-black/70 text-[#ffcd00] font-black flex items-center justify-center text-xl">
                          {idx + 1}
                        </div>
                        <div className="px-3 py-2 bg-black/60 text-lg font-semibold">
                          {o.text}
                          {state.revealed && o.note && (
                            <div className="text-green-300 text-base font-bold mt-1">{o.note}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {q.matchOptions && (
                    <div className="grid grid-cols-2 gap-3">
                      {q.matchOptions.map((p) => (
                        <div
                          key={p.id}
                          className="px-4 py-3 rounded-xl text-xl font-semibold border border-white/10 bg-white/10 text-center"
                        >
                          {p.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : q.options && q.answerFormat === "sequence" ? (
                <div className="grid grid-cols-2 gap-4">
                  {q.options.map((o) => {
                    const order = state.revealed
                      ? state.revealedAnswer?.toUpperCase().indexOf(o.id.toUpperCase()) ?? -1
                      : -1;
                    return (
                      <div
                        key={o.id}
                        className={`relative rounded-xl overflow-hidden border ${
                          order !== -1 ? "border-green-300" : "border-white/10"
                        }`}
                      >
                        {o.imageUrl && (
                          <img src={o.imageUrl} alt="" className="w-full h-40 object-cover" />
                        )}
                        <div className="px-3 py-2 bg-black/60 text-lg font-semibold">
                          <span className="font-black text-[#ffcd00] mr-2">{o.id}.</span>
                          {o.text}
                          {order !== -1 && o.note && (
                            <div className="text-green-300 text-base font-bold mt-1">{o.note}</div>
                          )}
                        </div>
                        {order !== -1 && (
                          <div className="absolute top-2 left-2 w-9 h-9 rounded-full bg-green-500 text-white font-black flex items-center justify-center text-xl">
                            {order + 1}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : q.options ? (
                <div className="grid grid-cols-2 gap-4">
                  {q.options.map((o) => {
                    const correct = state.revealed && state.revealedAnswer === o.id;
                    return (
                      <div
                        key={o.id}
                        className={`px-5 py-4 rounded-xl text-2xl font-semibold border ${
                          correct
                            ? "bg-green-500 border-green-300"
                            : "bg-white/10 border-white/10"
                        }`}
                      >
                        <span className="font-black text-[#ffcd00] mr-2">{o.id}.</span>
                        {o.text}
                      </div>
                    );
                  })}
                </div>
              ) : (
                state.revealed && (
                  <div className="mt-4 text-2xl text-green-300 font-bold">
                    Đáp án: {state.revealedAnswer}
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="card flex-1 flex items-center justify-center text-3xl text-white/50">
              {state?.phase === "finished"
                ? "KẾT THÚC - Chúc mừng nhà vô địch!"
                : `Mã phòng: ${code} · Chờ bắt đầu...`}
            </div>
          )}

          {/* nguoi bam chuong */}
          {winner && (
            <div className="bg-green-600 rounded-2xl py-4 text-center text-3xl font-black animate-pulse">
              🔔 {winner.name} giành quyền trả lời!
            </div>
          )}
        </div>

        {/* bang xep hang */}
        <Scoreboard players={state?.players ?? []} highlightFinal={state?.phase === "round4"} />
      </div>

      <div className="text-center text-white/40 text-sm mt-4">
        Người chơi vào tại địa chỉ web này · Mã phòng: <b className="text-[#ffcd00]">{code}</b>
      </div>
    </div>
  );
}
