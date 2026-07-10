// Nhac nen lap lai cho tung cau hoi (vd cau sap xep thu tu Vong 3), phat tren man hinh trinh chieu.
let el: HTMLAudioElement | null = null;
function getEl(): HTMLAudioElement {
  if (!el) {
    el = new Audio();
    el.loop = true;
    el.volume = 0.5;
  }
  return el;
}

export const bgMusic = {
  /** Phat lap lai file nhac (khong restart neu dang phat dung file nay roi). */
  play(url: string) {
    const e = getEl();
    const isSameTrack = e.src.endsWith(url);
    if (!isSameTrack) e.src = url;
    if (!isSameTrack || e.paused) e.play().catch((err) => console.warn("Không phát được nhạc nền:", err));
  },

  stop() {
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  },

  /** "Danh thuc" audio sau tuong tac nguoi dung dau tien (chinh sach autoplay). */
  warmup() {
    const e = getEl();
    e.muted = true;
    e.play().catch(() => {});
    e.pause();
    e.muted = false;
  },
};
