import { isPreview, metadataUrl } from "@/lib/deployment";
import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section, { SectionHeader } from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import Cta from "@/components/Cta";
import { CtaBand } from "@/components/blocks";
import { site } from "@/lib/site";

const metaTitle = "Kontakt und Anfahrt";
const metaDescription =
  "Level One Göggingen, Am Brunnenäcker 13, 73571 Göggingen. Telefon 07175 2618200. Öffnungszeiten, Anfahrt und Kontaktformular.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: isPreview ? undefined : { canonical: "/kontakt/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: metadataUrl("/kontakt/"),
    title: `${metaTitle} | Level One Göggingen`,
    description: metaDescription,
    images: [metadataUrl("/og.png")],
  },
};

export default function KontaktPage() {
  return (
    <>
      <section className="relative pt-[124px] pb-4 sm:pt-[146px]">
        <div className="shell">
          <Reveal className="max-w-[820px]">
            <span className="eyebrow">Kontakt</span>
            <h1 className="display-huge mt-5">
              Schreib uns oder <span className="flame-text">komm vorbei</span>
            </h1>
            <p className="lead mt-6 max-w-[62ch]">
              Ob Frage zur Mitgliedschaft, zum Kursplan oder zum Probetraining: Wir antworten in der
              Regel noch am selben Werktag.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="glow glow-right">
        <h2 className="sr-only">Kontaktmöglichkeiten</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "pin" as const,
              t: "Adresse",
              lines: [site.contact.street, `${site.contact.zip} ${site.contact.city}`],
              href: site.maps,
              label: "Route planen",
              external: true,
            },
            {
              icon: "phone" as const,
              t: "Telefon",
              lines: [site.contact.phoneDisplay],
              href: `tel:${site.contact.phone}`,
              label: "Jetzt anrufen",
              external: true,
            },
            {
              icon: "mail" as const,
              t: "E-Mail",
              lines: [site.contact.email],
              href: `mailto:${site.contact.email}`,
              label: "E-Mail schreiben",
              external: true,
            },
            {
              icon: "instagram" as const,
              t: "Social Media",
              lines: ["Aktuelles und Einblicke"],
              href: site.social.instagram,
              label: "Zu Instagram",
              external: true,
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 70}>
              <div className="glass card card-hover flex h-full flex-col">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
                  <Icon name={c.icon} size={23} />
                </span>
                <h3 className="mt-5 text-[18px] font-extrabold tracking-tight">{c.t}</h3>
                <div className="mt-2.5 flex-1 text-[15px] leading-relaxed break-words text-mute">
                  {c.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
                <a
                  href={c.href}
                  target={c.external && c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.external && c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-bold text-flame-400"
                >
                  {c.label}
                  <Icon name="arrowRight" size={16} strokeWidth={2.2} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <SectionHeader eyebrow="Nachricht" title="Schreib uns direkt" />
            <div className="mt-8">
              <ContactForm variant="kontakt" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal delay={100}>
              <div className="glass-strong rounded-[26px] p-8">
                <span className="eyebrow">Öffnungszeiten</span>
                <h3 className="display-md mt-3">Wann wir für dich da sind</h3>
                <div className="mt-7 flex flex-col gap-6">
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-faint">
                      Training für Mitglieder
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
                      Beratung und Service
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
                <Cta
                  href={`tel:${site.contact.phone}`}
                  variant="ghost"
                  icon="phone"
                  external
                  className="mt-8 w-full"
                >
                  {site.contact.phoneDisplay}
                </Cta>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="glass rounded-[26px] p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/6 text-flame-400">
                  <Icon name="car" size={23} />
                </span>
                <h3 className="display-md mt-5">Anfahrt und Parken</h3>
                <ul className="mt-5 flex flex-col gap-3 text-[15.5px] text-mute">
                  {[
                    "Parkplätze stehen direkt am Studio zur Verfügung.",
                    "Der Zugang zum Studio ist barrierefrei.",
                    "Zentrale Lage im Ostalbkreis, gut erreichbar aus Schwäbisch Gmünd und Umgebung.",
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
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Lieber gleich ausprobieren?"
        text="Ein kostenloses Probetraining sagt mehr als jede Antwort per Mail."
      />
    </>
  );
}
