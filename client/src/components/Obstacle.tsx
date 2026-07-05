import type { ObstaclePuzzle } from "@vnr/shared";

/** Hien thi chuong ngai vat: buc anh che 4 goc + cac hang ngang goi y. */
export default function Obstacle({ data }: { data: ObstaclePuzzle }) {
  return (
    <div className="card flex-1 grid md:grid-cols-2 gap-6">
      {/* Buc anh che 4 manh */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
        {data.imageUrl ? (
          <img src={data.imageUrl} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/30 text-center px-4">
            (Dat anh chuong ngai vat trong data)
          </div>
        )}
        {/* 4 manh che */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex items-center justify-center text-2xl font-black transition-all duration-500 ${
                data.cornersRevealed[i] ? "opacity-0" : "bg-[#da251d] opacity-100"
              }`}
            >
              {!data.cornersRevealed[i] && i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Hang ngang + tu khoa */}
      <div className="flex flex-col gap-3">
        {data.rows.map((row, i) => (
          <div
            key={row.id}
            className={`px-4 py-3 rounded-lg border ${
              row.revealed ? "bg-green-600/30 border-green-400/50" : "bg-white/5 border-white/10"
            }`}
          >
            <div className="text-sm text-white/70">
              Hang {i + 1}: {row.clue}
            </div>
            {row.revealed && (
              <div className="text-xl font-black text-[#ffcd00] tracking-wide">{row.answer}</div>
            )}
          </div>
        ))}
        <div
          className={`mt-2 px-4 py-4 rounded-xl text-center border-2 ${
            data.keywordRevealed
              ? "bg-[#ffcd00] text-red-950 border-yellow-300"
              : "border-dashed border-white/30 text-white/50"
          }`}
        >
          <div className="text-xs">CHUONG NGAI VAT</div>
          <div className="text-2xl font-black tracking-widest">
            {data.keywordRevealed ? data.keyword : "? ? ? ? ?"}
          </div>
        </div>
      </div>
    </div>
  );
}
