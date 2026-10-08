import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Hours } from "@/components/Hours";
import { InstagramBand } from "@/components/InstagramBand";
import { Footer, Location } from "@/components/Location";
import { Passes } from "@/components/Passes";
import { Reviews } from "@/components/Reviews";
import { Structure } from "@/components/Structure";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: SITE.fullName,
  alternateName: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/logo-iron-class.png`,
  telephone: "+55 34 3229-2489",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    addressLocality: SITE.city,
    addressRegion: SITE.state,
    postalCode: SITE.cep,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "00:00",
      closes: "23:59",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "00:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "08:00", closes: "20:00" },
  ],
  sameAs: [SITE.instagram],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#estrutura">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="topo">
        <Hero />
        <Structure />
        <Hours />
        <Gallery />
        <Reviews />
        <Passes />
        <InstagramBand />
        <Location />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
