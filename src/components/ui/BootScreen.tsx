const LINES = [
  "[ OK ] Initializing secure kernel...",
  "[ OK ] Loading exploit modules",
  "[ OK ] Establishing encrypted tunnel 10.0.0.1 → vanhong",
  "[ OK ] Bypassing firewall .......... done",
  "[ OK ] Decrypting portfolio payload",
];

/**
 * Terminal boot sequence shown over the page while it loads.
 * Pure CSS: it plays and removes itself even without JavaScript.
 */
export function BootScreen() {
  return (
    <div aria-hidden className="boot-screen">
      <div className="w-full max-w-xl px-6 font-mono text-sm text-neon">
        {LINES.map((line, i) => (
          <p key={line} className="boot-line" style={{ animationDelay: `${0.1 + i * 0.16}s` }}>
            <span className="text-green">{line.slice(0, 6)}</span>
            <span className="text-ink">{line.slice(6)}</span>
          </p>
        ))}
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-moss/60">
          <div className="boot-bar h-full bg-neon shadow-[0_0_14px_#00ff88]" />
        </div>
        <p className="boot-granted mt-5 text-center font-display text-3xl font-bold tracking-[0.3em] md:text-4xl">ACCESS GRANTED</p>
      </div>
    </div>
  );
}
