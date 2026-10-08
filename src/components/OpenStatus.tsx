"use client";

import { useMinute } from "@/lib/hooks";
import { getStatus } from "@/lib/hours";

/* Estado da academia agora, pelo relógio de Uberlândia. Antes de o navegador
   assumir, mostra o horário fixo para o HTML nunca mentir. */
export function OpenStatus({ size = "chip" }: { size?: "chip" | "big" }) {
  const minute = useMinute();
  const status = minute === null ? null : getStatus(minute * 60_000);

  const headline = status ? status.headline : "Seg a sex, 24 horas";
  const detail = status ? status.detail : "Sáb até 20h, dom 8h às 20h";
  const state = status ? (status.open ? "open" : "closed") : "idle";

  if (size === "big") {
    return (
      <div className="status-big" data-state={state} aria-live="polite">
        <p className="display status-big-headline">
          <span className="status-lamp" aria-hidden="true" />
          {headline}
        </p>
        <p className="mt-3 text-lg text-giz">
          {detail}
          {status ? `. Em Uberlândia são ${status.clock}.` : "."}
        </p>
      </div>
    );
  }

  return (
    <p className="status-chip" data-state={state}>
      <span className="status-lamp" aria-hidden="true" />
      <span>
        <strong className="block font-bold leading-tight">{headline}</strong>
        <span className="block text-sm leading-tight text-giz">{detail}</span>
      </span>
    </p>
  );
}
