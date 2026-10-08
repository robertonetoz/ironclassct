"use client";

import { useSyncExternalStore } from "react";

function subscribeMinute(onChange: () => void) {
  const id = window.setInterval(onChange, 20_000);
  return () => window.clearInterval(id);
}

/* Minuto atual (epoch em minutos). É null no servidor e na hidratação,
   para o HTML pré-renderizado nunca depender do relógio. */
export function useMinute(): number | null {
  return useSyncExternalStore(
    subscribeMinute,
    () => Math.floor(Date.now() / 60_000),
    () => null,
  );
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

/* Progresso da página em degraus inteiros de 0 a `steps`. */
export function useScrollSteps(steps: number): number {
  return useSyncExternalStore(
    subscribeScroll,
    () => Math.round(scrollProgress() * steps),
    () => 0,
  );
}

export function useScrolledPast(px: number): boolean {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > px,
    () => false,
  );
}
