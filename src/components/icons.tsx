import type { ReactNode, SVGProps } from "react";
import type { FeatureIcon } from "@/lib/site";

type IconProps = SVGProps<SVGSVGElement>;

/* Ícones desenhados como tubos de neon: traço único, pontas redondas e
   pequenos intervalos onde o vidro "dobra". A cor vem de currentColor. */
function Tube({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const FEATURE_PATHS: Record<FeatureIcon, ReactNode> = {
  haltere: (
    <>
      <path d="M15 24h18" />
      <rect x="9" y="13" width="6" height="22" rx="2" />
      <rect x="33" y="13" width="6" height="22" rx="2" />
      <path d="M4.5 19v10M43.5 19v10" />
    </>
  ),
  setores: (
    <>
      <path d="M6 14V9h36v30H6V20" />
      <path d="M22 9v12M6 27h10M22 27h20M30 27v12" />
      <path d="M12.5 15.5h3M33 16.5h3M14 33.5h6" />
    </>
  ),
  andares: (
    <>
      <path d="M5 41h10V31h10V21h10V11h8" />
      <path d="M5 33V11h18" />
      <path d="M40 41h3" />
    </>
  ),
  apito: (
    <>
      <path d="M26.5 19.5H43v7h-12" />
      <circle cx="19" cy="28" r="11" />
      <circle cx="19" cy="28" r="3" />
      <path d="M15 12.5 12.5 7M20.5 11V5.5" />
    </>
  ),
  gota: (
    <>
      <path d="M24 5.5S11 19.5 11 29a13 13 0 0 0 26 0c0-5.5-4.4-12.6-8.3-17.8" />
      <path d="M17.5 30a6.5 6.5 0 0 0 6.5 6.5" />
    </>
  ),
  geladeira: (
    <>
      <rect x="12" y="5" width="24" height="38" rx="3" />
      <path d="M12 18h24M17.5 10v3.5M17.5 23v6" />
      <path d="m27.5 24-4 6.5h5l-3.5 6" />
    </>
  ),
  armario: (
    <>
      <path d="M9 43V7a2 2 0 0 1 2-2h26a2 2 0 0 1 2 2v36" />
      <path d="M24 5v38M6 43h36" />
      <path d="M14 11.5h5M14 15.5h5M29 11.5h5M29 15.5h5M19.5 25v4M28.5 25v4" />
    </>
  ),
  spray: (
    <>
      <path d="M13 43V27a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v16Z" />
      <path d="M18 22v-5h6v5M15 17V9h14l3 3.5h-5V17" />
      <path d="m36 7 5-2.5M37 12h6M36 17l5 2.5" />
    </>
  ),
  som: (
    <>
      <path d="M7 19h7l11-8.5v27L14 29H7Z" />
      <path d="M31.5 18.5a8 8 0 0 1 0 11" />
      <path d="M37 13.5a15 15 0 0 1 0 21" strokeOpacity={0.3} />
    </>
  ),
};

export function FeatureGlyph({ name, ...props }: IconProps & { name: FeatureIcon }) {
  return <Tube {...props}>{FEATURE_PATHS[name]}</Tube>;
}

export function IconFachada(props: IconProps) {
  return (
    <Tube {...props}>
      <path d="M6 19 10 7h28l4 12" />
      <path d="M6 19a4.5 4.5 0 0 0 9 0 4.5 4.5 0 0 0 9 0 4.5 4.5 0 0 0 9 0 4.5 4.5 0 0 0 9 0" />
      <path d="M9 27v15h30V27M20 42V31h8v11" />
    </Tube>
  );
}

export function IconMaquina(props: IconProps) {
  return (
    <Tube {...props}>
      <path d="M11 42V6h26v36M7 42h34" />
      <path d="M24 6v14M17 21h14M17 26h14M17 31h14M17 36h14" />
      <path d="M31 26h6" />
    </Tube>
  );
}

export function IconPin(props: IconProps) {
  return (
    <Tube {...props}>
      <path d="M24 43S10 29.5 10 19a14 14 0 0 1 28 0c0 4.6-2.7 9.8-5.8 14.2" />
      <circle cx="24" cy="19" r="5" />
    </Tube>
  );
}

export function IconTelefone(props: IconProps) {
  return (
    <Tube {...props}>
      <path d="M17.5 7h-7A2.5 2.5 0 0 0 8 9.8C9 27 21 39 38.200 40a2.500 2.500 0 0 0 2.800-2.500v-7l-9-3-3.500 4.500c-4.500-2.200-8.300-6-10.500-10.500L22.500 18Z" />
    </Tube>
  );
}

export function IconRelogio(props: IconProps) {
  return (
    <Tube {...props}>
      <path d="M24 6a18 18 0 1 1-12.700 5.300" />
      <path d="M24 13v11l7 4.500" />
    </Tube>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Tube {...props}>
      <rect x="7" y="7" width="34" height="34" rx="10" />
      <circle cx="24" cy="24" r="8" />
      <path d="M34.500 13.500h.010" strokeWidth={3.500} />
    </Tube>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <Tube {...props}>
      <path d="M24 6a18 18 0 0 0-15.400 27.300L6 42l9-2.500A18 18 0 1 0 24 6Z" />
      <path d="M18.500 16.500c-1.500 2.500-.500 7 3.500 11s8 5 10.500 3.500l.500-3-4-2-2 2c-2-1-4-3-5-5l2-2-2-4Z" />
    </Tube>
  );
}

export function IconFechar(props: IconProps) {
  return (
    <Tube {...props}>
      <path d="m12 12 24 24M36 12 12 36" />
    </Tube>
  );
}

export function IconSeta({ flip, ...props }: IconProps & { flip?: boolean }) {
  return (
    <Tube {...props} style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M10 24h28M28 14l10 10-10 10" />
    </Tube>
  );
}

export function Stars({ count, className = "" }: { count: number; className?: string }) {
  return (
    <span
      className={`inline-flex gap-1 ${className}`}
      role="img"
      aria-label={`${count} de 5 estrelas`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-[1.1em] w-[1.1em] ${i < count ? "fill-neon" : "fill-aco"}`}
          aria-hidden="true"
        >
          <path d="m12 2.500 2.900 6.300 6.900.800-5.100 4.700 1.400 6.800L12 17.700l-6.100 3.400 1.400-6.800L2.200 9.600l6.900-.800Z" />
        </svg>
      ))}
    </span>
  );
}
