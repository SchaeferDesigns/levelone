import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section, { SectionHeader } from "@/components/Section";
import { CtaBand, FeatureCard, NoticeCard, PageHero } from "@/components/blocks";

const metaTitle = "Kurse";
const metaDescription =
  "Gruppenkurse im Level One Göggingen: Rückenfit, Zumba, Pole Dance und weitere Formate. Feste Termine, klare Anleitung und Training in der Gruppe.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: "/kurse/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/kurse/",
    title: `${metaTitle} | Level One Göggingen`,
    description: metaDescription,
    images: ["/og.png"],
  },
};

export default function KursePage() {
  return (
    <>
      <PageHero
        eyebrow="Kurse"
        title={
          <>
            Gemeinsam trainieren, <span className="flame-text">leichter dranbleiben</span>
          </>
        }
        text="Ein fester Termin im Kalender wirkt stärker als jeder gute Vorsatz. In der Gruppe ziehst du mit, auch an den Tagen, an denen du allein nicht angefangen hättest."
        primary={{ href: "/mitglied-werden/", label: "Mitglied werden" }}
        secondary={{ href: "/probetraining/", label: "Erst kostenlos testen" }}
      />

      <Section className="glow glow-right">
        <SectionHeader
          eyebrow="Formate"
          title="Kurse, die bei uns stattfinden"
          text="Die Auswahl wechselt saisonal. Den aktuellen Plan bekommst du im Studio und auf Anfrage."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="pulse"
            title="Rückenfit"
            text="Kräftigung und Mobilisation für Rücken, Rumpf und Nacken. Besonders sinnvoll bei viel Sitzen oder einseitiger Belastung im Beruf."
            delay={0}
          />
          <FeatureCard
            icon="music"
            title="Zumba"
            text="Ausdauertraining, das sich nach Tanzen anfühlt. Hoher Kalorienverbrauch, gute Laune und keine komplizierte Technik."
            delay={70}
          />
          <FeatureCard
            icon="sparkles"
            title="Pole Dance"
            text="Kraft, Körperspannung und Beweglichkeit in einem. Wird in kleinen Gruppen unterrichtet, Vorkenntnisse sind nicht nötig."
            delay={140}
          />
        </div>

        <Reveal delay={180} className="mt-10">
          <NoticeCard
            icon="calendar"
            title="Kursplan direkt von uns"
            text="Die Termine der laufenden Saison sagen wir dir am Telefon oder im Studio und schicken dir den Plan auf Wunsch zu. So bekommst du immer den aktuellen Stand statt einer veralteten Tabelle."
            action={{ href: "/kontakt/", label: "Kursplan anfordern" }}
          />
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Ablauf"
              title="So läuft ein Kurs bei uns ab"
              text="Keine Hürden, kein Vorwissen nötig. Komm ein paar Minuten früher, den Rest erklären wir dir."
            />
            <ol className="mt-8 flex flex-col gap-5">
              {[
                {
                  t: "Platz sichern",
                  d: "Melde dich kurz an, damit wir wissen, wie viele Plätze noch frei sind.",
                },
                {
                  t: "Zehn Minuten früher da sein",
                  d: "So bleibt Zeit für Fragen und für die passende Einstellung der Hilfsmittel.",
                },
                {
                  t: "Mitmachen in deinem Tempo",
                  d: "Jede Übung wird in mehreren Schwierigkeitsstufen gezeigt. Du wählst, was heute passt.",
                },
              ].map((s, i) => (
                <li key={s.t}>
                  <Reveal delay={i * 80}>
                    <div className="glass flex items-start gap-4 rounded-[20px] p-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-500 text-[16px] font-black text-ink-950">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[17px] font-extrabold tracking-tight">{s.t}</p>
                        <p className="mt-1.5 text-[15px] text-mute">{s.d}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal delay={120}>
            <div className="glass-strong rounded-[26px] p-8">
              <Icon name="info" size={28} className="text-flame-400" />
              <h2 className="display-md mt-5">Kurse sind kein Muss</h2>
              <p className="lead mt-4">
                Viele Mitglieder kombinieren zwei Kurse pro Woche mit freiem Training. Andere
                trainieren ausschließlich an den Geräten. Beides funktioniert, entscheidend ist,
                dass du regelmäßig kommst.
              </p>
              <ul className="mt-7 flex flex-col gap-3">
                {[
                  "Kurse finden im eigenen Kursbereich statt",
                  "Anfängerinnen und Anfänger sind ausdrücklich willkommen",
                  "Bequeme Sportkleidung und Handtuch genügen",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15.5px]">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                      <Icon name="check" size={14} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Komm einfach mal in einen Kurs"
        text="Sag uns, welches Format dich interessiert. Wir sagen dir, wann der nächste Termin ist."
      />
    </>
  );
}
