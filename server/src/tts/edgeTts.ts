// Doc cau hoi bang giong Edge TTS (Microsoft Neural, mien phi qua Microsoft Edge Read Aloud API).
// Ket qua duoc cache theo (giong + noi dung) de "Doc lai" khong phai goi lai dich vu.
import { randomUUID } from "node:crypto";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

const DEFAULT_VOICE = process.env.TTS_VOICE || "vi-VN-HoaiMyNeural";
// Doc nhanh + nhan giong hon mac dinh cho co khong khi gay can nhu MC game show that.
const RATE = process.env.TTS_RATE || "+25%";
const PITCH = process.env.TTS_PITCH || "+5%";

const audioCache = new Map<string, Buffer>(); // id -> du lieu mp3
const idByKey = new Map<string, string>(); // "giong::toc do::cao do::noi dung" -> id (tranh tao lai)

async function generate(text: string, voice: string): Promise<Buffer> {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(text, { rate: RATE, pitch: PITCH });

  const chunks: Buffer[] = [];
  await new Promise<void>((resolve, reject) => {
    audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
    audioStream.on("end", () => resolve());
    audioStream.on("error", reject);
  });
  tts.close();

  return Buffer.concat(chunks);
}

/** Tra ve id de client tai qua GET /api/tts/:id.mp3 (tao moi neu chua co trong cache). */
export async function synthesize(text: string, voice: string = DEFAULT_VOICE): Promise<string> {
  const key = `${voice}::${RATE}::${PITCH}::${text}`;
  const cached = idByKey.get(key);
  if (cached) return cached;

  const buf = await generate(text, voice);
  const id = randomUUID();
  audioCache.set(id, buf);
  idByKey.set(key, id);
  return id;
}

export function getCachedAudio(id: string): Buffer | undefined {
  return audioCache.get(id);
}
