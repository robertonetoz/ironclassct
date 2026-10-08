import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Imagem que aparece quando o link do site é compartilhado
   (WhatsApp, Instagram, Facebook). Gerada uma vez, no build. */

export const alt =
  "Iron Class Training Center: o seu treino em outro nível. Academia 24 horas em Uberlândia.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const anybody = await readFile(join(root, "assets/anybody-900.woff"));
const hanken = await readFile(join(root, "assets/hanken-grotesk-500.woff"));
const logoData = await readFile(join(root, "public/logo-iron-class.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

/* O mesmo teto de neon do hero, projetado à mão: o gerador de imagens
   não tem perspectiva 3D. X corre para os lados, Z para o fundo. */
const HORIZON = 318;
const FOCAL = 560;
const CEILING = 425;
const CENTER = size.width / 2;

function project(x: number, z: number) {
  return `${(CENTER + (FOCAL * x) / z).toFixed(1)} ${(HORIZON - CEILING / z).toFixed(1)}`;
}

function outline(points: [number, number][]) {
  return `M${points.map(([x, z]) => project(x, z)).join("L")}Z`;
}

function diamond(x: number, z: number, r: number) {
  return outline([
    [x, z - r],
    [x + r, z],
    [x, z + r],
    [x - r, z],
  ]);
}

function hexagon(x: number, z: number, w: number, d: number) {
  const inset = w * 0.45;
  return outline([
    [x - w, z],
    [x - inset, z - d],
    [x + inset, z - d],
    [x + w, z],
    [x + inset, z + d],
    [x - inset, z + d],
  ]);
}

type Tube = { d: string; red: boolean; depth: number };

const TUBES: Tube[] = [];
for (let row = 0; row < 7; row++) {
  const z = 1.75 + row;
  for (let col = -5; col <= 5; col++) {
    const red = (row + col) % 2 === 0;
    const d = red
      ? `${diamond(col, z, 0.38)}${diamond(col, z, 0.26)}`
      : `${hexagon(col, z, 0.4, 0.26)}M${project(col - 0.16, z)}L${project(col + 0.16, z)}`;
    TUBES.push({ d, red, depth: z });
  }
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fff",
          fontFamily: "Hanken Grotesk",
        }}
      >
        <svg
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          {TUBES.map((tube, index) => {
            const scale = 1.75 / tube.depth;
            const fade = Math.min(1, 1.5 * scale);
            const glow = tube.red ? "#ff1626" : "#ffffff";
            return (
              <g key={index} fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={fade}>
                <path d={tube.d} stroke={glow} strokeWidth={30 * scale} opacity={tube.red ? 0.14 : 0.08} />
                <path d={tube.d} stroke={glow} strokeWidth={12 * scale} opacity={tube.red ? 0.5 : 0.3} />
                <path d={tube.d} stroke={tube.red ? "#ffc4c8" : "#ffffff"} strokeWidth={4 * scale} />
              </g>
            );
          })}
        </svg>

        {/* Névoa vermelha no horizonte e escurecimento para o texto. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage: `radial-gradient(ellipse 620px 190px at 600px ${HORIZON}px, rgba(255,22,38,0.42), rgba(255,22,38,0) 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 250,
            width: "100%",
            height: 380,
            display: "flex",
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.92) 45%, #000 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 52,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Anybody",
                fontSize: 92,
                lineHeight: 0.92,
                textTransform: "uppercase",
              }}
            >
              <span>O seu treino</span>
              <span>em outro nível.</span>
            </div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 32, color: "#d6d6da" }}>
              Academia 24 horas no Alto Umuarama, em Uberlândia
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og só renderiza <img> */}
          <img src={logoSrc} width={236} height={236} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anybody", data: anybody, style: "normal", weight: 900 },
        { name: "Hanken Grotesk", data: hanken, style: "normal", weight: 500 },
      ],
    },
  );
}
