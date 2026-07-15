import type { PublicObstacle } from "@vnr/shared";

type BoxSize = "xs" | "sm" | "md";

const BOX_CLASS: Record<BoxSize, string> = {
  xs: "w-5 h-5 text-[10px]",
  sm: "w-6 h-6 text-sm",
  md: "w-9 h-9 text-lg",
};

/** O chu trong: 1 o vuong / ky tu, cach quang giua cac tu (dung khi chua mo dap an). */
function LetterBoxes({ length, size = "md" }: { length: number; size?: BoxSize }) {
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={`${BOX_CLASS[size]} flex items-center justify-center rounded bg-white/10 border border-white/20 font-black`}
        >
          ?
        </div>
      ))}
    </div>
  );
}

/** Hien thi chuong ngai vat: buc anh che 4 goc + cac hang ngang goi y.
 *  compact = ban cho dien thoai nguoi choi: anh mot ben, o chu mot ben cho do dai;
 *  clue cua hang dang hoi da nam o the cau hoi ngay duoi nen o day khong lap lai. */
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
      className={`card grid ${
        compact ? "grid-cols-5 gap-3 !p-3" : "flex-1 gap-4 md:grid-cols-2 md:gap-6"
      }`}
    >
      {/* Cot anh. Ban compact: goi y trung tam nam DUOI anh (khong de len anh nhu ban
          man hinh lon) - anh chi rong ~1/3 dien thoai nen overlay se che kin ca buc anh. */}
      <div className={compact ? "col-span-2 self-start flex flex-col gap-2" : ""}>
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
              className={`flex items-center justify-center font-black transition-all duration-500 ${
                compact ? "text-lg" : "text-2xl"
              } ${data.cornersRevealed[i] ? "opacity-0" : "bg-[#da251d] opacity-100"}`}
            >
              {!data.cornersRevealed[i] && i + 1}
            </div>
          ))}
        </div>
        {/* goi y trung tam (manh ghep thu 5) - ban man hinh lon: de len anh */}
        {!compact && data.centerHint.revealed && (
          <div className="absolute inset-x-4 bottom-4 bg-black/70 backdrop-blur rounded-lg px-3 py-2 text-sm text-center">
            {data.centerHint.clue}
          </div>
        )}
      </div>

      {/* ban compact: goi y trung tam nam duoi anh, tan dung cho trong cua cot trai */}
      {compact && data.centerHint.revealed && (
        <div className="rounded-lg bg-white/10 border border-white/15 px-2 py-1.5 text-[10px] leading-snug">
          <span className="text-[#ffcd00] font-bold">Gợi ý: </span>
          {data.centerHint.clue}
        </div>
      )}
      </div>

      {/* Hang ngang + tu khoa */}
      <div className={`flex flex-col ${compact ? "col-span-3 gap-1.5" : "gap-3"}`}>
        {data.rows.map((row, i) => (
          <div
            key={row.id}
            className={`rounded-lg border transition ${compact ? "px-2 py-1.5" : "px-4 py-3"} ${
              row.revealed
                ? "bg-green-600/30 border-green-400/50"
                : row.id === activeRowId
                ? "bg-[#ffcd00]/15 border-[#ffcd00] animate-pulse"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div className={`text-white/70 mb-1 ${compact ? "text-[11px]" : "text-sm"}`}>
              Hàng {i + 1}
              {/* Ban compact: clue da hien o the cau hoi phia duoi, khong lap lai cho dai trang */}
              {!compact && (row.revealed || row.id === activeRowId) && <>: {row.clue}</>}
            </div>
            {row.revealed ? (
              <div
                className={`font-black text-[#ffcd00] tracking-wide ${
                  compact ? "text-sm" : "text-xl"
                }`}
              >
                {row.answer}
              </div>
            ) : (
              <LetterBoxes length={row.answerLength} size={compact ? "xs" : "sm"} />
            )}
          </div>
        ))}
        <div
          className={`rounded-xl text-center border-2 ${
            compact ? "mt-1 px-2 py-2" : "mt-2 px-4 py-4"
          } ${
            data.keywordRevealed
              ? "bg-[#ffcd00] text-red-950 border-yellow-300"
              : "border-dashed border-white/30 text-white/50"
          }`}
        >
          <div className={`mb-1.5 ${compact ? "text-[10px]" : "text-xs mb-2"}`}>
            CHƯỚNG NGẠI VẬT
          </div>
          {data.keywordRevealed ? (
            <div
              className={`font-black tracking-widest ${compact ? "text-lg" : "text-2xl"}`}
            >
              {data.keyword}
            </div>
          ) : (
            <div className="flex justify-center">
              <LetterBoxes length={data.keywordLength} size={compact ? "sm" : "md"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
