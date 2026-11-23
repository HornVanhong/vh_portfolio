/** Corner circuitry drawn over each screen frame. */
export function FrameOrnaments() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] text-neon">
      <svg width="260" height="90" viewBox="0 0 260 90" fill="none" stroke="currentColor" className="absolute bottom-0 left-0 hidden opacity-70 md:block">
        <path d="M0 20l34 40h150l22 30M0 46l26 30h138M196 60h40" />
        <path d="M34 60h150" strokeWidth="2.5" />
      </svg>
      <svg width="300" height="90" viewBox="0 0 300 90" fill="none" stroke="currentColor" className="absolute bottom-0 right-0 hidden opacity-60 md:block">
        <path d="M300 8l-42 46h-96l-30 36M300 34l-34 36h-82" />
        <path d="M210 80h56l-8 10h-56z" fill="currentColor" stroke="none" />
      </svg>
      <svg width="200" height="40" viewBox="0 0 200 40" fill="none" stroke="currentColor" className="absolute right-0 top-0 hidden opacity-50 md:block">
        <path d="M0 0l24 22h110l20 18M134 22h66" />
      </svg>
    </div>
  );
}
