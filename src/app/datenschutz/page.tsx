import { isPreview, metadataUrl } from "@/lib/deployment";
import type { Metadata } from "next";
import LegalText from "@/components/LegalText";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zum Datenschutz auf der Website von Level One Göggingen. Welche Daten erhoben werden, wozu sie dienen und welche Rechte du hast.",
  alternates: isPreview ? undefined : { canonical: "/datenschutz/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: metadataUrl("/datenschutz/"),
    title: "Datenschutzerklärung | Level One Göggingen",
    images: [metadataUrl("/og.png")],
  },
  robots: { index: !isPreview, follow: false },
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
      </Section>
    </>
  );
}
