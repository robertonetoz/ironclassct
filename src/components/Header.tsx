"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollSteps, useScrolledPast } from "@/lib/hooks";
import { NAV, SITE } from "@/lib/site";
import { IconFechar, IconWhatsApp } from "./icons";

const PLATES = [
  { height: 24, color: "#bf0304" },
  { height: 24, color: "#bf0304" },
  { height: 18, color: "#ffffff" },
  { height: 13, color: "#8c8c93" },
];

/* Progresso da página como uma barra sendo carregada: quanto mais você
   desce, mais anilhas entram. A barra vazia pesa 20 kg, cada par soma 40. */
function BarbellProgress() {
  const loaded = useScrollSteps(PLATES.length);

  return (
    <div className="barbell" aria-hidden="true">
      <svg viewBox="0 0 136 28" className="h-7 w-[8.5rem]">
        <path d="M2 14h132" stroke="#8c8c93" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="40" y="9" width="3" height="10" rx="1" fill="#d6d6da" />
        <rect x="93" y="9" width="3" height="10" rx="1" fill="#d6d6da" />
        {PLATES.map((plate, i) => (
          <g key={i} className="barbell-plate" data-on={i < loaded}>
            <rect
              className="barbell-left"
              x={33.5 - i * 6.5}
              y={14 - plate.height / 2}
              width="5"
              height={plate.height}
              rx="1.5"
              fill={plate.color}
            />
            <rect
              className="barbell-right"
              x={97.5 + i * 6.5}
              y={14 - plate.height / 2}
              width="5"
              height={plate.height}
              rx="1.5"
              fill={plate.color}
            />
          </g>
        ))}
      </svg>
      <span className="barbell-load">{20 + loaded * 40} kg</span>
    </div>
  );
}

export function Header() {
  const scrolled = useScrolledPast(24);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled || open}>
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center gap-6 px-5 md:h-[5.25rem] md:px-10">
        <a href="#topo" className="shrink-0" aria-label="Iron Class Training Center, início">
          <Image
            src="/logo-iron-class.png"
            alt=""
            width={72}
            height={72}
            priority
            className="h-14 w-14 md:h-[4.5rem] md:w-[4.5rem]"
          />
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex gap-7">
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4 md:gap-6">
          <div className="hidden xl:block">
            <BarbellProgress />
          </div>
          <a
            className="btn btn-red btn-small"
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener"
          >
            <IconWhatsApp className="h-5 w-5" />
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">Falar no WhatsApp</span>
          </a>
          <button
            type="button"
            className="menu-button lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            {open ? (
              <IconFechar className="h-7 w-7" />
            ) : (
              <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
                <path
                  d="M8 16h32M8 32h20"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div id="menu-mobile" className="mobile-menu lg:hidden" hidden={!open}>
        <nav aria-label="Seções">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  className="display mobile-menu-link"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-8 text-giz">
          {SITE.street}
          <br />
          {SITE.district}, {SITE.city}
        </p>
      </div>
    </header>
  );
}
