import type { PublicObstacle } from "@vnr/shared";

/** O chu trong: 1 o vuong / ky tu, cach quang giua cac tu (dung khi chua mo dap an). */
function LetterBoxes({ length, small }: { length: number; small?: boolean }) {
  const size = small ? "w-6 h-6 text-sm" : "w-9 h-9 text-lg";
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={`${size} flex items-center justify-center rounded bg-white/10 border border-white/20 font-black`}
        >
          ?
        </div>
      ))}
    </div>
  );
}

/** Hien thi chuong ngai vat: buc anh che 4 goc + cac hang ngang goi y.
 *  compact = ban cho dien thoai nguoi choi (khong gian rong, chu nho hon). */
export default function Obstacle({
  data,
  activeRowId,
  compact,
}: {
  data: PublicObstacle;
  activeRowId?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`card grid gap-4 ${compact ? "!p-3" : "flex-1 md:grid-cols-2 md:gap-6"}`}
    >
      {/* Buc anh che 4 manh: neu co du 2 anh (truoc/sau) thi tach doi trai-phai
          de the hien su doi thay, khong thi dung 1 anh day nhu cu. */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
        {data.imageUrl && data.imageUrlAfter ? (
          <div className="absolute inset-0 grid grid-cols-2">
            <img src={data.imageUrl} className="w-full h-full object-cover" />
            <img src={data.imageUrlAfter} className="w-full h-full object-cover" />
          </div>
        ) : data.imageUrl ? (
          <img src={data.imageUrl} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/30 text-center px-4">
            (Đặt ảnh chướng ngại vật trong data)
          </div>
        )}
        {/* vach vang phan cach truoc/sau (ve duoi lop 4 manh che, chi lo dan khi cac
            manh xung quanh da mo, tranh lam lo truoc ranh gioi anh) */}
        {data.imageUrl && data.imageUrlAfter && (
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-[#ffcd00]" />
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
        {/* goi y trung tam (manh ghep thu 5) */}
        {data.centerHint.revealed && (
          <div className="absolute inset-x-4 bottom-4 bg-black/70 backdrop-blur rounded-lg px-3 py-2 text-sm text-center">
            {data.centerHint.clue}
          </div>
        )}
      </div>

      {/* Hang ngang + tu khoa */}
      <div className="flex flex-col gap-3">
        {data.rows.map((row, i) => (
          <div
            key={row.id}
            className={`px-4 py-3 rounded-lg border transition ${
              row.revealed
                ? "bg-green-600/30 border-green-400/50"
                : row.id === activeRowId
                ? "bg-[#ffcd00]/15 border-[#ffcd00] animate-pulse"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className="text-sm text-white/70 mb-1">
              Hàng {i + 1}
              {(row.revealed || row.id === activeRowId) && <>: {row.clue}</>}
            </div>
            {row.revealed ? (
              <div className="text-xl font-black text-[#ffcd00] tracking-wide">{row.answer}</div>
            ) : (
              <LetterBoxes length={row.answerLength} small />
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
          <div className="text-xs mb-2">CHƯỚNG NGẠI VẬT</div>
          {data.keywordRevealed ? (
            <div className="text-2xl font-black tracking-widest">{data.keyword}</div>
          ) : (
            <div className="flex justify-center">
              <LetterBoxes length={data.keywordLength} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
