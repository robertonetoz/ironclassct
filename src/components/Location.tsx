import Image from "next/image";
import { DISPLAY_ORDER, HOLIDAY, WEEK, formatRange } from "@/lib/hours";
import { NAV, SITE } from "@/lib/site";
import { Heading } from "./Reveal";
import { IconInstagram, IconPin, IconTelefone, IconWhatsApp } from "./icons";

export function Location() {
  return (
    <section id="contato" className="section" aria-labelledby="contato-titulo">
      <div className="wrap">
        <Heading id="contato-titulo" lines={["Alto Umuarama,", "Uberlândia."]} />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="map">
            <iframe
              title="Mapa da Iron Class no Alto Umuarama, Uberlândia"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div>
            <ul className="contact">
              <li>
                <IconPin className="contact-icon" />
                <div>
                  <p className="text-xl font-bold leading-snug">{SITE.street}</p>
                  <p className="text-giz">
                    {SITE.district}, {SITE.city} ({SITE.state}), CEP {SITE.cep}
                  </p>
                </div>
              </li>
              <li>
                <IconWhatsApp className="contact-icon" />
                <div>
                  <a className="text-xl font-bold leading-snug hover:text-neon" href={SITE.whatsapp} target="_blank" rel="noopener">
                    {SITE.whatsappLabel}
                  </a>
                  <p className="text-giz">WhatsApp da academia</p>
                </div>
              </li>
              <li>
                <IconTelefone className="contact-icon" />
                <div>
                  <a className="text-xl font-bold leading-snug hover:text-neon" href={SITE.phoneHref}>
                    {SITE.phone}
                  </a>
                  <p className="text-giz">Telefone fixo</p>
                </div>
              </li>
              <li>
                <IconInstagram className="contact-icon" />
                <div>
                  <a className="text-xl font-bold leading-snug hover:text-neon" href={SITE.instagram} target="_blank" rel="noopener">
                    {SITE.handle}
                  </a>
                  <p className="text-giz">Dicas de treino e avisos</p>
                </div>
              </li>
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a className="btn btn-red" href={SITE.routeUrl} target="_blank" rel="noopener">
                Traçar rota até a academia
              </a>
              <a className="btn btn-line" href={SITE.whatsapp} target="_blank" rel="noopener">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[auto_1fr_1fr] md:gap-16">
        <div>
          <Image src="/logo-iron-class.png" alt="Iron Class Training Center" width={140} height={140} />
          <p className="mt-4 text-giz">Classe na essência.</p>
        </div>

        <div>
          <h2 className="footer-title">Horários</h2>
          <dl className="footer-hours">
            {DISPLAY_ORDER.map((index) => (
              <div key={index}>
                <dt>{WEEK[index].label}</dt>
                <dd>{formatRange(WEEK[index])}</dd>
              </div>
            ))}
            <div>
              <dt>{HOLIDAY.label}</dt>
              <dd>{formatRange(HOLIDAY)}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="footer-title">Neste site</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-giz">
            {SITE.street}
            <br />
            {SITE.district}, {SITE.city} ({SITE.state})
          </p>
        </div>
      </div>
      <div className="wrap border-t border-aco py-6 text-sm text-giz">
        © 2026 {SITE.fullName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
