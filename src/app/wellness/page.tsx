import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section, { SectionHeader } from "@/components/Section";
import { CtaBand, MediaFrame, PageHero, TileList } from "@/components/blocks";

const metaTitle = "Sauna, Solarium und Regeneration";
const metaDescription =
  "Sauna, Solarium und Bar im Level One Göggingen. Regeneration nach dem Training gehört bei uns dazu, nicht als teures Extra.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: "/wellness/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/wellness/",
    title: `${metaTitle} | Level One Göggingen`,
    description: metaDescription,
    images: ["/og.png"],
  },
};

const blocks = [
  {
    icon: "sauna" as const,
    title: "Sauna",
    text: "Nach einer harten Einheit runterkommen, die Muskulatur lockern und den Kopf frei bekommen. Die Sauna steht dir als Mitglied zur Verfügung, ohne dass du dafür ein zusätzliches Paket buchen musst.",
    media: "Saunabereich im Studio",
  },
  {
    icon: "sun" as const,
    title: "Solarium",
    text: "Ein gepflegter Teint gehört für viele zum guten Gefühl nach dem Training. Das Solarium ist direkt im Studio, du musst also nirgendwo anders hin.",
    media: "Solarium im Studio",
  },
  {
    icon: "coffee" as const,
    title: "Bar und Getränke",
    text: "Kaffee, Proteinshakes und Wasser mit Geschmack. Kurz hinsetzen, mit anderen reden und den Tag ausklingen lassen gehört genauso zum Studio wie das Training selbst.",
    media: "Bar mit Kaffee und Shakes",
  },
];

export default function WellnessPage() {
  return (
    <>
      <PageHero
        eyebrow="Wellness"
        title={
          <>
            Erholung ist <span className="flame-text">Teil des Trainings</span>
          </>
        }
        text="Fortschritt entsteht nicht während der Einheit, sondern danach. Deshalb findest du bei uns alles für die Regeneration direkt im Haus."
        primary={{ href: "/probetraining/", label: "Kostenloses Probetraining" }}
        secondary={{ href: "/mitgliedschaft/", label: "Mitgliedschaft ansehen" }}
      />

      <Section className="glow glow-right">
        <div className="grid gap-5 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <article className="glass card card-hover h-full">
                <MediaFrame label={b.media} icon={b.icon} ratio="16/10" className="mb-7" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
                  <Icon name={b.icon} size={23} />
                </span>
                <h2 className="mt-5 text-[21px] font-extrabold tracking-tight">{b.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{b.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Gut zu wissen"
            title="Regeneration richtig nutzen"
            text="Wer nach dem Training bewusst herunterfährt, erholt sich schneller und bleibt länger verletzungsfrei."
          />
          <Reveal delay={100}>
            <TileList
              items={[
                { icon: "check", label: "Sauna nach dem Training, nicht davor" },
                { icon: "check", label: "Zwischen den Gängen ausreichend trinken" },
                { icon: "check", label: "Solarium in Maßen und mit Schutzbrille" },
                { icon: "check", label: "Nach der Sauna Zeit zum Abkühlen einplanen" },
                { icon: "sauna", label: "Handtuch und Badeschuhe mitbringen" },
                { icon: "coffee", label: "Eiweiß und Wasser direkt an der Bar" },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Trainieren und danach abschalten"
        text="Sieh dir den Wellnessbereich beim Probetraining selbst an."
      />
    </>
  );
}
