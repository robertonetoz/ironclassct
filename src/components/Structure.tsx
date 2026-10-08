import { FEATURES } from "@/lib/site";
import { Heading, Reveal } from "./Reveal";
import { FeatureGlyph } from "./icons";

export function Structure() {
  return (
    <section id="estrutura" className="section" aria-labelledby="estrutura-titulo">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
          <Heading id="estrutura-titulo" lines={["Dois andares", "de treino."]} />
          <p className="text-lg text-giz lg:pb-3">
            Tudo o que está nesta lista foi dito por quem treina aqui. São os pontos
            que mais aparecem nas avaliações da academia no Google.
          </p>
        </div>

        <ul className="mt-14 md:mt-20">
          {FEATURES.map((feature) => (
            <Reveal as="li" key={feature.title} className="feat">
              <FeatureGlyph name={feature.icon} className="feat-icon" />
              <h3 className="display feat-title">{feature.title}</h3>
              <p className="feat-text">{feature.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
