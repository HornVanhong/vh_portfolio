import { CertificateGallery } from "@/components/ui/CertificateGallery";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certificates } from "@/data/certificates";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";
import { Section } from "./Section";

export function Certificates({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.certificates;
  // Formatted here so server and browser never disagree about locale data.
  const format = new Intl.DateTimeFormat(lang === "km" ? "km-KH" : "en-GB", { dateStyle: "long", timeZone: "UTC" });
  return (
    <Section
      id="certificates"
      layout="top"
      heading={<SectionHeading id="certificates" index="06" label={t.label} heading={t.heading} intro={t.intro} />}
    >
      <Reveal>
        <CertificateGallery t={t} items={certificates.map((c) => ({ ...c, dateLabel: format.format(new Date(c.date)) }))} />
      </Reveal>
    </Section>
  );
}
