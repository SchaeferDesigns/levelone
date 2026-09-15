import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import Section, { SectionHeader } from "@/components/Section";
import Accordion from "@/components/Accordion";
import MapConsent from "@/components/MapConsent";
import {
  CtaBand,
  FeatureCard,
  MediaFrame,
  StatStrip,
  Steps,
  TileList,
} from "@/components/blocks";
import { site } from "@/lib/site";

const metaTitle = "Fitnessstudio in Göggingen | 24 Stunden trainieren";
const metaDescription =
  "Level One Göggingen ist dein Fitnessstudio im Ostalbkreis. Rund um die Uhr trainieren, moderne Geräte, großer Freihantelbereich, Kurse, Sauna und Solarium. Jetzt kostenlos zur Probe trainieren.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    title: "Level One Göggingen | Fitnessstudio mit 24 Stunden Training",
    description: metaDescription,
    images: ["/og.png"],
  },
};

const faq = [
  {
    q: "Kann ich wirklich rund um die Uhr trainieren?",
    a: "Ja. Als Mitglied trainierst du an sieben Tagen die Woche zu jeder Uhrzeit, auch nachts, am Wochenende und an Feiertagen. Während der Servicezeiten ist zusätzlich ein Team vor Ort, das dich betreut.",
  },
  {
    q: "Ich habe noch nie in einem Studio trainiert. Ist das ein Problem?",
    a: "Im Gegenteil. Beim ersten Termin gehen wir gemeinsam durch das Studio, klären dein Ziel und erstellen einen Plan, der zu deinem Alltag passt. Du bekommst jedes Gerät erklärt, bevor du allein loslegst.",
  },
  {
    q: "Was kostet das Probetraining?",
    a: "Das Probetraining ist kostenlos und unverbindlich. Du zahlst nichts und gehst keinen Vertrag ein.",
  },
  {
    q: "Gibt es Parkplätze am Studio?",
    a: "Ja, direkt am Standort Am Brunnenäcker 13 stehen Parkplätze zur Verfügung. Der Zugang zum Studio ist barrierefrei.",
  },
];

export default function Home() {
  return (
    <>
      {/* -------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden pt-[118px] pb-6 sm:pt-[150px]">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <Reveal immediate>
                <span className="glass inline-flex items-center gap-2.5 rounded-[999px] px-4 py-2 text-[13px] font-bold">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-flame-500"
                    style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
                  />
                  Jetzt geöffnet. Immer geöffnet.
                </span>
              </Reveal>

              <Reveal immediate delay={80}>
                <h1 className="display-xl mt-6">
                  Trainieren,
                  <br />
                  wann <span className="flame-text">du</span> willst.
                </h1>
              </Reveal>

              <Reveal immediate delay={150}>
                <p className="lead mt-7 max-w-[54ch]">
                  Level One Göggingen ist dein Fitnessstudio im Ostalbkreis. 24 Stunden geöffnet, an
                  sieben Tagen die Woche. Mit moderner Ausstattung, großem Freihantelbereich und
                  einem Team, das dich wirklich kennt.
                </p>
              </Reveal>

              <Reveal immediate delay={220}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Cta href="/probetraining/">Kostenloses Probetraining</Cta>
                  <Cta href="/studio/" variant="ghost">
                    Studio ansehen
                  </Cta>
                </div>
              </Reveal>

              <Reveal immediate delay={290}>
                <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3.5 text-[14.5px] text-mute">
                  {[
                    { icon: "check" as const, text: "Ohne Vertrag testen" },
                    { icon: "check" as const, text: "Persönliche Einweisung" },
                    { icon: "check" as const, text: "Parkplätze am Studio" },
                  ].map((i) => (
                    <li key={i.text} className="flex items-center gap-2.5">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                        <Icon name={i.icon} size={13} strokeWidth={3} />
                      </span>
                      {i.text}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Glaskarte mit den wichtigsten Fakten */}
            <Reveal immediate delay={200}>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-flame-500/30 blur-3xl"
                />
                <div className="glass-strong relative rounded-[28px] p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="eyebrow">Dein Studio</span>
                      <p className="display-md mt-2.5">Am Brunnenäcker 13</p>
                      <p className="mt-1 text-[15px] text-mute">
                        {site.contact.zip} {site.contact.city}
                      </p>
                    </div>
                    <span
                      className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-flame-400 to-flame-500 text-center text-[17px] font-black leading-none text-[#160702]"
                      aria-hidden="true"
                      style={{ animation: "float-soft 6s ease-in-out infinite" }}
                    >
                      24/7
                    </span>
                  </div>

                  <dl className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6">
                    <div className="grid grid-cols-[auto_1fr] items-start gap-x-3.5">
                      <Icon
                        name="clock"
                        size={20}
                        className="row-span-2 mt-0.5 shrink-0 text-flame-400"
                      />
                      <dt className="text-[14px] font-bold">Trainingszeiten</dt>
                      <dd className="col-start-2 text-[14.5px] text-mute">
                        Täglich 24 Stunden, auch an Feiertagen
                      </dd>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-start gap-x-3.5">
                      <Icon
                        name="users"
                        size={20}
                        className="row-span-2 mt-0.5 shrink-0 text-flame-400"
                      />
                      <dt className="text-[14px] font-bold">Servicezeiten</dt>
                      <dd className="col-start-2 text-[14.5px] text-mute">
                        Mo bis Fr 9 bis 22&nbsp;Uhr, Sa und So 10 bis 14&nbsp;Uhr
                      </dd>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-start gap-x-3.5">
                      <Icon
                        name="phone"
                        size={20}
                        className="row-span-2 mt-0.5 shrink-0 text-flame-400"
                      />
                      <dt className="text-[14px] font-bold">Direkter Draht</dt>
                      <dd className="col-start-2 text-[14.5px]">
                        <a
                          className="font-semibold underline decoration-flame-400/60 underline-offset-4"
                          href={`tel:${site.contact.phone}`}
                        >
                          {site.contact.phoneDisplay}
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <Link href="/kontakt/" className="btn btn-ghost mt-7 w-full">
                    Anfahrt und Kontakt
                    <Icon name="arrowRight" size={18} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Kennzahlen */}
      <section className="pt-10">
        <div className="shell">
          <Reveal>
            <StatStrip
              items={[
                { value: "24/7", label: "Trainingszeit", icon: "clock" },
                { value: "365", label: "Tage geöffnet", icon: "calendar" },
                { value: "0 €", label: "Probetraining", icon: "euro" },
                { value: "5", label: "Bereiche", icon: "target" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- Nutzen/Problem */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Warum Level One"
              title={
                <>
                  Fitness, die sich deinem Alltag <span className="flame-text">anpasst</span>
                </>
              }
              text="Schichtdienst, Familie, lange Arbeitstage: Der häufigste Grund, warum Training nicht stattfindet, ist die Uhrzeit. Bei uns fällt dieser Grund weg."
            />
            <div className="mt-8">
              <TileList
                items={[
                  { icon: "clock", label: "Vor der Frühschicht oder nach Feierabend" },
                  { icon: "users", label: "Keine Wartezeiten an den Geräten" },
                  { icon: "shield", label: "Einweisung durch geschultes Personal" },
                  { icon: "car", label: "Parkplätze direkt am Studio" },
                  { icon: "accessibility", label: "Barrierefreier Zugang" },
                  { icon: "sauna", label: "Regeneration in Sauna und Solarium" },
                ]}
              />
            </div>
          </div>

          <Reveal delay={120}>
            <div className="grid gap-5 sm:grid-cols-2">
              <MediaFrame label="Trainingsfläche im Level One Göggingen" icon="dumbbell" ratio="3/4" />
              <div className="flex flex-col gap-5">
                <MediaFrame label="Freihantelbereich" icon="target" ratio="1/1" />
                <MediaFrame label="Cardiobereich" icon="bike" ratio="1/1" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ----------------------------------------------------------- Angebot */}
      <Section id="angebot" className="glow glow-right">
        <SectionHeader
          eyebrow="Dein Angebot"
          title="Alles, was du für dein Ziel brauchst"
          text="Vom ersten Gerätetraining bis zur persönlichen Betreuung. Such dir aus, was zu dir passt."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="dumbbell"
            title="Kraft und Geräte"
            text="Maschinen für jede Muskelgruppe, dazu ein großer Freihantelbereich mit Bänken, Racks und Beinpresse."
            href="/training/"
            delay={0}
          />
          <FeatureCard
            icon="bike"
            title="Cardio und Ausdauer"
            text="Laufbänder, Stepper und Bikes für Aufwärmen, Fettstoffwechsel und gezieltes Ausdauertraining."
            href="/training/"
            delay={70}
          />
          <FeatureCard
            icon="music"
            title="Kurse in der Gruppe"
            text="Gemeinsam trainieren motiviert. Von Rückenfit bis Zumba und Pole Dance, angeleitet und mit klarer Struktur."
            href="/kurse/"
            delay={140}
          />
          <FeatureCard
            icon="target"
            title="Personal Training"
            text="Ein Trainer, der nur auf dich schaut. Ideal für einen schnellen Start oder wenn du auf der Stelle trittst."
            href="/training/"
            delay={210}
          />
          <FeatureCard
            icon="apple"
            title="Ernährungsbegleitung"
            text="Training ist die halbe Miete. Wir zeigen dir, wie du deine Ernährung ohne Verzicht in den Alltag bekommst."
            href="/training/"
            delay={280}
          />
          <FeatureCard
            icon="sauna"
            title="Sauna und Solarium"
            text="Runterkommen nach der Einheit. Regeneration gehört zum Training, nicht als Extra obendrauf."
            href="/wellness/"
            delay={350}
          />
        </div>
      </Section>

      {/* ----------------------------------------------------------- Ablauf */}
      <Section className="glow glow-left">
        <SectionHeader
          eyebrow="So startest du"
          title="In drei Schritten im Training"
          text="Kein langes Vorgespräch, keine Hürden. Melde dich, komm vorbei, leg los."
          align="center"
        />
        <div className="mt-12">
          <Steps
            items={[
              {
                icon: "calendar",
                title: "Termin anfragen",
                text: "Über das Formular oder mit einem Anruf. Wir finden einen Zeitpunkt, der dir passt.",
              },
              {
                icon: "users",
                title: "Studio kennenlernen",
                text: "Wir zeigen dir alles, klären dein Ziel und du trainierst kostenlos zur Probe.",
              },
              {
                icon: "flame",
                title: "Durchstarten",
                text: "Mit einem Plan, der zu dir passt, und Trainingszeiten, die sich nie mit deinem Alltag streiten.",
              },
            ]}
          />
        </div>
        <Reveal delay={200} className="mt-10 flex justify-center">
          <Cta href="/probetraining/">Kostenloses Probetraining</Cta>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------ Mitgliedschaft */}
      <Section>
        <div className="glass-strong overflow-hidden rounded-[30px]">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <span className="eyebrow">Mitgliedschaft</span>
              <h2 className="display-lg mt-4">In jeder Mitgliedschaft enthalten</h2>
              <p className="lead mt-5">
                Kein Baukasten mit Kleingedrucktem. Die Grundlagen bekommst du immer.
              </p>
              <ul className="mt-8 flex flex-col gap-3.5">
                {[
                  "Zutritt rund um die Uhr an sieben Tagen die Woche",
                  "Nutzung aller Trainingsbereiche im Studio",
                  "Einweisung an den Geräten durch das Team",
                  "Trainingsplan, abgestimmt auf dein Ziel",
                  "Wasser und Betreuung während der Servicezeiten",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15.5px]">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                      <Icon name="check" size={14} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href="/probetraining/">Kostenloses Probetraining</Cta>
                <Cta href="/mitgliedschaft/" variant="ghost">
                  Mitgliedschaft ansehen
                </Cta>
              </div>
            </div>
            <div className="relative min-h-[320px] border-t border-white/10 lg:border-l lg:border-t-0">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_0%,rgba(255,138,61,0.3),transparent_62%),radial-gradient(90%_90%_at_10%_100%,rgba(56,120,255,0.24),transparent_60%)]"
              />
              <div className="relative flex h-full flex-col justify-center gap-6 p-8 sm:p-12">
                <Icon name="star" size={32} className="text-flame-400" />
                <div>
                  <h3 className="display-md">Hör nicht nur auf uns</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-mute">
                    Was Mitglieder über das Studio schreiben, liest du direkt bei Google und in
                    unseren Kanälen. Dort siehst du auch, was gerade im Studio passiert.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    className="btn btn-ghost"
                    href={site.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="star" size={17} />
                    Bewertungen lesen
                  </a>
                  <a
                    className="btn btn-ghost"
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Level One Göggingen auf Instagram, öffnet in neuem Tab"
                  >
                    <Icon name="instagram" size={17} />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-[112px]">
          <SectionHeader
            eyebrow="Gut zu wissen"
            title="Häufige Fragen"
            text="Die Antworten auf das, was neue Mitglieder am häufigsten fragen."
          />
          </div>
          <div>
            <Accordion items={faq} />
            <Reveal delay={120} className="mt-6">
              <Link
                href="/faq/"
                className="inline-flex items-center gap-2 text-[15px] font-bold text-flame-400"
              >
                Alle Fragen ansehen
                <Icon name="arrowRight" size={17} strokeWidth={2.2} />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Standort */}
      <Section id="standort" className="glow glow-right">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Standort"
              title="Mitten in Göggingen, schnell erreichbar"
              text="Zentral im Ostalbkreis, gut angebunden für Schwäbisch Gmünd, Leinzell, Iggingen und die Umgebung."
            />
            <Reveal delay={100} className="mt-8">
              <div className="glass card">
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                  <div className="flex-1">
                    <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
                      Adresse
                    </p>
                    <p className="mt-2 text-[16px] font-semibold">
                      {site.contact.street}
                      <br />
                      {site.contact.zip} {site.contact.city}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
                      Erreichbar
                    </p>
                    <p className="mt-2 text-[16px] font-semibold">
                      <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>
                      <br />
                      <a className="break-all" href={`mailto:${site.contact.email}`}>
                        {site.contact.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Cta href={site.maps} variant="ghost" icon="pin" external>
                    Route planen
                  </Cta>
                  <Cta href="/kontakt/" variant="ghost">
                    Kontaktseite
                  </Cta>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <MapConsent />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
