// Hoa tiet nen mang tinh than yeu nuoc - doan ket dan toc:
//  - Ngoi sao vang 5 canh (theo Quoc ky) lam bieu tuong trung tam
//  - Tia hao quang (sunburst) toa ra tu ngoi sao nhu anh sang doc lap
//  - Dai sao nho lap lanh + quang sang vang o chan man (dat nuoc)
// Tat ca dat fixed + pointer-events-none nen khong anh huong thao tac.

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.94 6.26L20 9.27l-4.6 4.35L16.9 21 12 17.27 7.1 21l1.5-7.38L4 9.27l6.06-1.01L12 2z" />
    </svg>
  );
}

/** Huy hieu: ngoi sao vang tren nen do tron - dung o tieu de cac trang. */
export function Emblem({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#da251d] to-[#7f1d1d] ring-2 ring-[#ffcd00]/70 shadow-lg shadow-red-900/50 ${className}`}
    >
      <Star className="w-1/2 h-1/2 text-[#ffcd00] drop-shadow" />
    </span>
  );
}

/** Dai ruy-bang khau hieu doan ket dan toc - dung o chan cac trang. */
export function UnityRibbon({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[#ffcd00]/80 ${className}`}>
      <span className="hidden sm:block h-px w-10 bg-gradient-to-r from-transparent to-[#ffcd00]/50" />
      <Star className="w-4 h-4 shrink-0" />
      <span className="italic font-semibold tracking-wide text-center">
        Nước Việt Nam là một, dân tộc Việt Nam là một
      </span>
      <Star className="w-4 h-4 shrink-0" />
      <span className="hidden sm:block h-px w-10 bg-gradient-to-l from-transparent to-[#ffcd00]/50" />
    </div>
  );
}

export default function PatrioticDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Tia hao quang toa ra tu phia tren (anh sang doc lap - tu do) */}
      <div
        className="absolute left-1/2 -top-[420px] -translate-x-1/2 w-[1100px] h-[1100px] rounded-full opacity-[0.05]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, #ffcd00 0deg 4deg, transparent 4deg 13deg)",
        }}
      />

      {/* Ngoi sao lon mo phia tren nhu bieu tuong trung tam */}
      <Star className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 text-[#ffcd00]/[0.06]" />

      {/* Cac ngoi sao nho rai rac, mot vai ngoi lap lanh nhe */}
      <Star className="absolute top-24 left-5 w-8 h-8 text-[#ffcd00]/10 animate-pulse" />
      <Star className="absolute top-44 right-7 w-6 h-6 text-[#ffcd00]/[0.09]" />
      <Star className="absolute top-1/2 left-4 w-5 h-5 text-[#ffcd00]/[0.08]" />
      <Star className="absolute top-[38%] left-1/4 w-4 h-4 text-[#ffcd00]/[0.06] animate-pulse" />
      <Star className="absolute top-[30%] right-1/4 w-5 h-5 text-[#ffcd00]/[0.06]" />
      <Star className="absolute top-[60%] right-5 w-9 h-9 text-[#ffcd00]/[0.07] animate-pulse" />
      <Star className="absolute bottom-28 left-8 w-7 h-7 text-[#ffcd00]/10" />
      <Star className="absolute bottom-12 right-10 w-6 h-6 text-[#ffcd00]/[0.09] animate-pulse" />
      <Star className="absolute bottom-40 right-1/3 w-4 h-4 text-[#ffcd00]/[0.06]" />

      {/* Quang sang vang o chan man (bieu trung dat nuoc / binh minh) */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#ffcd00]/[0.06] via-[#ffcd00]/[0.02] to-transparent" />

      {/* Dai sang vang mo o hai canh cho do trong tren man rong */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#ffcd00]/[0.05] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#ffcd00]/[0.05] to-transparent" />
    </div>
  );
}
