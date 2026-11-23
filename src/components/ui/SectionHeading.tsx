import { Reveal } from "./Reveal";

interface Props {
  id: string;
  index: string;
  label: string;
  heading: string;
  intro?: string;
}

/** Two-tone heading: the opening words glow, the rest is white. */
export function SectionHeading({ id, index, label, heading, intro }: Props) {
  const words = heading.split(" ");
  const cut = Math.ceil(words.length / 2);
  const rest = words.slice(cut).join(" ");
  return (
    <Reveal className="mb-10 max-w-3xl md:mb-12">
      <p className="track font-mono text-sm text-neon">{`${index} // ${label}`}</p>
      <h2 id={`${id}-title`} className="mt-3 text-3xl font-bold uppercase md:text-5xl">
        <span className="neon">{words.slice(0, cut).join(" ")}</span>{rest && ` ${rest}`}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-lg text-[#a5b7ac]">{intro}</p>}
    </Reveal>
  );
}
