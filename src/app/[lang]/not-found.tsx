import { getDictionary } from "@/i18n";
import { localePath } from "@/lib/utils";
import { LOCALES } from "@/types";

/** not-found receives no params, so it speaks every language. */
export default function NotFound() {
  return (
    <main id="main" className="wrap grid min-h-svh content-center gap-8 py-20">
      <p className="font-mono text-neon">HTTP 404</p>
      {LOCALES.map((lang) => {
        const { title, text, home } = getDictionary(lang).notFound;
        return (
          <div key={lang} lang={lang}>
            {lang === "en" ? <h1 className="text-4xl font-bold md:text-6xl">{title}</h1> : <h2 className="text-2xl">{title}</h2>}
            <p className="mb-4 mt-2 text-dim">{text}</p>
            <a className="btn" href={localePath(lang)}>{home}</a>
          </div>
        );
      })}
    </main>
  );
}
