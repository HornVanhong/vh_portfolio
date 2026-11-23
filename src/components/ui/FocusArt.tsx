import type { FocusArea } from "@/types";

/* One drawing per discipline: a path through layers, a signal with an outlier, a vector cluster. */

function Offensive() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => <rect key={i} x={92 + i * 18} y={14 + i * 18} width={176 - i * 36} height={132 - i * 36} fill="none" stroke={i === 3 ? "#00ff88" : "#1f6847"} strokeDasharray={i === 3 ? undefined : "60 8"} />)}
      <path d="M14 112h60l26-24h28l22-18h24" fill="none" stroke="#00ff88" strokeWidth="1.5" />
      {[[74, 112], [128, 88], [174, 70]].map(([x, y]) => <rect key={x} x={x! - 4} y={y! - 4} width="8" height="8" fill="#00ff88" />)}
    </>
  );
}

function Defensive() {
  const bars = Array.from({ length: 34 }, (_, i) => (i === 22 ? 104 : 14 + ((i * 47) % 29) + Math.round(9 * Math.sin(i / 2.4))));
  return (
    <>
      {[40, 80, 120].map((y) => <path key={y} d={`M14 ${y}h332`} stroke="#174b34" strokeDasharray="2 6" />)}
      {bars.map((h, i) => <rect key={i} x={16 + i * 9.8} y={146 - h} width="5" height={h} fill={i === 22 ? "#ff4d6d" : "#00cc66"} opacity={i === 22 ? 1 : 0.75} />)}
      <path d="M222 48v-14h12" fill="none" stroke="#ff4d6d" />
    </>
  );
}

function Ai() {
  const points = Array.from({ length: 46 }, (_, i) => {
    const angle = i * 2.4;
    const r = 7 * Math.sqrt(i);
    return { x: +(180 + Math.cos(angle) * r * 2.9).toFixed(1), y: +(80 + Math.sin(angle) * r * 1.4).toFixed(1), near: i < 9 };
  });
  return (
    <>
      {points.filter((p) => p.near).map((p) => <path key={`l${p.x}`} d={`M180 80L${p.x} ${p.y}`} stroke="#00f0ff" opacity=".55" />)}
      {points.map((p) => <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r={p.near ? 3.5 : 2} fill={p.near ? "#00ff88" : "#1f7a51"} />)}
      <circle cx="180" cy="80" r="6" fill="#050807" stroke="#00f0ff" strokeWidth="1.5" />
    </>
  );
}

const art = { offensive: Offensive, defensive: Defensive, ai: Ai };

export function FocusArt({ id }: { id: FocusArea["id"] }) {
  const Art = art[id];
  return (
    <svg aria-hidden viewBox="0 0 360 160" className="w-full">
      <Art />
    </svg>
  );
}
