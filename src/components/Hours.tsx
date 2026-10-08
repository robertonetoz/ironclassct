"use client";

import type { CSSProperties } from "react";
import { useMinute } from "@/lib/hooks";
import { DISPLAY_ORDER, HOLIDAY, WEEK, formatRange, getStatus } from "@/lib/hours";
import type { Day } from "@/lib/hours";
import { OpenStatus } from "./OpenStatus";
import { Heading, Reveal } from "./Reveal";

const AXIS = [0, 6, 12, 18, 24];

function Row({
  day,
  order,
  now,
  clock,
}: {
  day: Day;
  order: number;
  now?: number;
  clock?: string;
}) {
  const today = now !== undefined;
  return (
    <div className="hrow" data-today={today} role="listitem">
      <span className="hday">
        <span className="sm:hidden">{day.short}</span>
        <span className="hidden sm:inline">{day.label}</span>
        {today && <span className="sr-only"> (hoje)</span>}
      </span>
      <span className="htrack" aria-hidden="true">
        <span
          className="hopen"
          style={
            {
              left: `${(day.open / 24) * 100}%`,
              width: `${((day.close - day.open) / 24) * 100}%`,
              "--n": order,
            } as CSSProperties
          }
        />
        {today && (
          <span
            className="hnow"
            data-edge={now < 220 ? "start" : now > 1220 ? "end" : "mid"}
            style={{ left: `${(now / 1440) * 100}%` }}
          >
            <span className="hnow-label">agora, {clock}</span>
          </span>
        )}
      </span>
      <span className="htext">{formatRange(day)}</span>
    </div>
  );
}

export function Hours() {
  const minute = useMinute();
  const status = minute === null ? null : getStatus(minute * 60_000);

  return (
    <section id="horarios" className="section section-piso" aria-labelledby="horarios-titulo">
      <div className="wrap">
        <Heading id="horarios-titulo" lines={["A luz", "não apaga."]} />

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <div>
            <OpenStatus size="big" />
            <p className="mt-8 max-w-[24rem] text-giz">
              Da meia-noite de segunda até as 20h de sábado a academia fica aberta
              sem intervalo. No domingo e nos feriados, das 8h às 20h.
            </p>
          </div>

          <Reveal className="hours">
            <div className="haxis" aria-hidden="true">
              {AXIS.map((hour) => (
                <span key={hour} style={{ left: `${(hour / 24) * 100}%` }}>
                  {hour}h
                </span>
              ))}
            </div>
            <div role="list">
              {DISPLAY_ORDER.map((index, order) => (
                <Row
                  key={index}
                  day={WEEK[index]}
                  order={order}
                  now={status?.day === index ? status.minutes : undefined}
                  clock={status?.clock}
                />
              ))}
              <div className="hsplit" aria-hidden="true" />
              <Row day={HOLIDAY} order={7} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
