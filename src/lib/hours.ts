export type Day = { label: string; short: string; open: number; close: number };

/* Índice 0 = domingo, como em Date.getDay(). Horas inteiras, 24 = meia-noite. */
export const WEEK: Day[] = [
  { label: "Domingo", short: "Dom", open: 8, close: 20 },
  { label: "Segunda", short: "Seg", open: 0, close: 24 },
  { label: "Terça", short: "Ter", open: 0, close: 24 },
  { label: "Quarta", short: "Qua", open: 0, close: 24 },
  { label: "Quinta", short: "Qui", open: 0, close: 24 },
  { label: "Sexta", short: "Sex", open: 0, close: 24 },
  { label: "Sábado", short: "Sáb", open: 0, close: 20 },
];

export const HOLIDAY: Day = { label: "Feriados", short: "Feriado", open: 8, close: 20 };

/* Ordem de exibição: a semana da academia começa na segunda. */
export const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Sao_Paulo",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function nowInUberlandia(ms: number) {
  const parts = formatter.formatToParts(new Date(ms));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function formatRange(day: Day) {
  if (day.open === 0 && day.close === 24) return "24 horas";
  return `${day.open}h às ${day.close}h`;
}

function when(target: number, today: number) {
  if (target === today) return "hoje";
  if (target === (today + 1) % 7) return "amanhã";
  return WEEK[target].label.toLowerCase();
}

function at(hour: number) {
  return hour === 0 || hour === 24 ? "à meia-noite" : `às ${hour}h`;
}

export type Status = {
  open: boolean;
  day: number;
  minutes: number;
  clock: string;
  headline: string;
  detail: string;
};

export function getStatus(ms: number): Status {
  const { day, minutes } = nowInUberlandia(ms);
  const today = WEEK[day];
  const open = minutes >= today.open * 60 && minutes < today.close * 60;
  const clock = `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, "0")}`;

  if (open) {
    /* De segunda a sábado os dias emendam: segue até achar um fechamento de verdade. */
    let d = day;
    for (let i = 0; i < 7 && WEEK[d].close === 24 && WEEK[(d + 1) % 7].open === 0; i++) {
      d = (d + 1) % 7;
    }
    return {
      open,
      day,
      minutes,
      clock,
      headline: "Aberta agora",
      detail: `Fecha ${when(d, day)} ${at(WEEK[d].close)}`,
    };
  }

  const opensToday = minutes < today.open * 60;
  const target = opensToday ? day : (day + 1) % 7;
  const hour = WEEK[target].open;
  return {
    open,
    day,
    minutes,
    clock,
    headline: "Fechada agora",
    detail: hour === 0 ? "Abre à meia-noite" : `Abre ${when(target, day)} ${at(hour)}`,
  };
}
