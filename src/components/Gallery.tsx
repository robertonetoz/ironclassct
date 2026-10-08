"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { GALLERY } from "@/lib/gallery";
import type { GalleryCategory, GalleryItem } from "@/lib/gallery";
import { Heading } from "./Reveal";
import { IconFachada, IconFechar, IconMaquina, IconSeta } from "./icons";

const FILTERS: { value: GalleryCategory | "tudo"; label: string }[] = [
  { value: "tudo", label: "Tudo" },
  { value: "fachada", label: "Fachada" },
  { value: "maquinas", label: "Máquinas" },
];

function Placeholder({ item }: { item: GalleryItem }) {
  const Icon = item.categoria === "fachada" ? IconFachada : IconMaquina;
  return (
    <div className="shot shot-empty">
      <span className="shot-corners" aria-hidden="true" />
      <Icon className="h-12 w-12 text-neon" />
      <p className="mt-4 font-bold">{item.legenda}</p>
      <p className="text-sm text-giz">Foto em breve</p>
    </div>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "tudo">("tudo");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const items = GALLERY.filter((item) => filter === "tudo" || item.categoria === filter);
  const photos = items.filter((item) => item.src);
  const current = active === null ? null : photos[active];

  function openPhoto(item: GalleryItem) {
    setActive(photos.indexOf(item));
    dialog.current?.showModal();
  }

  function step(delta: number) {
    setActive((index) =>
      index === null ? index : (index + delta + photos.length) % photos.length,
    );
  }

  return (
    <section id="galeria" className="section" aria-labelledby="galeria-titulo">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Heading id="galeria-titulo" lines={["Por dentro", "e por fora."]} />
          <div className="flex gap-2 lg:pb-3" role="group" aria-label="Filtrar fotos">
            {FILTERS.map((option) => (
              <button
                key={option.value}
                type="button"
                className="chip"
                aria-pressed={filter === option.value}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="shots mt-12 md:mt-16" data-filtered={filter !== "tudo"}>
          {items.map((item) => (
            <li key={item.id}>
              {item.src ? (
                <button type="button" className="shot shot-photo" onClick={() => openPhoto(item)}>
                  <Image
                    src={item.src}
                    alt={item.alt ?? item.legenda}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="shot-caption">{item.legenda}</span>
                </button>
              ) : (
                <Placeholder item={item} />
              )}
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Foto ampliada"
        onClose={() => setActive(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        {current?.src && (
          <figure className="lightbox-figure">
            <div className="relative min-h-0 flex-1">
              <Image
                src={current.src}
                alt={current.alt ?? current.legenda}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 pt-4">
              <span className="font-bold">{current.legenda}</span>
              <span className="flex gap-2">
                {photos.length > 1 && (
                  <>
                    <button type="button" className="icon-button" onClick={() => step(-1)}>
                      <span className="sr-only">Foto anterior</span>
                      <IconSeta flip className="h-6 w-6" />
                    </button>
                    <button type="button" className="icon-button" onClick={() => step(1)}>
                      <span className="sr-only">Próxima foto</span>
                      <IconSeta className="h-6 w-6" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => dialog.current?.close()}
                >
                  <span className="sr-only">Fechar foto</span>
                  <IconFechar className="h-6 w-6" />
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
