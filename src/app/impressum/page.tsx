import type { Metadata } from "next";
import LegalText from "@/components/LegalText";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";


export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Level One Göggingen GmbH.",
  alternates: { canonical: "/impressum/" },
  robots: { index: true, follow: false },
};

export default function Page() {
  return (
    <>
      <section className="relative pt-[124px] pb-4 sm:pt-[146px]">
        <div className="shell">
          <Reveal className="max-w-[820px]">
            <span className="eyebrow">Rechtliches</span>
            <h1 className="display-lg mt-5">Impressum</h1>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal>
          <LegalText file="impressum" title="Impressum" />
        </Reveal>

      </Section>
    </>
  );
}
