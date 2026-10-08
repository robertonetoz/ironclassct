"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { REVIEWS, SITE } from "@/lib/site";
import { Heading } from "./Reveal";
import { Stars } from "./icons";

/* As avaliações ficam numa pilha de pesos: cada placa é uma pessoa e o pino
   escolhe qual depoimento aparece. Ao trocar, a pilha faz uma repetição. */
export function Reviews() {
  const [selected, setSelected] = useState(0);
  const [rep, setRep] = useState(0);
  const review = REVIEWS[selected];

  function select(index: number) {
    if (index === selected) return;
    setSelected(index);
    setRep((count) => count + 1);
  }

  const lift = rep === 0 ? undefined : rep % 2 ? "rep-a" : "rep-b";

  return (
    <section id="avaliacoes" className="section section-piso" aria-labelledby="avaliacoes-titulo">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
          <Heading id="avaliacoes-titulo" lines={["Nota 4,8", "no Google."]} />
          <div className="lg:pb-3">
            <p className="text-lg text-giz">
              São {SITE.reviewCount} avaliações de alunos. Mova o pino na pilha para
              ler o que alguns deles escreveram.
            </p>
            <a className="text-link mt-4 inline-block" href={SITE.mapsUrl} target="_blank" rel="noopener">
              Ver todas as avaliações no Google
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-12 md:mt-20 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-24">
          <div className="stack" style={{ "--i": selected } as CSSProperties}>
            <span className="stack-cable" aria-hidden="true" />
            <span className="stack-pin" aria-hidden="true" style={{ animationName: lift }} />
            <ul>
              {REVIEWS.map((item, index) => (
                <li key={item.name}>
                  <button
                    type="button"
                    className="stack-plate"
                    aria-pressed={index === selected}
                    style={{ animationName: index <= selected ? lift : undefined }}
                    onClick={() => select(index)}
                  >
                    <span className="truncate">{item.name}</span>
                    <span className="stack-plate-stars" aria-hidden="true">
                      {item.stars}
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                        <path d="m12 2.5 2.9 6.3 6.9.8-5.1 4.700 1.400 6.800L12 17.700l-6.100 3.400 1.400-6.800L2.200 9.600l6.900-.800Z" />
                      </svg>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <figure className="quote" key={selected} aria-live="polite">
            <Stars count={review.stars} className="text-2xl" />
            <blockquote className="quote-text">{review.text}</blockquote>
            <figcaption className="mt-8">
              <span className="block text-lg font-bold">{review.name}</span>
              <span className="block text-giz">Avaliação publicada no Google</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
