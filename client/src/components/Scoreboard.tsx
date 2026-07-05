import type { Player } from "@vnr/shared";

export default function Scoreboard({
  players,
  highlightFinal = false,
  compact = false,
}: {
  players: Player[];
  highlightFinal?: boolean;
  compact?: boolean;
}) {
  const top = compact ? players : players.slice(0, 10);
  return (
    <div className="card">
      <div className="font-bold text-[#ffcd00] mb-3">BANG XEP HANG</div>
      <div className="space-y-2">
        {top.map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              highlightFinal && p.inFinalFive
                ? "bg-[#ffcd00]/20 border border-[#ffcd00]/50"
                : "bg-white/5"
            }`}
          >
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full font-black text-sm ${
                i === 0
                  ? "bg-[#ffcd00] text-red-950"
                  : i === 1
                  ? "bg-gray-300 text-gray-800"
                  : i === 2
                  ? "bg-orange-400 text-orange-950"
                  : "bg-white/10"
              }`}
            >
              {i + 1}
            </div>
            <div className="flex-1 truncate font-medium">
              {p.name}
              {!p.connected && <span className="text-red-400 text-xs ml-2">(mat ket noi)</span>}
            </div>
            <div className="font-black text-lg">{p.score}</div>
          </div>
        ))}
        {top.length === 0 && <div className="text-white/40 text-sm">Chua co nguoi choi</div>}
      </div>
    </div>
  );
}
