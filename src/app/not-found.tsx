import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Cta from "@/components/Cta";
import { mainNav } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[78vh] items-center pt-[124px] pb-20">
      <div className="shell">
        <div className="glass-strong mx-auto max-w-[760px] rounded-[30px] p-8 text-center sm:p-14">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/14 bg-white/6 text-flame-400">
            <Icon name="target" size={28} />
          </span>
          <p className="eyebrow mt-7">Fehler 404</p>
          <h1 className="display-lg mt-4">Diese Seite gibt es nicht</h1>
          <p className="lead mx-auto mt-5 max-w-[52ch]">
            Der Link ist vielleicht veraltet oder hat sich vertippt. Von hier kommst du direkt weiter.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Cta href="/">Zur Startseite</Cta>
            <Cta href="/probetraining/" variant="ghost">
              Probetraining
            </Cta>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-8 text-[15px]">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-mute transition-colors hover:text-chalk">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
