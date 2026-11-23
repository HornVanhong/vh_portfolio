import { Download, Mail } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";
import { Section } from "./Section";

export function Contact({ dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.contact;
  return (
    <Section
      id="contact" art="contact"
      heading={<SectionHeading id="contact" index="07" label={t.label} heading={t.heading} intro={t.description} />}
    >
      <div className="grid gap-8">
        <Reveal delay={0.08}><ContactForm t={t} /></Reveal>
        <Reveal>
          <h3 className="text-xl font-semibold">{t.channels}</h3>
          <div className="mt-3 flex flex-wrap gap-x-8">
            <ExternalLink
              href={profile.email && `mailto:${profile.email}`}
              icon={<Mail size={18} aria-hidden />}
              label={profile.email ?? t.email}
              pending={dict.common.pending}
              newTab={dict.common.newTab}
            />
            <SocialLinks dict={dict} />
          </div>
          <a href={profile.cv} download className="btn mt-6"><Download size={16} aria-hidden /> {dict.common.downloadCv}</a>
        </Reveal>
      </div>
    </Section>
  );
}
