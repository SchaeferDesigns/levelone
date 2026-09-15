import Link from "next/link";
import Icon from "./Icon";
import { footerNav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-white/8 pt-16 pb-10">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="Zur Startseite">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-flame-400 to-flame-500 text-ink-950">
                <Icon name="dumbbell" size={22} strokeWidth={2.2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[17px] font-black tracking-tight">LEVEL ONE</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mute">
                  Göggingen
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-mute">
              Dein Fitnessstudio im Ostalbkreis. Rund um die Uhr geöffnet, persönlich betreut und
              ohne Wartezeiten an den Geräten.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/14 bg-white/5 transition-colors hover:bg-white/10"
                aria-label="Level One Göggingen auf Instagram, öffnet in neuem Tab"
              >
                <Icon name="instagram" size={19} />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/14 bg-white/5 transition-colors hover:bg-white/10"
                aria-label="Level One Göggingen auf Facebook, öffnet in neuem Tab"
              >
                <Icon name="facebook" size={19} />
              </a>
            </div>
          </div>

          <nav aria-label="Angebot">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">Angebot</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {footerNav.angebot.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-mute transition-colors hover:text-chalk">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Studio">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">Studio</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {footerNav.studio.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-mute transition-colors hover:text-chalk">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">Kontakt</h2>
            <ul className="mt-5 flex flex-col gap-3.5 text-[15px] text-mute">
              <li className="flex gap-3">
                <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-flame-400" />
                <span>
                  {site.contact.street}
                  <br />
                  {site.contact.zip} {site.contact.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" size={18} className="mt-0.5 shrink-0 text-flame-400" />
                <a href={`tel:${site.contact.phone}`} className="transition-colors hover:text-chalk">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" size={18} className="mt-0.5 shrink-0 text-flame-400" />
                <a href={`mailto:${site.contact.email}`} className="break-all transition-colors hover:text-chalk">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="clock" size={18} className="mt-0.5 shrink-0 text-flame-400" />
                <span>
                  Training: 24 Stunden, täglich
                  <br />
                  Service: Mo bis Fr 09:00 bis 22:00 Uhr
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/8 pt-7 text-[13.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Alle Rechte vorbehalten.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.recht.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-chalk">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/datenschutz/#externe-inhalte" className="transition-colors hover:text-chalk">
                Einwilligung verwalten
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
