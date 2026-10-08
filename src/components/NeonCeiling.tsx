import type { CSSProperties } from "react";

/* O teto da academia: losangos vermelhos e hexágonos brancos de neon,
   desenhados em planta. A perspectiva é aplicada por CSS (.ceiling / .floor). */

const COLS = 7;
const ROWS = 6;
const CELL = 400;
const WIDTH = COLS * CELL;
const HEIGHT = ROWS * CELL;

function diamond(cx: number, cy: number, r: number) {
  return `M${cx} ${cy - r}L${cx + r} ${cy}L${cx} ${cy + r}L${cx - r} ${cy}Z`;
}

function hexagon(cx: number, cy: number, w: number, h: number) {
  const inset = w * 0.45;
  return `M${cx - w} ${cy}L${cx - inset} ${cy - h}L${cx + inset} ${cy - h}L${cx + w} ${cy}L${cx + inset} ${cy + h}L${cx - inset} ${cy + h}Z`;
}

type Tube = { key: string; red: boolean; d: string; delay: number; buzz: boolean };

const TUBES: Tube[] = [];
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const cx = CELL / 2 + col * CELL;
    const cy = CELL / 2 + row * CELL;
    const red = (row + col) % 2 === 0;
    const d = red
      ? `${diamond(cx, cy, 150)}${diamond(cx, cy, 104)}`
      : `${hexagon(cx, cy, 158, 104)}M${cx - 62} ${cy}H${cx + 62}`;
    /* As luzes acendem da frente para o fundo, com um atraso irregular por tubo. */
    const delay = 0.25 + row * 0.2 + ((row * 7 + col * 13) % 5) * 0.06;
    const buzz = (row === 1 && col === 5) || (row === 3 && col === 2);
    TUBES.push({ key: `${row}-${col}`, red, d, delay, buzz });
  }
}

function Group({ red, reflection }: { red: boolean; reflection: boolean }) {
  return (
    <g className={red ? "tubes-red" : "tubes-white"}>
      {TUBES.filter((tube) => tube.red === red).map((tube) => (
        <g
          key={tube.key}
          className={reflection ? undefined : `tube${tube.buzz ? " tube-buzz" : ""}`}
          style={reflection ? undefined : ({ "--d": `${tube.delay}s` } as CSSProperties)}
        >
          {!reflection && <path d={tube.d} className="tube-glow" />}
          <path d={tube.d} className="tube-halo" />
          {!reflection && <path d={tube.d} className="tube-core" />}
        </g>
      ))}
    </g>
  );
}

export function NeonCeiling({ reflection = false }: { reflection?: boolean }) {
  return (
    <svg
      className="neon-plane"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* O reflexo no piso é o mesmo teto espelhado na vertical. */}
      <g transform={reflection ? `translate(0 ${HEIGHT}) scale(1 -1)` : undefined}>
        <Group red={false} reflection={reflection} />
        <Group red reflection={reflection} />
      </g>
    </svg>
  );
}
