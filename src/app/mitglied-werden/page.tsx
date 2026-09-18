import { isPreview, metadataUrl } from "@/lib/deployment";
import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import MembershipFlow from "@/components/MembershipFlow";
import { enthalten } from "@/lib/tarife";

const metaTitle = "Mitglied werden";
const metaDescription =
  "In wenigen Schritten Mitglied im Level One Göggingen werden. Tarif wählen, Startdatum festlegen, fertig. Zutritt rund um die Uhr an sieben Tagen die Woche.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: isPreview ? undefined : { canonical: "/mitglied-werden/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: metadataUrl("/mitglied-werden/"),
    title: `${metaTitle} | Level One Göggingen`,
    description: metaDescription,
    images: [metadataUrl("/og.png")],
  },
};

export default function MitgliedWerdenPage() {
  return (
    <>
      <section className="relative pt-[124px] pb-4 sm:pt-[146px]">
        <div className="shell">
          <Reveal immediate className="max-w-[820px]">
            <span className="eyebrow">Mitglied werden</span>
            <h1 className="display-huge mt-5">
              In fünf Schritten <span className="flame-text">drin</span>
            </h1>
            <p className="lead mt-6 max-w-[58ch]">
              Tarif wählen, Startdatum festlegen, Daten hinterlegen. Ab dem Starttag trainierst du
              rund um die Uhr.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <div className="flex items-start gap-3.5 rounded-[18px] border border-flame-500/30 bg-flame-500/8 p-5">
              <Icon name="info" size={20} className="mt-0.5 shrink-0 text-flame-400" />
              <p className="text-[15px] leading-relaxed">
                <strong className="font-bold">Vorschau.</strong> Der Ablauf ist vollständig
                bedienbar, es wird aber nichts abgeschickt und kein Vertrag geschlossen. Bankdaten
                werden bewusst nicht abgefragt.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section className="glow glow-right">
        <Reveal>
          <MembershipFlow />
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div className="glass card">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">
              In jedem Tarif enthalten
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {enthalten.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
