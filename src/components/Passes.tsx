import { PLANS, SITE, whatsappLink } from "@/lib/site";
import { Heading } from "./Reveal";
import { IconWhatsApp } from "./icons";

const PASSES = [
  { name: "Wellhub", aka: "antigo Gympass", plan: "Basic+", text: "Aceito a partir do plano Basic+." },
  { name: "TotalPass", aka: null, plan: "TP1", text: "Aceito a partir do plano TP1." },
];

export function Passes() {
  return (
    <section id="planos" className="section" aria-labelledby="planos-titulo">
      <div className="wrap">
        <Heading id="planos-titulo" lines={["Com passe", "ou com plano."]} />

        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-[1.25fr_1fr]">
          <div className="plan">
            <h3 className="display plan-title">Plano Iron Class</h3>
            <p className="mt-5 max-w-[32rem] text-lg text-white/90">
              Matrícula direto com a academia, em quatro durações. Escolha uma e a
              equipe passa o valor pelo WhatsApp.
            </p>

            <ul className="plan-options">
              {PLANS.map((plan) => (
                <li key={plan.name}>
                  <a
                    className="plan-option"
                    href={whatsappLink(
                      `Olá! Vim pelo site da Iron Class e quero saber o valor do plano ${plan.name.toLowerCase()}.`,
                    )}
                    target="_blank"
                    rel="noopener"
                  >
                    <span className="display plan-option-months" aria-hidden="true">
                      {plan.months}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xl font-bold leading-tight">{plan.name}</span>
                      <span className="plan-option-note">
                        {plan.months === 1 ? "1 mês" : `${plan.months} meses`}, pedir valor
                      </span>
                    </span>
                    <IconWhatsApp className="plan-option-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-5">
            {PASSES.map((pass) => (
              <li key={pass.name} className="pass">
                <div className="pass-stub" aria-hidden="true">
                  <span className="display pass-plan">{pass.plan}</span>
                </div>
                <div className="pass-body">
                  <h3 className="text-2xl font-bold leading-tight">
                    {pass.name}
                    {pass.aka && <span className="font-normal text-giz"> ({pass.aka})</span>}
                  </h3>
                  <p className="mt-2 text-giz">{pass.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 max-w-[44rem] text-giz">
          É profissional da saúde ou do esporte? A academia aluga uma sala para
          atendimento.{" "}
          <a className="text-link" href={SITE.whatsapp} target="_blank" rel="noopener">
            Pergunte sobre a sala no WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
