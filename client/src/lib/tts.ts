// AI doc cau hoi bang Web Speech API (mien phi, co san trong trinh duyet).
// Uu tien giong tieng Viet (vi-VN).

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

export const tts = {
  supported(): boolean {
    return typeof window !== "undefined" && !!window.speechSynthesis;
  },

  speak(text: string, onEnd?: () => void) {
    if (!this.supported() || !text) return;
    window.speechSynthesis.cancel(); // dung cau dang doc
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVietnameseVoice();
    if (v) u.voice = v;
    u.lang = v?.lang ?? "vi-VN";
    u.rate = 0.95; // doc cham lai chut cho ro
    u.pitch = 1;
    if (onEnd) u.onend = onEnd;
    window.speechSynthesis.speak(u);
  },

  stop() {
    if (this.supported()) window.speechSynthesis.cancel();
  },

  /** "Danh thuc" TTS sau tuong tac nguoi dung (chinh sach autoplay). */
  warmup() {
    if (!this.supported()) return;
    const u = new SpeechSynthesisUtterance("");
    window.speechSynthesis.speak(u);
    window.speechSynthesis.cancel();
    loadVoices();
  },
};
