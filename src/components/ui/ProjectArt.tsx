import type { ProjectArtName } from "@/types";

/* Original schematic drawings. They show the idea of each project, not its interface. */

const mono = { fontFamily: "var(--font-mono)", fontSize: 11 } as const;

function Recon() {
  const nodes: [number, number, boolean][] = [[320, 150, true], [210, 92, false], [432, 88, true], [172, 198, false], [470, 196, false], [262, 222, true], [392, 232, false], [322, 62, false]];
  const edges: [number, number][] = [[0, 1], [0, 2], [0, 5], [0, 6], [1, 3], [2, 4], [1, 7], [2, 7], [5, 3], [6, 4]];
  return (
    <>
      {[46, 92, 140].map((r) => <circle key={r} cx="320" cy="150" r={r} fill="none" stroke="#174b34" strokeDasharray="2 5" />)}
      <path d="M320 150 L452 103 A140 140 0 0 0 396 32 Z" fill="#00ff88" opacity=".09" />
      {edges.map(([a, b]) => {
        const from = nodes[a]!;
        const to = nodes[b]!;
        return <path key={`${a}-${b}`} d={`M${from[0]} ${from[1]}L${to[0]} ${to[1]}`} stroke="#00cc66" opacity=".5" />;
      })}
      {nodes.map(([x, y, hot]) => <rect key={`${x}${y}`} x={x - 6} y={y - 6} width="12" height="12" fill={hot ? "#00ff88" : "#050807"} stroke="#00ff88" />)}
      <path d="M302 140v-8h8M338 160v8h-8" fill="none" stroke="#00f0ff" />
      {["PLAN", "APPROVE", "EXECUTE", "REPORT"].map((step, i) => (
        <g key={step}>
          <rect x={74 + i * 126} y="306" width="112" height="28" fill={i < 2 ? "#174b34" : "none"} stroke="#174b34" />
          <text x={130 + i * 126} y="324" textAnchor="middle" fill={i < 2 ? "#e8f5ed" : "#8a9c90"} {...mono}>{step}</text>
        </g>
      ))}
    </>
  );
}

function Scanner() {
  const cells = [];
  for (let row = 0; row < 11; row++) {
    for (let col = 0; col < 18; col++) {
      const n = (row * 37 + col * 91 + row * col * 13) % 256;
      const hot = row === 5 && col > 6 && col < 12;
      cells.push(
        <text key={`${row}-${col}`} x={84 + col * 28} y={62 + row * 24} fill={hot ? "#ff4d6d" : row < 5 ? "#00cc66" : "#2a5f47"} {...mono}>
          {n.toString(16).padStart(2, "0")}
        </text>,
      );
    }
  }
  return (
    <>
      {cells}
      <path d="M60 189h520" stroke="#00ff88" />
      <path d="M60 36h520v153H60z" fill="#00ff88" opacity=".05" />
      <path d="M272 164h-8v30h8M412 164h8v30h-8" fill="none" stroke="#ff4d6d" />
    </>
  );
}

function Classroom() {
  const seats = [];
  for (let row = 0; row < 4; row++) {
    const count = 5 + row;
    for (let i = 0; i < count; i++) {
      const angle = Math.PI * (0.18 + (0.64 * i) / (count - 1));
      const r = 108 + row * 52;
      const x = Math.round(320 - Math.cos(angle) * r * 1.15);
      const y = Math.round(34 + Math.sin(angle) * r);
      seats.push({ x, y, on: (row * 3 + i * 2) % 5 < 2 });
    }
  }
  return (
    <>
      {seats.filter((s) => s.on).map((s) => <path key={`l${s.x}-${s.y}`} d={`M320 52L${s.x} ${s.y}`} stroke="#00cc66" opacity=".32" />)}
      <rect x="250" y="32" width="140" height="28" fill="#174b34" stroke="#00ff88" />
      {seats.map((s) => <rect key={`${s.x}-${s.y}`} x={s.x - 13} y={s.y - 8} width="26" height="16" fill={s.on ? "#00ff88" : "#0a100d"} stroke={s.on ? "#00ff88" : "#2a6b4c"} />)}
    </>
  );
}

const art = { recon: Recon, scanner: Scanner, classroom: Classroom };

export function ProjectArt({ name, label }: { name: ProjectArtName; label: string }) {
  const Art = art[name];
  return (
    <svg role="img" aria-label={label} viewBox="0 0 640 360" preserveAspectRatio="xMidYMid meet" className="size-full">
      <Art />
    </svg>
  );
}
