import type { Metadata } from "next";
import LegalText from "@/components/LegalText";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import ConsentSettings from "@/components/ConsentSettings";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zum Datenschutz auf der Website von Level One Göggingen.",
  alternates: { canonical: "/datenschutz/" },
  robots: { index: true, follow: false },
};

export default function Page() {
  return (
    <>
      <section className="relative pt-[124px] pb-4 sm:pt-[146px]">
        <div className="shell">
          <Reveal className="max-w-[820px]">
            <span className="eyebrow">Rechtliches</span>
            <h1 className="display-lg mt-5">Datenschutzerklärung</h1>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal>
          <LegalText file="datenschutz" title="Datenschutzerklärung" />
        </Reveal>
        <Reveal delay={100} id="externe-inhalte">
          <ConsentSettings />
        </Reveal>
      </Section>
    </>
  );
}
