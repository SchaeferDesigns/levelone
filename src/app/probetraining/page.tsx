import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section, { SectionHeader } from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import Accordion from "@/components/Accordion";
import { Steps } from "@/components/blocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kostenloses Probetraining",
  description:
    "Trainiere kostenlos und unverbindlich zur Probe im Level One Göggingen. Rundgang, Zielgespräch und erstes Training inklusive. Jetzt Termin anfragen.",
  alternates: { canonical: "/probetraining/" },
};

const faq = [
  {
    q: "Was kostet das Probetraining?",
    a: "Gar nichts. Es ist kostenlos und du gehst keine Verpflichtung ein.",
  },
  {
    q: "Wie lange dauert der Termin?",
    a: "Plane rund eine Stunde ein. Davon entfallen etwa zehn Minuten auf den Rundgang und das Gespräch, der Rest ist Training.",
  },
  {
    q: "Was muss ich mitbringen?",
    a: "Sportkleidung, saubere Hallenschuhe, ein Handtuch und etwas zu trinken. Mehr brauchst du nicht.",
  },
  {
    q: "Kann ich jemanden mitbringen?",
    a: "Ja. Zu zweit fällt der erste Schritt vielen leichter. Sag uns einfach vorher Bescheid, damit wir genug Zeit einplanen.",
  },
];

export default function ProbetrainingPage() {
  return (
    <>
      <section className="relative pt-[124px] pb-4 sm:pt-[146px]">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="lg:sticky lg:top-[110px]">
              <Reveal>
                <span className="eyebrow">Probetraining</span>
                <h1 className="display-lg mt-5">
                  Kostenlos testen, <span className="flame-text">ohne Haken</span>
                </h1>
                <p className="lead mt-6 max-w-[54ch]">
                  Ein Termin, ein Rundgang, ein Training. Du siehst das Studio, lernst uns kennen und
                  entscheidest danach in Ruhe. Kein Vertrag, keine Verpflichtung, keine versteckten
                  Kosten.
                </p>
              </Reveal>

              <Reveal delay={120} className="mt-9">
                <ul className="flex flex-col gap-3.5">
                  {[
                    "Kostenlos und unverbindlich",
                    "Persönlicher Rundgang durch alle Bereiche",
                    "Einweisung an den Geräten",
                    "Erste Einschätzung zu deinem Ziel",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[16px] font-semibold">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                        <Icon name="check" size={14} strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={200} className="mt-9">
                <div className="glass rounded-[20px] p-6">
                  <p className="text-[14px] font-bold uppercase tracking-[0.14em] text-faint">
                    Lieber direkt sprechen
                  </p>
                  <a
                    href={`tel:${site.contact.phone}`}
                    className="mt-3 flex items-center gap-3 text-[22px] font-black tracking-tight"
                  >
                    <Icon name="phone" size={22} className="text-flame-400" />
                    {site.contact.phoneDisplay}
                  </a>
                  <p className="mt-3 text-[14.5px] text-mute">
                    Erreichbar Mo bis Fr 09:00 bis 22:00 Uhr sowie Sa und So 10:00 bis 14:00 Uhr.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <h2 className="sr-only">Formular für die Anfrage zum Probetraining</h2>
              <ContactForm variant="probetraining" />
            </Reveal>
          </div>
        </div>
      </section>

      <Section className="glow glow-left">
        <SectionHeader
          eyebrow="Ablauf"
          title="Das passiert beim Probetraining"
          text="Damit du genau weißt, worauf du dich einlässt."
          align="center"
        />
        <div className="mt-12">
          <Steps
            items={[
              {
                icon: "users",
                title: "Ankommen und Rundgang",
                text: "Wir zeigen dir Umkleiden, Trainingsfläche, Kursbereich und Wellness. Fragen sind ausdrücklich erwünscht.",
              },
              {
                icon: "target",
                title: "Ziel und Ausgangslage",
                text: "Kurzes Gespräch über dein Ziel, deine Zeit und eventuelle Einschränkungen. Daraus ergibt sich dein Einstieg.",
              },
              {
                icon: "dumbbell",
                title: "Erstes Training",
                text: "Du trainierst direkt mit, mit Anleitung an den Geräten und in einem Tempo, das zu dir passt.",
              },
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader eyebrow="Fragen" title="Vor deinem ersten Besuch" />
          <Accordion items={faq} />
        </div>
      </Section>
    </>
  );
}
