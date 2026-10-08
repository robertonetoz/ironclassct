"use client";

import { Fragment, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  as?: "div" | "li" | "h1" | "h2" | "h3";
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
};

/* Marca o elemento com data-in="true" na primeira vez que ele entra na tela.
   Toda a animação fica no CSS; sem JS o conteúdo continua legível. */
export function Reveal({ as = "div", children, ...rest }: RevealProps) {
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-in="false" {...rest}>
      {children}
    </Tag>
  );
}

type HeadingProps = {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  max?: string;
  lower?: boolean;
  id?: string;
};

/* Título em linhas fixas: o corpo é calculado para a linha mais longa caber
   na coluna (.fit-box é o contêiner), então a animação de largura da fonte
   nunca quebra linha nem estoura a tela. */
export function Heading({ lines, as = "h2", max = "7.25rem", lower = false, id }: HeadingProps) {
  const chars = Math.max(...lines.map((line) => line.length));
  return (
    <div className="fit-box">
      <Reveal
        as={as}
        id={id}
        className={`display pump fit${lower ? " normal-case" : ""}`}
        style={{ "--chars": chars, "--max": max } as CSSProperties}
      >
        {lines.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            {/* A vírgula decimal da fonte abre um vão grande demais entre algarismos. */}
            {line.split(/(?<=\d),(?=\d)/).map((part, index) => (
              <Fragment key={index}>
                {index > 0 && <span className="decimal-comma">,</span>}
                {part}
              </Fragment>
            ))}
          </span>
        ))}
      </Reveal>
    </div>
  );
}
