// Hoa tiet nen mang tinh than yeu nuoc: ngoi sao vang 5 canh (theo Quoc ky),
// rai rac mo nhe phia sau noi dung -> lap khoang trong ma khong lam roi mat khi
// choi. Dat fixed + pointer-events-none nen khong anh huong thao tac.
function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.94 6.26L20 9.27l-4.6 4.35L16.9 21 12 17.27 7.1 21l1.5-7.38L4 9.27l6.06-1.01L12 2z" />
    </svg>
  );
}

export default function PatrioticDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Ngoi sao lon mo o phia tren, nhu bieu tuong trung tam */}
      <Star className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 text-[#ffcd00]/[0.04]" />

      {/* Cac ngoi sao nho rai rac, mot vai ngoi lap lanh nhe */}
      <Star className="absolute top-24 left-5 w-8 h-8 text-[#ffcd00]/10 animate-pulse" />
      <Star className="absolute top-44 right-7 w-6 h-6 text-[#ffcd00]/[0.09]" />
      <Star className="absolute top-1/2 left-4 w-5 h-5 text-[#ffcd00]/[0.08]" />
      <Star className="absolute top-[60%] right-5 w-9 h-9 text-[#ffcd00]/[0.07] animate-pulse" />
      <Star className="absolute bottom-28 left-8 w-7 h-7 text-[#ffcd00]/10" />
      <Star className="absolute bottom-12 right-10 w-6 h-6 text-[#ffcd00]/[0.09] animate-pulse" />

      {/* Dai sang vang mo o hai canh cho do trong tren man rong */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#ffcd00]/[0.05] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#ffcd00]/[0.05] to-transparent" />
    </div>
  );
}
