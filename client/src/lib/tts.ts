// AI doc cau hoi: uu tien phat file mp3 giong Edge TTS (server tao san, tu nhien nhu MC that).
// Du phong bang giong Web Speech API cua trinh duyet neu server khong tao duoc audio (vd mat mang).
import { SERVER_URL } from "./api";

let audioEl: HTMLAudioElement | null = null;
function getAudioEl(): HTMLAudioElement {
  if (!audioEl) {
    audioEl = new Audio();
    audioEl.preload = "auto";
  }
  return audioEl;
}

// --- du phong: giong may cua trinh duyet ---
let voices: SpeechSynthesisVoice[] = [];
function loadVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  voices = window.speechSynthesis.getVoices();
}
if (typeof window !== "undefined" && window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
function pickVietnameseVoice(): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) loadVoices();
  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith("vi")) ??
    voices.find((v) => v.lang?.toLowerCase().includes("vn"))
  );
}
function speakBrowser(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVietnameseVoice();
  if (v) u.voice = v;
  u.lang = v?.lang ?? "vi-VN";
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

export const tts = {
  /** Phat file mp3 do server tao (duong dan tuong doi, vd /api/tts/xyz.mp3). */
  playUrl(path: string) {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    const el = getAudioEl();
    el.src = `${SERVER_URL}${path}`;
    el.play().catch((err) => console.warn("Không phát được audio TTS:", err));
  },

  /** Du phong khi server khong tao duoc audio. */
  speak(text: string) {
    speakBrowser(text);
  },

  stop() {
    const el = getAudioEl();
    el.pause();
    el.currentTime = 0;
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
  },

  /** "Danh thuc" audio sau tuong tac nguoi dung dau tien (chinh sach autoplay). */
  warmup() {
    const el = getAudioEl();
    el.muted = true;
    el.play().catch(() => {});
    el.pause();
    el.muted = false;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(u);
      window.speechSynthesis.cancel();
    }
    loadVoices();
  },
};
