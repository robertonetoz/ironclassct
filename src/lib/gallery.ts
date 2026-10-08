export type GalleryCategory = "fachada" | "maquinas";

export type GalleryItem = {
  id: string;
  categoria: GalleryCategory;
  legenda: string;
  /* Caminho dentro de /public, por exemplo "/galeria/fachada-1.jpg".
     Enquanto estiver vazio, o site mostra o espaço reservado da foto. */
  src?: string;
  alt?: string;
};

/*
  Para publicar as fotos:
  1. Coloque os arquivos em public/galeria/
  2. Preencha "src" e "alt" do item correspondente (ou adicione novos itens).
  A grade se ajusta sozinha à quantidade de fotos.
*/
export const GALLERY: GalleryItem[] = [
  { id: "fachada-1", categoria: "fachada", legenda: "Fachada da academia" },
  { id: "maquinas-1", categoria: "maquinas", legenda: "Salão de musculação" },
  { id: "maquinas-2", categoria: "maquinas", legenda: "Máquinas de inferiores" },
  { id: "maquinas-3", categoria: "maquinas", legenda: "Máquinas de superiores" },
  { id: "fachada-2", categoria: "fachada", legenda: "Entrada" },
  { id: "maquinas-4", categoria: "maquinas", legenda: "Pesos livres" },
];
