const MAPS_QUERY = encodeURIComponent(
  "Iron Class Academia 24h - Uberlândia, Av. Dr. Vicente Salles Guimarães, 2415",
);

/* Link do WhatsApp da academia com a mensagem já escrita. */
export function whatsappLink(text: string) {
  return `https://wa.me/5534997260225?text=${encodeURIComponent(text)}`;
}

/* Planos divulgados pela academia. Os valores são passados pelo WhatsApp. */
export const PLANS = [
  { name: "Mensal", months: 1 },
  { name: "Trimestral", months: 3 },
  { name: "Semestral", months: 6 },
  { name: "Anual", months: 12 },
] as const;

export const SITE = {
  name: "Iron Class CT",
  fullName: "Iron Class Training Center",
  tagline: "O seu treino em outro nível.",
  url: "https://ironclassct.vercel.app",
  whatsapp: whatsappLink("Olá! Vim pelo site da Iron Class e quero saber mais sobre os planos."),
  whatsappLabel: "(34) 99726-0225",
  phone: "(34) 3229-2489",
  phoneHref: "tel:+553432292489",
  instagram: "https://www.instagram.com/ironclass_ct/",
  handle: "@ironclass_ct",
  followers: "17,4 mil",
  street: "Av. Dr. Vicente Salles Guimarães, 2415",
  district: "Alto Umuarama",
  city: "Uberlândia",
  state: "MG",
  cep: "38405-386",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
  routeUrl: `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`,
  mapEmbed: `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`,
  rating: "4,8",
  reviewCount: 215,
} as const;

export const NAV = [
  { label: "Estrutura", href: "#estrutura" },
  { label: "Horários", href: "#horarios" },
  { label: "Galeria", href: "#galeria" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Planos", href: "#planos" },
  { label: "Contato", href: "#contato" },
] as const;

export type FeatureIcon =
  | "haltere"
  | "setores"
  | "andares"
  | "apito"
  | "gota"
  | "geladeira"
  | "armario"
  | "spray"
  | "som";

export const FEATURES: { icon: FeatureIcon; title: string; text: string }[] = [
  {
    icon: "haltere",
    title: "Aparelhos modernos e variados",
    text: "Várias máquinas para o mesmo grupo muscular, para variar o estímulo sem improvisar.",
  },
  {
    icon: "setores",
    title: "Salão organizado por setores",
    text: "Cada grupo muscular tem a sua área. Você monta o treino sem atravessar a academia.",
  },
  {
    icon: "andares",
    title: "Dois andares de espaço",
    text: "Dá para treinar com calma mesmo nos horários mais cheios.",
  },
  {
    icon: "apito",
    title: "Instrutores preparados",
    text: "Equipe atenciosa no salão para ajustar a execução e tirar dúvidas.",
  },
  {
    icon: "gota",
    title: "Água de poço artesiano",
    text: "A água da academia vem de poço artesiano.",
  },
  {
    icon: "geladeira",
    title: "Geladeira com água e energético",
    text: "Esqueceu a garrafinha? Tem bebida gelada aqui mesmo.",
  },
  {
    icon: "armario",
    title: "Vestiário espaçoso",
    text: "Banheiros limpos e espaço para se trocar sem aperto.",
  },
  {
    icon: "spray",
    title: "Lenços e álcool à mão",
    text: "Nos dois andares, para limpar o aparelho antes e depois de usar.",
  },
  {
    icon: "som",
    title: "Música no volume certo",
    text: "Dá para conversar ou ouvir a sua própria playlist no fone.",
  },
];

export type Review = { name: string; stars: number; text: string };

/* Avaliações públicas do perfil da academia no Google. */
export const REVIEWS: Review[] = [
  {
    name: "Ana Paula Ribeiro",
    stars: 5,
    text: "Estrutura impecável! Espaço amplo, aparelhos modernos e diversificados. Desde que o Alan Prais assumiu a coordenação, a diferença é nítida: tudo mais organizado por setores de treino, ambiente sempre limpo e rotina funcionando bem. A academia funciona 24 horas e um detalhe que faz toda diferença: a água é de poço artesiano, qualidade diferenciada! Recomendo demais a academia. Vale cada treino.",
  },
  {
    name: "Jade Guimarães",
    stars: 5,
    text: "Academia completa e bem equipada, mesmo em horários mais cheios, tem espaço para todo mundo treinar tranquilo. Banheiros limpos, vestiário espaçoso. Funcionários extremamente simpáticos e educados. O preço das mensalidades é super justo e o mais importante: a música fica dentro de um volume moderado, a gente consegue conversar tranquilo e ouvir nossa própria música sem problemas. Super recomendo!",
  },
  {
    name: "Junior Adalcindo",
    stars: 4,
    text: "Realmente em Uberlândia essa é a melhor academia que já treinei, vários tipos diferentes de aparelhos que fazem termos uma excelente opção para fazer variações do mesmo grupo muscular. Além do que é 24h de segunda à sexta-feira, no sábado e domingo é até às 20h.",
  },
  {
    name: "Aquiles Maior",
    stars: 5,
    text: "Academia está perfeita, muita variedade de equipamentos deixando o treino completo. Sempre tem lenços descartáveis e álcool pra higienização nos dois andares. Funcionários atenciosos e música boa em todo momento. Iron ta tooop d+ parabéns!!!!",
  },
  {
    name: "Amandita H",
    stars: 5,
    text: "Melhor academia q já frequentei, os instrutores são extremamente preparados e solícitos, a cada dia a academia se torna melhor com a gestão do coordenador.",
  },
  {
    name: "Priscila Santos",
    stars: 5,
    text: "Gosto muito dessa academia! Ambiente amplo, aparelhos modernos e novos! Tem geladeira com energético, água! Isso é mto bom, pq sempre esqueço minha garrafinha!",
  },
  {
    name: "Alecsander Ruan Campos Rodrigues",
    stars: 5,
    text: "Eu sou um aluno super satisfeito com a Iron Class Academia! A academia é equipada com aparelhos modernos e de alta qualidade, o que torna os treinos mais eficazes e agradáveis. Além disso, a academia funciona 24h, o que é incrível! Eu posso treinar a qualquer hora do dia ou da noite, o que é perfeito para a minha rotina. Os funcionários são sempre atenciosos e disponíveis para ajudar.",
  },
  {
    name: "Eder Carvalho",
    stars: 5,
    text: "Estou na academia desde Janeiro e estou muito satisfeito. Academia atende a todos os anseios de um cliente.",
  },
];
