import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { socket } from "../socket";

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
      setError("Nhap ma phong va ten cua ban");
      return;
    }
    const playerId = localStorage.getItem("vnr_playerId") || undefined;
    socket.emit("player:join", { code: code.trim().toUpperCase(), name: name.trim(), playerId }, (res) => {
      if (!res.ok) return setError(res.error ?? "Khong vao duoc phong");
      localStorage.setItem("vnr_playerId", res.playerId!);
      sessionStorage.setItem("vnr_code", code.trim().toUpperCase());
      sessionStorage.setItem("vnr_name", name.trim());
      nav("/play");
    });
  };

  const joinScreen = () => {
    if (!code.trim()) return setError("Nhap ma phong");
    socket.emit("screen:join", { code: code.trim().toUpperCase() }, (res) => {
      if (!res.ok) return setError(res.error ?? "Khong vao duoc");
      sessionStorage.setItem("vnr_code", code.trim().toUpperCase());
      nav("/screen");
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center">
        <div className="text-[#ffcd00] font-black tracking-widest text-sm mb-2">VNR202</div>
        <h1 className="text-5xl md:text-6xl font-black leading-tight">
          VNR202 <span className="text-[#ffcd00]">CHALLENGE</span>
        </h1>
        <p className="text-white/70 mt-3">Hanh trinh Thong nhat Viet Nam - Gameshow hoc tap</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 w-full max-w-3xl">
        {/* Nguoi choi */}
        <div className="card space-y-3">
          <h2 className="text-xl font-bold">Nguoi choi tham gia</h2>
          <input
            className="w-full px-4 py-3 rounded-lg bg-white/10 outline-none uppercase tracking-widest"
            placeholder="MA PHONG"
            maxLength={5}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <input
            className="w-full px-4 py-3 rounded-lg bg-white/10 outline-none"
            placeholder="Ten cua ban"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && joinGame()}
          />
          <button className="btn-yellow w-full" onClick={joinGame}>
            Vao phong
          </button>
        </div>

        {/* MC + Man hinh */}
        <div className="card space-y-3">
          <h2 className="text-xl font-bold">MC / Trinh chieu</h2>
          <button className="btn-red w-full" onClick={createGame}>
            Tao tran dau moi (MC)
          </button>
          <div className="text-center text-white/50 text-sm">— hoac —</div>
          <button className="btn-ghost w-full" onClick={joinScreen}>
            Mo man hinh trinh chieu
          </button>
          <p className="text-xs text-white/50">
            Man hinh trinh chieu can nhap ma phong o o ben trai truoc.
          </p>
        </div>
      </div>

      {error && <div className="text-red-300 bg-red-950/60 px-4 py-2 rounded-lg">{error}</div>}

      <Link to="/history" className="text-white/60 hover:text-[#ffcd00] text-sm underline">
        Xem lich su tran dau & thong ke
      </Link>
    </div>
  );
}
