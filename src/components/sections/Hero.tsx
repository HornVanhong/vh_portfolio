import { BrainCircuit, CodeXml, Download, LockKeyhole, Mail, Mouse, ShieldCheck, SquareTerminal } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { HackingSession } from "@/components/ui/HackingSession";
import { MatrixBackground } from "@/components/ui/MatrixBackground";
import { MatrixToggle } from "@/components/ui/MatrixToggle";
import { Portrait } from "@/components/ui/Portrait";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SystemStatus } from "@/components/ui/SystemStatus";
import { Terminal } from "@/components/ui/Terminal";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";

const features = [
  { key: "pentest", Icon: ShieldCheck, href: "#focus" },
  { key: "research", Icon: LockKeyhole, href: "#skills" },
  { key: "software", Icon: CodeXml, href: "#projects" },
  { key: "ai", Icon: BrainCircuit, href: "#focus" },
] as const;

const WHOAMI = "whoami";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const [first = "", ...restName] = profile.displayName[lang].toUpperCase().split(" ");
  const [hello = "", ...restHello] = t.hello.split(" ");

  return (
    <section id="home" aria-labelledby="hero-title">
      <div className="frame overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-70 [mask-image:linear-gradient(90deg,#000,transparent_55%)]">
          <MatrixBackground />
        </div>
        <div aria-hidden className="hero-scene pointer-events-none absolute right-0 top-14 hidden aspect-[958/668] w-[61%] opacity-60 lg:block xl:opacity-100">
          <Image src="/images/art/operator.webp" alt="" fill loading="eager" sizes="(min-width: 1024px) 62vw, 1px" className="object-cover" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-1.5rem)] max-w-[112rem] flex-col px-5 pb-1 pt-20 md:px-9">
          <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <div className="min-w-0 lg:max-w-[46rem] lg:pt-3">
              <div className="font-mono text-sm leading-relaxed md:text-base">
                <p className="text-green">root@vanhong:~$ <span className="typing text-ink" style={{ "--chars": `${WHOAMI.length}ch`, "--steps": WHOAMI.length } as CSSProperties}>{WHOAMI}</span></p>
                <p className="text-neon">{profile.displayName[lang]} <span aria-hidden className="cursor" /></p>
              </div>
              <h1 id="hero-title" className="mt-4">
                <span className="block text-2xl font-semibold md:text-3xl"><span className="text-neon">{hello}</span> {restHello.join(" ")}</span>
                <span className="mt-1 block text-[clamp(2.65rem,5.7vw,6.4rem)] font-bold leading-none md:whitespace-nowrap">
                  <span className="glitch inline-block text-white [text-shadow:0_0_22px_rgba(255,255,255,.35)]" data-text={first}>{first}</span>{" "}
                  <span className="hero-name">{restName.join(" ")}</span>
                </span>
              </h1>
              <p className="mt-2 flex flex-wrap gap-x-4 font-display text-lg font-medium md:text-xl 2xl:text-2xl">
                <span>{t.role1}</span><span aria-hidden className="hidden text-green sm:inline">|</span><span className="text-neon">{t.role2}</span>
              </p>
              <p className="mt-4 font-display text-lg font-semibold text-neon [text-shadow:0_0_16px_rgba(0,255,136,.35)] md:text-xl 2xl:text-2xl">{t.headline}</p>
              <p className="mt-4 max-w-[38rem] font-mono text-[0.9375rem] leading-relaxed text-ink lg:max-w-[27rem] xl:max-w-[31rem] 2xl:max-w-[36rem]">{t.description}</p>
              <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                <a href="#projects" className="btn btn-primary"><SquareTerminal size={18} aria-hidden /> {t.work}</a>
                <a href={profile.cv} download className="btn btn-neon"><Download size={18} aria-hidden /> {dict.common.downloadCv}</a>
                <a href="#contact" className="btn btn-neon"><Mail size={18} aria-hidden /> {t.contact}</a>
              </div>
              <div className="mt-5 flex gap-3"><SocialLinks dict={dict} compact /></div>
            </div>
            <SystemStatus lang={lang} t={t} />
          </div>

          <div aria-hidden className="hero-scene-mobile relative -mx-5 mt-4 aspect-[7/5] md:-mx-9 lg:hidden">
            <Image src="/images/art/operator.webp" alt="" fill loading="lazy" sizes="(min-width: 1024px) 1px, 100vw" className="object-cover" />
          </div>

          <div className="relative mt-4 grid gap-4 xl:grid-cols-[1.45fr_1.5fr_1fr] xl:items-end xl:pr-16">
            <HackingSession t={t} />
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:gap-2">
              {features.map(({ key, Icon, href }) => (
                <li key={key}>
                  <a href={href} className="cut group flex h-full min-h-28 flex-col items-center justify-center gap-2 px-2 py-4 text-center font-mono text-sm leading-tight text-neon">
                    <Icon size={30} aria-hidden className="transition-transform group-hover:scale-110" />
                    {t.features[key]}
                  </a>
                </li>
              ))}
            </ul>
            <figure className="cut p-5 font-mono text-sm text-neon">
              <blockquote>“{t.quote}”</blockquote>
              <figcaption className="mt-2 text-right text-ink">— {profile.displayName[lang]}</figcaption>
            </figure>
          </div>

          <div className="flex items-center justify-center">
            <a href="#identity" className="inline-flex min-h-11 items-center gap-2 px-2 font-mono text-xs uppercase text-neon hover:text-ink"><Mouse size={18} className="nudge" aria-hidden /> {t.scroll}</a>
            <MatrixToggle on={t.matrixOn} off={t.matrixOff} />
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
