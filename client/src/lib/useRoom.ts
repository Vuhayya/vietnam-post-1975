import { useEffect, useState } from "react";
import type { RoomStateSnapshot, HostSecret } from "@vnr/shared";
import { socket } from "../socket";

/** Hook lang nghe trang thai phong tu server (dung chung cho Host/Player/Screen). */
export function useRoom() {
  const [state, setState] = useState<RoomStateSnapshot | null>(null);
  const [secret, setSecret] = useState<HostSecret | null>(null);
  const [timer, setTimer] = useState({ remaining: 0, duration: 0, running: false });
  const [toast, setToast] = useState<{ message: string; kind?: string } | null>(null);

  useEffect(() => {
    const onState = (s: RoomStateSnapshot) => setState(s);
    const onSecret = (s: HostSecret) => setSecret(s);
    const onTimer = (t: typeof timer) => setTimer(t);
    const onToast = (t: { message: string; kind?: string }) => {
      setToast(t);
      setTimeout(() => setToast(null), 2500);
    };
    socket.on("state", onState);
    socket.on("host:secret", onSecret);
    socket.on("timer", onTimer);
    socket.on("toast", onToast);
    return () => {
      socket.off("state", onState);
      socket.off("host:secret", onSecret);
      socket.off("timer", onTimer);
      socket.off("toast", onToast);
    };
  }, []);

  return { state, secret, timer, toast };
}

const PHASE_LABELS: Record<string, string> = {
  lobby: "Sanh cho",
  round1: "Vong 1 - Khoi dong",
  round2: "Vong 2 - Vuot chuong ngai vat",
  round3: "Vong 3 - Tang toc",
  round4: "Vong 4 - Ve dich",
  finished: "Ket thuc",
};

export function phaseLabel(phase: string) {
  return PHASE_LABELS[phase] ?? phase;
}
