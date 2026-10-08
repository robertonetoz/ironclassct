"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { NeonCeiling } from "./NeonCeiling";
import { OpenStatus } from "./OpenStatus";
import { IconWhatsApp } from "./icons";

export function Hero() {
  const [dark, setDark] = useState(false);

  return (
    <section className="room" data-dark={dark} aria-labelledby="titulo">
      <div className="ceiling" aria-hidden="true">
        <NeonCeiling />
      </div>
      <div className="floor" aria-hidden="true">
        <NeonCeiling reflection />
      </div>
      <div className="horizon" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-end px-5 pb-8 pt-28 md:px-10 md:pb-12">
        <div className="fit-box">
          <h1 id="titulo" className="display fit hero-title">
            <span className="md:hidden">
              <span className="block whitespace-nowrap">O seu treino</span>
              <span className="block whitespace-nowrap">em outro</span>
              <span className="block whitespace-nowrap">nível.</span>
            </span>
            <span className="hidden md:block">
              <span className="block whitespace-nowrap">O seu treino</span>
              <span className="block whitespace-nowrap">em outro nível.</span>
            </span>
          </h1>
        </div>

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <div>
            <p className="max-w-[34rem] text-lg text-white/90 md:text-xl">
              Musculação 24 horas no Alto Umuarama, em Uberlândia. Dois andares de
              aparelhos, instrutores no salão e entrada com Wellhub (Gympass) ou
              TotalPass.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="btn btn-red" href={SITE.whatsapp} target="_blank" rel="noopener">
                <IconWhatsApp className="h-6 w-6" />
                Falar no WhatsApp
              </a>
              <a className="btn btn-line" href="#horarios">
                Ver horários
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-end">
            <OpenStatus />
            <button
              type="button"
              role="switch"
              aria-checked={dark}
              className="light-switch"
              onClick={() => setDark((value) => !value)}
            >
              <span className="light-switch-track" aria-hidden="true">
                <span className="light-switch-knob" />
              </span>
              Modo dark
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
