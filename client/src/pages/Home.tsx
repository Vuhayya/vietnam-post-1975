import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { socket } from "../socket";
import PatrioticDecor, { Emblem, UnityRibbon } from "../components/PatrioticDecor";

export default function Home() {
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const createGame = () => {
    socket.emit("host:create", ({ code }) => {
      sessionStorage.setItem("vnr_code", code);
      nav("/host");
    });
  };

  const joinGame = () => {
    setError("");
    if (!code.trim() || !name.trim()) {
      setError("Nhập mã phòng và tên của bạn");
      return;
    }
    const playerId = localStorage.getItem("vnr_playerId") || undefined;
    socket.emit("player:join", { code: code.trim().toUpperCase(), name: name.trim(), playerId }, (res) => {
      if (!res.ok) return setError(res.error ?? "Không vào được phòng");
      localStorage.setItem("vnr_playerId", res.playerId!);
      sessionStorage.setItem("vnr_code", code.trim().toUpperCase());
      sessionStorage.setItem("vnr_name", name.trim());
      nav("/play");
    });
  };

  const joinScreen = () => {
    if (!code.trim()) return setError("Nhập mã phòng");
    socket.emit("screen:join", { code: code.trim().toUpperCase() }, (res) => {
      if (!res.ok) return setError(res.error ?? "Không vào được");
      sessionStorage.setItem("vnr_code", code.trim().toUpperCase());
      nav("/screen");
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      <PatrioticDecor />
      <div className="text-center flex flex-col items-center">
        <Emblem className="w-20 h-20 mb-4" />
        <div className="text-[#ffcd00] font-black text-xs mb-2 leading-relaxed">
          <div className="tracking-[0.15em]">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div className="tracking-[0.2em]">ĐỘC LẬP - TỰ DO - HẠNH PHÚC</div>
        </div>
        <h1 className="text-5xl md:text-6xl font-black leading-tight drop-shadow">
          VNR202 <span className="text-[#ffcd00]">CHALLENGE</span>
        </h1>
        <p className="text-white/75 mt-3 text-lg">
          Hành trình Thống nhất Việt Nam · Gameshow học tập
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 w-full max-w-3xl">
        {/* Nguoi choi */}
        <div className="card space-y-3">
          <h2 className="text-xl font-bold">Người chơi tham gia</h2>
          <input
            className="w-full px-4 py-3 rounded-lg bg-white/10 outline-none uppercase tracking-widest"
            placeholder="MÃ PHÒNG"
            maxLength={5}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <input
            className="w-full px-4 py-3 rounded-lg bg-white/10 outline-none"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && joinGame()}
          />
          <button className="btn-yellow w-full" onClick={joinGame}>
            Vào phòng
          </button>
        </div>

        {/* MC + Man hinh */}
        <div className="card space-y-3">
          <h2 className="text-xl font-bold">MC / Trình chiếu</h2>
          <button className="btn-red w-full" onClick={createGame}>
            Tạo trận đấu mới (MC)
          </button>
          <div className="text-center text-white/50 text-sm">— hoặc —</div>
          <button className="btn-ghost w-full" onClick={joinScreen}>
            Mở màn hình trình chiếu
          </button>
          <p className="text-xs text-white/50">
            Màn hình trình chiếu cần nhập mã phòng ở ô bên trái trước.
          </p>
        </div>
      </div>

      {error && <div className="text-red-300 bg-red-950/60 px-4 py-2 rounded-lg">{error}</div>}

      <Link to="/history" className="text-white/60 hover:text-[#ffcd00] text-sm underline">
        Xem lịch sử trận đấu & thống kê
      </Link>

      <UnityRibbon className="mt-2 text-sm" />
    </div>
  );
}
