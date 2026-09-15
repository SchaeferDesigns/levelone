import type { Metadata } from "next";
import LegalText from "@/components/LegalText";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";


export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: "Allgemeine Geschäftsbedingungen der Level One Göggingen GmbH.",
  alternates: { canonical: "/agb/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/agb/",
    title: "Allgemeine Geschäftsbedingungen | Level One Göggingen",
    images: ["/og.png"],
  },
  robots: { index: true, follow: false },
};

export default function Page() {
  return (
    <>
      <section className="relative pt-[124px] pb-4 sm:pt-[146px]">
        <div className="shell">
          <Reveal className="max-w-[820px]">
            <span className="eyebrow">Rechtliches</span>
            <h1 className="display-lg mt-5">Allgemeine Geschäftsbedingungen</h1>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal>
          <LegalText file="agb" title="Allgemeine Geschäftsbedingungen" />
        </Reveal>

      </Section>
    </>
  );
}
