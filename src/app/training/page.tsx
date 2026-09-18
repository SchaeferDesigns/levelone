import { isPreview, metadataUrl } from "@/lib/deployment";
import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section, { SectionHeader } from "@/components/Section";
import Cta from "@/components/Cta";
import { CtaBand, FeatureCard, MediaFrame, TileList } from "@/components/blocks";

const metaTitle = "Training und Angebote";
const metaDescription =
  "Krafttraining an Geräten, großer Freihantelbereich, Cardio, Vibrationstraining, Personal Training und Ernährungsbegleitung im Level One Göggingen. Rund um die Uhr trainierbar.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: isPreview ? undefined : { canonical: "/training/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: metadataUrl("/training/"),
    title: `${metaTitle} | Level One Göggingen`,
    description: metaDescription,
    images: [metadataUrl("/og.png")],
  },
};

const areas = [
  {
    icon: "dumbbell" as const,
    eyebrow: "Kraft",
    title: "Gerätetraining für jede Muskelgruppe",
    text: "Maschinen führen die Bewegung sauber und machen den Einstieg leicht. Vom Rückenzug über die Brustpresse bis zur Beinpresse deckst du den gesamten Körper ab. Jedes Gerät wird dir erklärt, bevor du allein daran trainierst.",
    points: [
      "Geführte Bewegungen für sicheren Start",
      "Trainingsplan auf dein Ziel abgestimmt",
      "Gewichte in feinen Stufen einstellbar",
    ],
    media: "Gerätepark im Level One Göggingen",
  },
  {
    icon: "target" as const,
    eyebrow: "Freihantel",
    title: "Großer Freihantelbereich",
    text: "Kurzhanteln, Langhanteln, Bänke und Racks. Hier trainierst du mit freien Gewichten, baust Stabilität auf und arbeitest an den großen Grundübungen. Genug Platz, damit niemand auf ein Gerät warten muss.",
    points: [
      "Kurz- und Langhanteln in breiter Abstufung",
      "Bänke, Racks und Platz für Grundübungen",
      "Auch nachts frei zugänglich",
    ],
    media: "Freihantelbereich mit Racks und Bänken",
  },
  {
    icon: "bike" as const,
    eyebrow: "Cardio",
    title: "Ausdauer, Aufwärmen und Fettstoffwechsel",
    text: "Laufbänder, Stepper und Bikes für das Warmup vor dem Krafttraining oder als eigene Einheit. Ideal, wenn du Kondition aufbauen, Gewicht reduzieren oder Herz und Kreislauf stärken willst.",
    points: [
      "Laufband, Stepper und Bikes",
      "Gut kombinierbar mit Krafttraining",
      "Belastung individuell steuerbar",
    ],
    media: "Cardiobereich mit Laufbändern und Bikes",
  },
];

export default function TrainingPage() {
  return (
    <>
      <section className="relative pt-[124px] pb-4 sm:pt-[146px]">
        <div className="shell">
          <Reveal immediate className="max-w-[820px]">
            <span className="eyebrow">Training</span>
            <h1 className="display-huge mt-5">
              Dein Training. Deine Zeit. <span className="flame-text">Dein Ziel.</span>
            </h1>
            <p className="lead mt-6 max-w-[62ch]">
              Ob Muskelaufbau, Rückengesundheit oder einfach wieder in Bewegung kommen: Bei uns
              findest du die Bereiche, die dich dorthin bringen. Und du nutzt sie dann, wenn es in
              deinen Tag passt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href="/mitglied-werden/">Mitglied werden</Cta>
              <Cta href="/probetraining/" variant="ghost">
                Erst kostenlos testen
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {areas.map((area, i) => (
        <Section key={area.title}>
          <div
            className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <Reveal>
                <span className="eyebrow">{area.eyebrow}</span>
                <h2 className="display-lg mt-4">{area.title}</h2>
                <p className="lead mt-5">{area.text}</p>
                <ul className="mt-7 flex flex-col gap-3">
                  {area.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[15.5px]">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                        <Icon name="check" size={14} strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <MediaFrame label={area.media} icon={area.icon} ratio="4/3" />
            </Reveal>
          </div>
        </Section>
      ))}

      <Section className="glow glow-right">
        <SectionHeader
          eyebrow="Mehr als Geräte"
          title="Zusätzliche Angebote"
          text="Wenn du schneller vorankommen willst oder gezielt an etwas arbeitest."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="users"
            title="Personal Training"
            text="Ein Trainer, der nur auf dich schaut. Technik, Intensität und Fortschritt werden laufend angepasst. Gut für den Start und gegen Stillstand."
            delay={0}
          />
          <FeatureCard
            icon="waves"
            title="Vibrationstraining"
            text="Kurze Einheiten mit hoher Reizdichte. Wird gern ergänzend genutzt, etwa für Rumpfstabilität und Durchblutung."
            delay={70}
          />
          <FeatureCard
            icon="apple"
            title="Ernährungsbegleitung"
            text="Wir schauen uns deinen Alltag an und passen die Ernährung daran an, statt dir einen Plan zu geben, den niemand durchhält."
            delay={140}
          />
          <FeatureCard
            icon="pulse"
            title="Rücken und Beweglichkeit"
            text="Gezielte Übungen für Nacken, Rücken und Hüfte. Sinnvoll, wenn du viel sitzt oder körperlich arbeitest."
            delay={210}
          />
          <FeatureCard
            icon="sparkles"
            title="Wiedereinstieg"
            text="Lange nichts gemacht? Wir starten bewusst ruhig und steigern in kleinen Schritten, damit du dranbleibst."
            delay={280}
          />
          <FeatureCard
            icon="music"
            title="Kurse in der Gruppe"
            text="Feste Termine, klare Anleitung und Menschen, die mitziehen. Alle Formate findest du auf der Kursseite."
            delay={350}
          />
        </div>
        <Reveal delay={420} className="mt-9 flex flex-wrap justify-center gap-3">
          <Cta href="/mitglied-werden/">Mitglied werden</Cta>
          <Cta href="/kurse/" variant="ghost">
            Zu den Kursen
          </Cta>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Ausstattung"
            title="Was dich im Studio erwartet"
            text="Alles an einem Ort, ohne dass du zwischen mehreren Studios wechseln musst."
          />
          <Reveal delay={100}>
            <TileList
              items={[
                { icon: "dumbbell", label: "Geräte für alle Muskelgruppen" },
                { icon: "target", label: "Freihantelbereich mit Racks" },
                { icon: "bike", label: "Laufband, Stepper und Bikes" },
                { icon: "music", label: "Kursbereich" },
                { icon: "sauna", label: "Sauna" },
                { icon: "sun", label: "Solarium" },
                { icon: "coffee", label: "Bar mit Kaffee und Shakes" },
                { icon: "key", label: "Zutritt rund um die Uhr" },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Probier es aus, bevor du dich entscheidest"
        text="Ein Termin, ein Rundgang, ein Training. Danach weißt du, ob es passt."
      />
    </>
  );
}
