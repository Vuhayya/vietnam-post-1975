import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHistory, type MatchRecord } from "../lib/api";

export default function History() {
  const [matches, setMatches] = useState<MatchRecord[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory()
      .then(setMatches)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">
          Lich su tran dau <span className="text-[#ffcd00]">& Thong ke</span>
        </h1>
        <Link to="/" className="btn-ghost">
          ← Trang chu
        </Link>
      </div>

      {error && (
        <div className="card text-red-300">
          {error}. Co the DB chua bat (mo Docker Desktop) hoac chua co tran nao ket thuc.
        </div>
      )}

      {!matches && !error && <div className="text-white/60">Dang tai...</div>}

      {matches && matches.length === 0 && (
        <div className="card text-white/60">
          Chua co tran nao duoc luu. Choi mot tran va bam "Ket thuc tran dau" de luu lich su.
        </div>
      )}

      {matches?.map((m) => (
        <div key={m.id} className="card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-bold">
                Phong {m.code}{" "}
                {m.winner && <span className="text-[#ffcd00]">· Vo dich: {m.winner}</span>}
              </div>
              <div className="text-xs text-white/50">
                {new Date(m.startedAt).toLocaleString("vi-VN")}
              </div>
            </div>
            <div className="text-sm text-white/60">{m.results.length} nguoi choi</div>
          </div>
          <div className="space-y-1">
            {m.results.slice(0, 10).map((r) => (
              <div key={r.id} className="flex items-center gap-3 text-sm">
                <span className="w-6 text-right font-black text-[#ffcd00]">{r.rank}</span>
                <span className="flex-1 truncate">{r.name}</span>
                <span className="font-bold">{r.score}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
