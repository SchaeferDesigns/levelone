import Link from "next/link";
import Icon from "./Icon";
import type { IconName } from "./Icon";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { site } from "@/lib/site";

type Answer = {
  icon: IconName;
  question: string;
  value: React.ReactNode;
  text: string;
  href: string;
  cta: string;
  external?: boolean;
};

/**
 * Die vier Fragen, die vor einem Studiobesuch am häufigsten gestellt werden,
 * direkt unter dem Startbild und nach Wichtigkeit sortiert.
 */
const answers: Answer[] = [
  {
    icon: "euro",
    question: "Was kostet der Einstieg?",
    value: (
      <>
        <Counter to={0} /> €
      </>
    ),
    text: "Das Probetraining ist kostenlos und unverbindlich. Den passenden Tarif klären wir danach in zwei Minuten, weil er von Laufzeit und Trainingshäufigkeit abhängt.",
    href: "/mitgliedschaft/",
    cta: "Zur Mitgliedschaft",
  },
  {
    icon: "clock",
    question: "Wann kann ich trainieren?",
    value: "24/7",
    text: "An sieben Tagen die Woche rund um die Uhr, auch nachts und an Feiertagen. Beratung gibt es Mo bis Fr 9 bis 22 Uhr, Sa und So 10 bis 14 Uhr.",
    href: "/studio/",
    cta: "Öffnungszeiten",
  },
  {
    icon: "pin",
    question: "Wo ist das Studio?",
    value: "Göggingen",
    text: `${site.contact.street}, ${site.contact.zip} ${site.contact.city}. Parkplätze direkt am Studio, barrierefreier Zugang, zentral im Ostalbkreis.`,
    href: site.maps,
    cta: "Route planen",
    external: true,
  },
  {
    icon: "calendar",
    question: "Wie fange ich an?",
    value: (
      <>
        <Counter to={1} /> Termin
      </>
    ),
    text: "Anrufen oder das Formular ausfüllen. Wir zeigen dir alles, klären dein Ziel und du trainierst direkt mit. Ohne Vertrag, ohne Verpflichtung.",
    href: "/probetraining/",
    cta: "Termin anfragen",
  },
];

export default function QuickAnswers() {
  return (
    <section aria-labelledby="antworten-titel" className="section-y glow glow-right">
      <div className="shell">
        <Reveal className="max-w-[760px]">
          <span className="eyebrow">Kurz und direkt</span>
          <h2 id="antworten-titel" className="display-huge mt-4">
            Die vier Fragen <span className="flame-text">vorab</span>
          </h2>
          <p className="lead mt-5">
            Damit du nicht suchen musst. Alles Weitere steht auf den jeweiligen Seiten.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {answers.map((a, i) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
                    <Icon name={a.icon} size={23} />
                  </span>
                </div>
                <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
                  {a.question}
                </p>
                <p className="mt-2 text-[30px] font-black leading-none tracking-tight sm:text-[34px]">
                  {a.value}
                </p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-mute">{a.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-bold text-flame-400">
                  {a.cta}
                  <Icon name="arrowRight" size={16} strokeWidth={2.2} />
                </span>
              </>
            );

            return (
              <Reveal key={a.question} delay={i * 70} className="h-full">
                {a.external ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass sweep card card-hover flex h-full flex-col"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={a.href} className="glass sweep card card-hover flex h-full flex-col">
                    {inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={320} className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`tel:${site.contact.phone}`} className="btn btn-ghost">
            <Icon name="phone" size={18} />
            Frage direkt stellen: {site.contact.phoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
