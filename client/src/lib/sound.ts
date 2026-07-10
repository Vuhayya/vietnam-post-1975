// Hieu ung am thanh tong hop bang Web Audio API - KHONG can file mp3.
import type { SoundName } from "@vnr/shared";

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (AC) ctx = new AC();
  }
  return ctx;
}

/** Danh thuc AudioContext sau tuong tac nguoi dung (autoplay policy). */
export function unlockAudio() {
  const c = ac();
  if (c && c.state === "suspended") c.resume();
}

type Note = { f: number; t: number; d: number; type?: OscillatorType; g?: number };

function play(notes: Note[]) {
  const c = ac();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const now = c.currentTime;
  for (const n of notes) {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = n.type ?? "sine";
    osc.frequency.value = n.f;
    const vol = n.g ?? 0.2;
    gain.gain.setValueAtTime(0.0001, now + n.t);
    gain.gain.exponentialRampToValueAtTime(vol, now + n.t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);
    osc.connect(gain).connect(c.destination);
    osc.start(now + n.t);
    osc.stop(now + n.t + n.d + 0.02);
  }
}

function noiseBurst(duration = 0.5, vol = 0.15) {
  const c = ac();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const frames = c.sampleRate * duration;
  const buffer = c.createBuffer(1, frames, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  const src = c.createBufferSource();
  const gain = c.createGain();
  gain.gain.value = vol;
  src.buffer = buffer;
  src.connect(gain).connect(c.destination);
  src.start();
}

const RECIPES: Record<SoundName, () => void> = {
  intro: () => play([
    { f: 523, t: 0, d: 0.15 }, { f: 659, t: 0.15, d: 0.15 },
    { f: 784, t: 0.3, d: 0.15 }, { f: 1047, t: 0.45, d: 0.4 },
  ]),
  countdown: () => play([{ f: 880, t: 0, d: 0.1, type: "square", g: 0.12 }]),
  tick: () => play([{ f: 1200, t: 0, d: 0.05, type: "square", g: 0.1 }]),
  correct: () => play([
    { f: 659, t: 0, d: 0.12 }, { f: 988, t: 0.12, d: 0.25 },
  ]),
  wrong: () => play([
    { f: 200, t: 0, d: 0.25, type: "sawtooth", g: 0.18 },
    { f: 150, t: 0.15, d: 0.3, type: "sawtooth", g: 0.18 },
  ]),
  reveal: () => play([
    { f: 523, t: 0, d: 0.15 }, { f: 659, t: 0.1, d: 0.15 }, { f: 784, t: 0.2, d: 0.3 },
  ]),
  buzz: () => play([{ f: 1400, t: 0, d: 0.15, type: "square", g: 0.18 }, { f: 1800, t: 0.08, d: 0.2, type: "square", g: 0.15 }]),
  victory: () => play([
    { f: 523, t: 0, d: 0.15 }, { f: 659, t: 0.15, d: 0.15 }, { f: 784, t: 0.3, d: 0.15 },
    { f: 1047, t: 0.45, d: 0.2 }, { f: 1319, t: 0.65, d: 0.4 },
  ]),
  applause: () => { noiseBurst(0.6, 0.12); setTimeout(() => noiseBurst(0.5, 0.1), 150); },
  suspense: () => play([
    { f: 110, t: 0, d: 0.4, type: "sawtooth", g: 0.12 },
    { f: 116, t: 0, d: 0.4, type: "sawtooth", g: 0.1 },
  ]),
};

// Mot so hieu ung dung file mp3 that thay vi tong hop (vd: tieng chuong bam that).
const SOUND_FILES: Partial<Record<SoundName, string>> = {
  buzz: "/music/bam_chuong.mp3",
};

export function playSound(name: SoundName) {
  try {
    const file = SOUND_FILES[name];
    if (file) {
      new Audio(file).play().catch(() => {});
      return;
    }
    RECIPES[name]?.();
  } catch {
    /* am thanh loi thi bo qua, khong lam vo game */
  }
}
