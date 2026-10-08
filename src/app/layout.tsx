import type { Metadata, Viewport } from "next";
import { Anybody, Hanken_Grotesk } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

/* Anybody tem eixo de largura (50 a 150): é ele que deixa os títulos
   "encherem" quando entram na tela. */
const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Academia de musculação 24 horas no Alto Umuarama, em Uberlândia. Dois andares de aparelhos, instrutores no salão, planos mensal, trimestral, semestral e anual, e entrada com Wellhub (Gympass) ou TotalPass.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Iron Class CT | Academia 24h em Uberlândia",
  description,
  openGraph: {
    title: "Iron Class CT | Academia 24h em Uberlândia",
    description,
    url: "/",
    siteName: SITE.fullName,
    locale: "pt_BR",
    type: "website",
  },
  /* A imagem do link compartilhado vem de opengraph-image.tsx. */
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${anybody.variable} ${hanken.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
