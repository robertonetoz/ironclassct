import { SITE } from "@/lib/site";
import { Heading } from "./Reveal";
import { IconInstagram } from "./icons";

const POSTS = [
  { lines: ["Treino", "de glúteo", "completo"], kind: "Dica de treino" },
  { lines: ["Mesa", "flexora"], kind: "Execução na máquina" },
  { lines: ["Novidade", "na Iron"], kind: "Avisos da academia" },
];

export function InstagramBand() {
  return (
    <section className="section insta" aria-labelledby="instagram-titulo">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_minmax(0,34rem)] lg:items-center lg:gap-20">
        <div>
          <Heading id="instagram-titulo" lines={[SITE.handle]} max="9rem" lower />
          <p className="mt-8 max-w-[32rem] text-xl">
            Dicas de treino, execução dos exercícios e os avisos da academia saem
            primeiro no Instagram. Já são {SITE.followers} seguidores.
          </p>
          <a className="btn btn-black mt-8" href={SITE.instagram} target="_blank" rel="noopener">
            <IconInstagram className="h-6 w-6" />
            Seguir a Iron Class no Instagram
          </a>
        </div>

        <ul className="insta-posts" aria-label="O que você encontra no perfil">
          {POSTS.map((post) => (
            <li key={post.kind}>
              <a className="insta-post" href={SITE.instagram} target="_blank" rel="noopener">
                <span className="display insta-post-title">
                  {post.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
                <span className="insta-post-kind">{post.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
