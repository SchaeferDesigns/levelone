import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section, { SectionHeader } from "@/components/Section";
import Cta from "@/components/Cta";
import Accordion from "@/components/Accordion";
import { CtaBand, NoticeCard, PageHero, Steps } from "@/components/blocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mitgliedschaft",
  description:
    "Mitglied werden im Level One Göggingen. Zutritt rund um die Uhr, alle Trainingsbereiche, Einweisung und Trainingsplan inklusive. Tarife im persönlichen Gespräch.",
  alternates: { canonical: "/mitgliedschaft/" },
};

const included = [
  { icon: "key" as const, t: "Zutritt rund um die Uhr", d: "An sieben Tagen die Woche, auch an Feiertagen." },
  { icon: "dumbbell" as const, t: "Alle Trainingsbereiche", d: "Geräte, Freihantel, Cardio und Kursbereich." },
  { icon: "users" as const, t: "Einweisung durch das Team", d: "Jedes Gerät wird dir erklärt, bevor du allein trainierst." },
  { icon: "document" as const, t: "Trainingsplan", d: "Abgestimmt auf dein Ziel und deinen Zeitrahmen." },
  { icon: "sauna" as const, t: "Sauna und Solarium", d: "Regeneration direkt im Studio." },
  { icon: "coffee" as const, t: "Wasser und Bar", d: "Wasser mit Geschmack, Kaffee und Shakes vor Ort." },
];

const faq = [
  {
    q: "Welche Laufzeiten gibt es?",
    a: "Wir bieten verschiedene Laufzeiten an. Welche für dich sinnvoll ist, hängt davon ab, wie oft du trainieren willst und wie langfristig du planst. Das klären wir in einem kurzen Gespräch, ganz ohne Verkaufsdruck.",
  },
  {
    q: "Muss ich mich sofort entscheiden?",
    a: "Nein. Du kannst zuerst kostenlos zur Probe trainieren. Erst danach sprechen wir über eine Mitgliedschaft, wenn du möchtest.",
  },
  {
    q: "Kann ich meine Mitgliedschaft pausieren?",
    a: "Bei längerer Krankheit, Verletzung oder anderen wichtigen Gründen finden wir in aller Regel eine Lösung. Sprich uns einfach an, bevor die Zeit verstreicht.",
  },
  {
    q: "Was brauche ich für den Vertragsabschluss?",
    a: "Deine Kontaktdaten sowie die Bankverbindung für das Lastschriftverfahren. Bei Personen unter 18 Jahren zusätzlich die Einwilligung der Erziehungsberechtigten.",
  },
  {
    q: "Gibt es besondere Konditionen für Schüler, Studierende oder Azubis?",
    a: "Sprich uns darauf an. Wir sagen dir ehrlich, welche Möglichkeiten es aktuell gibt.",
  },
];

export default function MitgliedschaftPage() {
  return (
    <>
      <PageHero
        eyebrow="Mitgliedschaft"
        title={
          <>
            Eine Mitgliedschaft, <span className="flame-text">alles drin</span>
          </>
        }
        text="Kein Baukasten mit versteckten Zusatzpaketen. Als Mitglied nutzt du das Studio rund um die Uhr und alle Bereiche, die dazugehören."
        primary={{ href: "/probetraining/", label: "Erst kostenlos testen" }}
        secondary={{ href: "/kontakt/", label: "Tarife erfragen" }}
      />

      <Section className="glow glow-right">
        <SectionHeader
          eyebrow="Leistungen"
          title="Das ist immer enthalten"
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((x, i) => (
            <Reveal key={x.t} delay={i * 70}>
              <div className="glass card card-hover h-full">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
                  <Icon name={x.icon} size={23} />
                </span>
                <h3 className="mt-5 text-[19px] font-extrabold tracking-tight">{x.t}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[30px] p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-flame-500/22 blur-3xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="eyebrow">Tarife</span>
                <h2 className="display-lg mt-4">Preise besprechen wir persönlich</h2>
                <p className="lead mt-5 max-w-[56ch]">
                  Der passende Tarif hängt davon ab, wie oft du trainierst und wie lange du planst.
                  Statt dich durch eine Preistabelle zu schicken, nehmen wir uns zwei Minuten Zeit
                  und sagen dir, was für dich wirklich sinnvoll ist.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Cta href="/probetraining/">Probetraining und Beratung</Cta>
                  <Cta href={`tel:${site.contact.phone}`} variant="ghost" icon="phone" external>
                    {site.contact.phoneDisplay}
                  </Cta>
                </div>
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  "Keine versteckten Kosten",
                  "Keine Beratung unter Zeitdruck",
                  "Alle Bereiche im Studio inklusive",
                  "Entscheidung erst nach dem Probetraining",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[16px] font-semibold">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                      <Icon name="check" size={14} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Ablauf"
          title="Vom ersten Kontakt bis zum ersten Satz"
          align="center"
        />
        <div className="mt-12">
          <Steps
            items={[
              {
                icon: "calendar",
                title: "Termin vereinbaren",
                text: "Formular ausfüllen oder anrufen. Wir melden uns zügig mit einem Vorschlag zurück.",
              },
              {
                icon: "target",
                title: "Ziel klären und testen",
                text: "Rundgang, kurzes Gespräch und ein kostenloses Probetraining ohne Verpflichtung.",
              },
              {
                icon: "key",
                title: "Mitglied werden",
                text: "Passt es für dich, klären wir Tarif und Start. Dein Zugang ist sofort einsatzbereit.",
              },
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow="Fragen"
            title="Rund um die Mitgliedschaft"
            text="Was uns am häufigsten gefragt wird, bevor jemand startet."
          />
          <div>
            <Accordion items={faq} />
            <Reveal delay={120} className="mt-6">
              <NoticeCard
                icon="info"
                title="Deine Frage ist nicht dabei?"
                text="Ruf kurz an oder schreib uns. Wir antworten in der Regel noch am selben Werktag."
                action={{ href: "/kontakt/", label: "Zum Kontakt" }}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Starte mit einem kostenlosen Probetraining"
        text="Erst ausprobieren, dann entscheiden. So herum ergibt es Sinn."
      />
    </>
  );
}
