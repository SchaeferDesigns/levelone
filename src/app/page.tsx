import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import Section, { SectionHeader } from "@/components/Section";
import Accordion from "@/components/Accordion";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import QuickAnswers from "@/components/QuickAnswers";
import StudioShowcase from "@/components/StudioShowcase";
import BusyChart from "@/components/BusyChart";
import AreaScroller from "@/components/AreaScroller";
import PlanBuilder from "@/components/PlanBuilder";
import TarifCards from "@/components/TarifCards";
import { CtaBand, Steps } from "@/components/blocks";
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
    q: "Was kostet die Mitgliedschaft?",
    a: "Der Tarif hängt von Laufzeit und Trainingshäufigkeit ab. Deshalb nennen wir ihn im Gespräch statt in einer Tabelle, die für die Hälfte der Leute nicht stimmt. Das Probetraining ist in jedem Fall kostenlos.",
  },
  {
    q: "Kann ich wirklich rund um die Uhr trainieren?",
    a: "Ja. Als Mitglied trainierst du an sieben Tagen die Woche zu jeder Uhrzeit, auch nachts, am Wochenende und an Feiertagen. Während der Servicezeiten ist zusätzlich ein Team vor Ort.",
  },
  {
    q: "Wie komme ich außerhalb der Servicezeiten ins Studio?",
    a: "Als Mitglied erhältst du ein persönliches Zutrittsmedium. Damit öffnest du die Tür zu jeder Uhrzeit, auch nachts und an Feiertagen.",
  },
  {
    q: "Ich habe noch nie in einem Studio trainiert. Ist das ein Problem?",
    a: "Im Gegenteil. Beim ersten Termin gehen wir gemeinsam durch das Studio, klären dein Ziel und erstellen einen Plan, der zu deinem Alltag passt. Du bekommst jedes Gerät erklärt, bevor du allein loslegst.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <Ticker
        items={[
          "24 Stunden geöffnet",
          "Freihantelbereich",
          "Geräte für jede Muskelgruppe",
          "Cardio",
          "Kurse",
          "Sauna",
          "Solarium",
          "Personal Training",
        ]}
      />

      {/* Die häufigsten Fragen sofort beantwortet */}
      <QuickAnswers />

      {/* Mitgliedschaft steht bewusst weit oben, weil danach am meisten gefragt wird */}
      <Section id="mitgliedschaft">
        <Reveal>
          <div className="glass-strong sweep overflow-hidden rounded-[30px]">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-12">
                <span className="eyebrow">Mitgliedschaft</span>
                <h2 className="display-huge mt-4">Was drin ist</h2>
                <p className="lead mt-5 max-w-[46ch]">
                  In jeder Mitgliedschaft enthalten, unabhängig vom Tarif.
                </p>
                <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
                  {[
                    "Zutritt rund um die Uhr, sieben Tage die Woche",
                    "Alle Trainingsbereiche im Studio",
                    "Einweisung an den Geräten durch das Team",
                    "Trainingsplan, abgestimmt auf dein Ziel",
                    "Sauna und Solarium",
                    "Wasser und Betreuung in den Servicezeiten",
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
                  <Cta href="/mitglied-werden/">Mitglied werden</Cta>
                  <Cta href="/probetraining/" variant="ghost">
                    Erst kostenlos testen
                  </Cta>
                </div>
              </div>

              <div className="relative border-t border-white/10 lg:border-l lg:border-t-0">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_0%,rgba(255,138,61,0.28),transparent_62%),radial-gradient(90%_90%_at_10%_100%,rgba(56,120,255,0.22),transparent_60%)]"
                />
                <div className="relative flex h-full flex-col justify-center gap-6 p-8 sm:p-12">
                  <Icon name="shield" size={32} className="text-flame-400" />
                  <div>
                    <h3 className="display-md">Kein Risiko</h3>
                    <ul className="mt-4 flex flex-col gap-3 text-[15.5px]">
                      {[
                        "Keine Aufnahmegebühr",
                        "Probetraining vorher kostenlos",
                        "Vierzehn Tage Widerrufsrecht beim Onlineabschluss",
                        "Pause bei längerer Verletzung möglich",
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-3">
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                            <Icon name="check" size={14} strokeWidth={3} />
                          </span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <a className="btn btn-ghost" href={`tel:${site.contact.phone}`}>
                      <Icon name="phone" size={17} />
                      {site.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Was es im Studio gibt */}
      <AreaScroller />

      {/* Auslastung als Bild statt als Text */}
      <Section id="auslastung">
        <Reveal>
          <BusyChart />
        </Reveal>
      </Section>

      {/* Passt das zu meinem Ziel */}
      <Section id="ziel" className="glow glow-right">
        <SectionHeader
          eyebrow="Plan in 20 Sekunden"
          title={
            <>
              Was willst du <span className="flame-text">erreichen</span>?
            </>
          }
          text="Drei Angaben, dann steht dein Wochenplan mit konkreten Übungen."
          align="center"
        />
        <Reveal delay={80} className="mt-11">
          <PlanBuilder />
        </Reveal>
      </Section>

      {/* Bildsequenz, sobald Material vorliegt */}
      <StudioShowcase />

      {/* Tarife */}
      <Section id="tarife" className="glow glow-left">
        <SectionHeader
          eyebrow="Tarife"
          title={
            <>
              Such dir deinen <span className="flame-text">Tarif</span>
            </>
          }
          text="Alle Leistungen sind überall gleich. Du entscheidest nur über Laufzeit und Preis."
          align="center"
        />
        <div className="mt-12">
          <TarifCards />
        </div>
      </Section>

      {/* Ablauf */}
      <Section className="glow glow-left">
        <SectionHeader
          eyebrow="So startest du"
          title="In drei Schritten im Training"
          text="Melde dich, komm vorbei, leg los."
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

      {/* Beweis */}
      <Section className="pt-0">
        <Reveal>
          <div className="glass sweep card flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
                <Icon name="star" size={23} />
              </span>
              <div>
                <h2 className="text-[20px] font-extrabold tracking-tight">Hör nicht nur auf uns</h2>
                <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-mute">
                  Was Mitglieder schreiben, liest du bei Google. Auf Instagram siehst du den Alltag.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a className="btn btn-ghost" href={site.maps} target="_blank" rel="noopener noreferrer">
                <Icon name="star" size={17} />
                Bewertungen
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
        </Reveal>
      </Section>

      {/* Fragen */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-[112px]">
            <SectionHeader
              eyebrow="Gut zu wissen"
              title="Häufige Fragen"
              text="Was neue Mitglieder am häufigsten fragen."
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

      {/* Standort */}
      <Section id="standort" className="glow glow-right">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Standort"
              title="Mitten in Göggingen"
              text="Zentral im Ostalbkreis, gut erreichbar aus Schwäbisch Gmünd und Umgebung."
            />
            <Reveal delay={100} className="mt-8">
              <div className="glass sweep card">
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
            <div className="glass sweep card">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
                Anfahrt
              </p>
              <ul className="mt-5 flex flex-col gap-4">
                {[
                  { icon: "car" as const, t: "Mit dem Auto", d: "Parkplätze direkt am Studio, keine Parkgebühr" },
                  { icon: "accessibility" as const, t: "Barrierefrei", d: "Ebenerdiger Zugang ohne Stufen" },
                  { icon: "key" as const, t: "Nachts", d: "Zutritt mit dem eigenen Zutrittsmedium" },
                ].map((x) => (
                  <li key={x.t} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
                      <Icon name={x.icon} size={21} />
                    </span>
                    <span>
                      <span className="block text-[16px] font-bold">{x.t}</span>
                      <span className="block text-[14.5px] text-mute">{x.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
