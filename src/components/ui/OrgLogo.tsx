import Image from "next/image";

/** Always beside the organization's name, so the image itself is decorative. White keeps brand colors true. */
export function OrgLogo({ src }: { src: string }) {
  return (
    <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-neon/40 bg-white p-1.5 shadow-[0_0_18px_rgba(0,255,136,.15)]">
      <Image src={src} alt="" width={160} height={160} sizes="80px" className="size-full object-contain" />
    </span>
  );
}
