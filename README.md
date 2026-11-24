# Horn Vanhong — Cybersecurity Portfolio

Next.js (App Router), strict TypeScript, Tailwind CSS, Framer Motion. English at `/`, Khmer at `/km`, Korean at `/ko`.

## Run it

Requires Node 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run typecheck` | Route types and TypeScript |
| `npm run lint` | ESLint |
| `npm run build` then `npm start` | Production build and server |
| `npm run cv` | Regenerate the CV PDF from site data (Node 22.18+, Chrome). **Overwrites the PDF.** |

## Edit content

| What | Where |
| --- | --- |
| Photo, email, social links, CV path, availability | `src/data/profile.ts` |
| Tool logos (files in `public/images/tools`) | `src/data/tools.ts` |
| Certificates (previews in `public/images/certificates`) | `src/data/certificates.ts` |
| About text and interface wording | `src/i18n/en.ts`, `src/i18n/km.ts`, `src/i18n/ko.ts` |
| Skills, projects, jobs, education, focus areas | `src/data/*.ts` |

Type checking fails if a translation is missing.

## Deploy to Vercel

1. Push the folder to a Git repository and import it in Vercel (no build settings needed).
2. Add the variables from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` address.
3. For the contact form, create a [Resend](https://resend.com) API key and verify a sending domain.
4. Recommended: add Upstash Redis variables so rate limiting is shared between server instances.
5. Deploy, then send yourself a message through the form.

## AI assistant

Set `GEMINI_API_KEY` (see `.env.example`) locally in `.env.local` and in Vercel. Without it the chat button is hidden in production and shows a "not set up" message in development. Answers come only from `src/data` and `src/i18n/en.ts`; the rules are in `src/lib/assistant.ts`. Add the Upstash variables so the visitor and daily limits hold across server instances, and set a quota or budget in Google's console.

## Placeholders to complete

- [ ] CV: the PDF was generated from the project brief. Replace `public/cv/Horn-Vanhong-CV.pdf` with the verified CV
- [ ] RHB Cambodia dates, training dates, RUPP dates and graduation status (hidden until set)
- [ ] Higher-resolution section art: the files in `public/images/art` are enlarged from the small panels of the concept board (`scripts/extract-art.mjs`)
- [ ] Project repository URLs, demo URLs and screenshots
- [ ] Resend variables (until set, the form says that nothing was sent)
- [ ] Review of the Khmer and Korean text by native speakers

## Security notes

- Per-request CSP nonce (`src/proxy.ts`), so pages render on demand instead of being static. Inline **styles** are allowed because the animation library needs them; inline scripts are not.
- Contact API: same-origin check, streamed size cap, schema validation, honeypot and timing trap, rate limit, plain-text email. Messages are not stored.
- Rate limiting reads `x-real-ip` / `x-forwarded-for`. Vercel sets these; another host must overwrite client-supplied values.
- No analytics or third-party scripts. Fonts are self-hosted at build time.
