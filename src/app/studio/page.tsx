import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section, { SectionHeader } from "@/components/Section";
import Cta from "@/components/Cta";
import { CtaBand, MediaFrame, NoticeCard, PageHero, StatStrip, TileList } from "@/components/blocks";
import { site } from "@/lib/site";

const metaTitle = "Über das Studio";
const metaDescription =
  "Das Level One Göggingen stellt sich vor: Ausstattung, Trainingsbereiche, Öffnungszeiten und das Team am Standort Am Brunnenäcker 13 in Göggingen.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: "/studio/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/studio/",
    title: `${metaTitle} | Level One Göggingen`,
    description: metaDescription,
    images: ["/og.png"],
  },
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Das Studio"
        title={
          <>
            Ein Studio für <span className="flame-text">alle Level</span>
          </>
        }
        text="Vom ersten Trainingstag bis zum erfahrenen Kraftsportler. Bei uns trainieren Menschen mit ganz unterschiedlichen Zielen nebeneinander, und genau das macht die Stimmung aus."
        primary={{ href: "/probetraining/", label: "Kostenloses Probetraining" }}
        secondary={{ href: "/kontakt/", label: "Anfahrt ansehen" }}
      />

      <Section>
        <Reveal>
          <StatStrip
            items={[
              { value: "24/7", label: "Zutritt", icon: "key" },
              { value: "365", label: "Tage im Jahr", icon: "calendar" },
              { value: "5", label: "Bereiche", icon: "target" },
              { value: "1", label: "Standort in Göggingen", icon: "pin" },
            ]}
          />
        </Reveal>
      </Section>

      <Section className="glow glow-left">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Unser Anspruch"
              title="Persönlich statt anonym"
              text="Große Ketten funktionieren über Masse. Wir funktionieren darüber, dass wir dich kennen. Wer regelmäßig kommt, wird bei uns beim Namen begrüßt."
            />
            <ul className="mt-8 flex flex-col gap-4">
              {[
                {
                  t: "Betreuung, die nicht aufhört",
                  d: "Auch nach dem ersten Plan bleiben wir dran und passen an, wenn sich etwas ändert.",
                },
                {
                  t: "Ordnung auf der Fläche",
                  d: "Gewichte gehören zurück ins Rack. Das klingt banal, macht im Alltag aber den Unterschied.",
                },
                {
                  t: "Respekt in beide Richtungen",
                  d: "Niemand wird schief angesehen, weder für zu wenig noch für zu viel Gewicht.",
                },
              ].map((x, i) => (
                <li key={x.t}>
                  <Reveal delay={i * 80}>
                    <div className="glass flex items-start gap-4 rounded-[20px] p-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
                        <Icon name="shield" size={21} />
                      </span>
                      <div>
                        <p className="text-[17px] font-extrabold tracking-tight">{x.t}</p>
                        <p className="mt-1.5 text-[15px] text-mute">{x.d}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-5">
              <MediaFrame label="Eingangsbereich und Empfang" icon="users" ratio="1/1" />
              <MediaFrame label="Trainingsfläche" icon="dumbbell" ratio="1/1" />
              <MediaFrame label="Kursbereich" icon="music" ratio="1/1" />
              <MediaFrame label="Wellnessbereich" icon="sauna" ratio="1/1" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Ausstattung"
            title="Alles unter einem Dach"
            text="Du brauchst keine zweite Mitgliedschaft für Kurse oder Wellness. Bei uns ist beides Teil des Studios."
          />
          <Reveal delay={100}>
            <TileList
              items={[
                { icon: "dumbbell", label: "Geräte für alle Muskelgruppen" },
                { icon: "target", label: "Großer Freihantelbereich" },
                { icon: "bike", label: "Cardiobereich" },
                { icon: "music", label: "Kursbereich" },
                { icon: "waves", label: "Vibrationstraining" },
                { icon: "sauna", label: "Sauna" },
                { icon: "sun", label: "Solarium" },
                { icon: "coffee", label: "Bar mit Kaffee und Shakes" },
                { icon: "car", label: "Parkplätze am Studio" },
                { icon: "accessibility", label: "Barrierefreier Zugang" },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Team"
              title="Die Menschen hinter Level One"
              text="Während der Servicezeiten ist immer jemand vor Ort, der dich betreut, korrigiert und ansprechbar ist."
            />
            <Reveal delay={100} className="mt-8">
              <NoticeCard
                icon="users"
                title="Lerne das Team persönlich kennen"
                text="Die Trainerinnen und Trainer stellen wir hier in Kürze mit Schwerpunkt und Qualifikation vor. Am schnellsten lernst du uns beim Probetraining kennen, dort bekommst du direkt die Person, die dich später betreut."
                action={{ href: "/probetraining/", label: "Probetraining anfragen" }}
              />
            </Reveal>
          </div>
          <Reveal delay={140}>
            <div className="glass-strong rounded-[26px] p-8">
              <span className="eyebrow">Öffnungszeiten</span>
              <h2 className="display-md mt-3">Wann du kommen kannst</h2>
              <div className="mt-7 flex flex-col gap-6">
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
                    Training
                  </p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {site.hours.training.map((h) => (
                      <li key={h.days} className="flex justify-between gap-4 text-[15.5px]">
                        <span className="text-mute">{h.days}</span>
                        <span className="font-bold">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
                    Service und Beratung
                  </p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {site.hours.service.map((h) => (
                      <li key={h.days} className="flex justify-between gap-4 text-[15.5px]">
                        <span className="text-mute">{h.days}</span>
                        <span className="font-bold">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Cta href="/kontakt/" variant="ghost" className="mt-8 w-full">
                Kontakt und Anfahrt
              </Cta>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Sieh dir das Studio in Ruhe an"
        text="Ein Rundgang dauert zehn Minuten. Danach weißt du mehr als jede Beschreibung vermitteln kann."
      />
    </>
  );
}
