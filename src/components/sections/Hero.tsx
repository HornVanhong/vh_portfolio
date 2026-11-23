import { ArrowDown, Download } from "lucide-react";
import { FrameOrnaments } from "@/components/ui/FrameOrnaments";
import { MatrixBackground } from "@/components/ui/MatrixBackground";
import { MatrixToggle } from "@/components/ui/MatrixToggle";
import { Portrait } from "@/components/ui/Portrait";
import { SectionArt } from "@/components/ui/SectionArt";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Terminal } from "@/components/ui/Terminal";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const name = profile.name.toUpperCase();

  return (
    <section id="home" aria-labelledby="hero-title">
      <div className="frame overflow-hidden">
        <div aria-hidden className="grid-bg absolute -inset-14" />
        <div aria-hidden className="absolute inset-0 [mask-image:linear-gradient(90deg,rgba(0,0,0,.25),#000_60%)]">
          <MatrixBackground />
        </div>
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-y-0 right-0 hidden h-full w-3/5 lg:block">
          <defs>
            <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00ff88" stopOpacity=".05" /><stop offset=".5" stopColor="#00ff88" stopOpacity=".3" /><stop offset="1" stopColor="#00ff88" stopOpacity="0" /></linearGradient>
          </defs>
          <path d="M8 0L70 46L100 34V0Z" fill="url(#beam)" />
          <path d="M8 0L70 46" stroke="#00ff88" strokeOpacity=".75" vectorEffect="non-scaling-stroke" />
        </svg>
        <SectionArt name="hero" priority className="art-hero !absolute bottom-0 right-0 h-[46%] w-full opacity-40 sm:h-[60%] lg:h-[94%] lg:w-[52%] lg:opacity-100" />
        <FrameOrnaments />

        <div className="wrap relative flex min-h-[calc(100svh-1rem)] items-center pb-24 pt-28">
          <div className="min-w-0 lg:max-w-[60%]">
            <h1 id="hero-title">
              <span className="track block font-mono text-base font-medium text-neon md:text-xl">{t.hello}</span>
              <span className="glitch neon mt-4 block text-[clamp(3.1rem,9.2vw,7.5rem)] font-bold uppercase leading-[0.95]" data-text={name}>{name}</span>
            </h1>
            <p className="mt-5 font-display text-xl font-semibold uppercase leading-tight md:text-3xl">
              <span className="block text-green">{t.role1}</span>
              <span className="block text-ink">{t.role2}</span>
            </p>
            <p className="mt-7 max-w-xl text-lg font-medium text-ink">{t.headline}</p>
            <p className="mt-3 max-w-xl text-[#b9cbc0]">{t.description}</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <a href="#projects" className="btn btn-primary">{t.work}</a>
              <a href={profile.cv} download className="btn bg-bg/80"><Download size={16} aria-hidden /> {dict.common.downloadCv}</a>
              <a href="#contact" className="btn bg-bg/80">{t.contact}</a>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-7"><SocialLinks dict={dict} /></div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-4 z-10">
          <div className="wrap relative flex items-center justify-center">
            <a href="#identity" className="inline-flex min-h-11 items-center gap-2 bg-bg px-2 font-mono text-xs text-[#b9cbc0] hover:text-neon"><ArrowDown size={16} className="nudge" aria-hidden /> {t.scroll}</a>
            <div className="ml-2"><MatrixToggle on={t.matrixOn} off={t.matrixOff} /></div>
          </div>
        </div>
      </div>

      <div id="identity" className="frame">
        <div className="wrap grid gap-6 py-10 md:grid-cols-[17rem_1fr] md:py-14">
          <Portrait dict={dict} className="aspect-square md:aspect-auto md:min-h-72" />
          <div className="min-w-0">
            <Terminal
              lang={lang}
              t={dict.terminal}
              identity={profile.terminal}
              skills={skillCategories.map((c) => `${c.title[lang]}: ${c.skills.join(", ")}`)}
              projects={projects.map(({ slug, title }) => ({ slug, title }))}
              sections={navigation.map((n) => n.id)}
              cv={profile.cv}
            />
            {profile.openToOpportunities && (
              <p className="mt-4 flex items-center gap-2 font-mono text-sm text-dim"><span aria-hidden className="size-2 bg-neon" /> {dict.common.available}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
