import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import Reveal from "@/components/Reveal";
import Section, { SectionHeader } from "@/components/Section";
import { CtaBand, PageHero } from "@/components/blocks";

const metaTitle = "Häufige Fragen";
const metaDescription =
  "Antworten rund um Training, Mitgliedschaft, Kurse und Zutritt im Level One Göggingen. Von den Öffnungszeiten bis zum ersten Trainingstag.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: "/faq/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/faq/",
    title: `${metaTitle} | Level One Göggingen`,
    description: metaDescription,
    images: ["/og.png"],
  },
};

const groups = [
  {
    title: "Einstieg und Probetraining",
    items: [
      {
        q: "Ich habe noch nie trainiert. Bin ich hier richtig?",
        a: "Ja. Ein großer Teil unserer Mitglieder hat genau so angefangen. Wir zeigen dir jedes Gerät, erklären die Technik und starten mit einem Plan, der zu deinem aktuellen Stand passt.",
      },
      {
        q: "Was kostet das Probetraining?",
        a: "Nichts. Das Probetraining ist kostenlos und unverbindlich.",
      },
      {
        q: "Was soll ich zum ersten Termin mitbringen?",
        a: "Sportkleidung, saubere Hallenschuhe, ein Handtuch und ein Getränk. Alles Weitere bekommst du vor Ort.",
      },
      {
        q: "Gibt es eine Altersgrenze?",
        a: "Jugendliche können bei uns trainieren, dafür ist die Einwilligung der Erziehungsberechtigten nötig. Sprich uns an, dann klären wir die Details für deinen Fall.",
      },
    ],
  },
  {
    title: "Training und Zutritt",
    items: [
      {
        q: "Kann ich wirklich zu jeder Uhrzeit trainieren?",
        a: "Ja. Als Mitglied hast du an sieben Tagen die Woche rund um die Uhr Zutritt, auch nachts und an Feiertagen.",
      },
      {
        q: "Ist zu jeder Zeit Personal vor Ort?",
        a: "Während der Servicezeiten von Montag bis Freitag zwischen 09:00 und 22:00 Uhr sowie am Wochenende zwischen 10:00 und 14:00 Uhr ist jemand für dich da. Außerhalb dieser Zeiten trainierst du eigenständig mit deinem Zutrittsmedium.",
      },
      {
        q: "Wie komme ich außerhalb der Servicezeiten ins Studio?",
        a: "Als Mitglied erhältst du ein persönliches Zutrittsmedium. Damit öffnest du die Tür zu jeder Uhrzeit, auch nachts und an Feiertagen. Wie die Ausgabe genau abläuft, zeigen wir dir beim Start.",
      },
      {
        q: "Wie voll ist es im Studio?",
        a: "Weil die Trainingszeit auf 24 Stunden verteilt ist, verteilen sich auch die Mitglieder. Wer Ruhe möchte, trainiert früh morgens oder spät abends.",
      },
      {
        q: "Bekomme ich einen Trainingsplan?",
        a: "Ja. Dein Plan wird auf dein Ziel abgestimmt und angepasst, sobald du weiter bist oder sich dein Alltag ändert.",
      },
    ],
  },
  {
    title: "Mitgliedschaft und Vertrag",
    items: [
      {
        q: "Welche Laufzeiten gibt es?",
        a: "Es gibt mehrere Möglichkeiten. Welche für dich sinnvoll ist, klären wir in einem kurzen Gespräch, nachdem du das Studio gesehen hast.",
      },
      {
        q: "Was ist in der Mitgliedschaft enthalten?",
        a: "Der Zutritt rund um die Uhr, alle Trainingsbereiche, die Einweisung an den Geräten, dein Trainingsplan sowie Sauna und Solarium.",
      },
      {
        q: "Kann ich pausieren, wenn ich verletzt bin?",
        a: "Bei längerer Krankheit oder Verletzung finden wir in der Regel eine Lösung. Wichtig ist, dass du dich meldest, bevor die Zeit verstreicht.",
      },
    ],
  },
  {
    title: "Kurse und Wellness",
    items: [
      {
        q: "Muss ich mich für Kurse anmelden?",
        a: "Eine kurze Anmeldung hilft uns bei der Planung, weil die Plätze begrenzt sind. Frag im Studio oder telefonisch nach dem nächsten freien Termin.",
      },
      {
        q: "Kosten Kurse extra?",
        a: "Welche Kurse in deiner Mitgliedschaft enthalten sind, hängt vom gewählten Tarif ab. Wir sagen dir vorab klar, was für dich gilt.",
      },
      {
        q: "Sind Sauna und Solarium inklusive?",
        a: "Die Nutzung ist Teil des Studios. Details zu deinem Tarif besprechen wir bei der Beratung.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groups.flatMap((g) =>
    g.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        eyebrow="Häufige Fragen"
        title={
          <>
            Antworten, bevor du <span className="flame-text">fragen musst</span>
          </>
        }
        text="Die Themen, die vor dem ersten Training am häufigsten aufkommen. Ist deine Frage nicht dabei, melde dich einfach."
        primary={{ href: "/probetraining/", label: "Probetraining anfragen" }}
        secondary={{ href: "/kontakt/", label: "Frage stellen" }}
      />

      {groups.map((g, i) => (
        <Section key={g.title} className={i === 0 ? "" : "pt-0"}>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <SectionHeader eyebrow={`Thema 0${i + 1}`} title={g.title} />
            <Reveal delay={80}>
              <Accordion items={g.items} />
            </Reveal>
          </div>
        </Section>
      ))}

      <CtaBand
        title="Noch offene Fragen?"
        text="Ein Anruf reicht. Wir sagen dir ehrlich, ob Level One zu dir passt."
      />
    </>
  );
}
