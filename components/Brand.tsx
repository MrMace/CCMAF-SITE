import Image from "next/image";

/**
 * The logo lockup used in the nav and footer. For the rebrand, replace
 * /public/img/logo.png (or the markup below) and everything updates.
 */
export default function Brand({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-3">
      {/* Zoomed to the center badge of the current logo */}
      <span className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-accent/60">
        <Image src="/img/logo.png" alt="" fill sizes="40px" className="scale-[1.55] object-cover" />
      </span>
      <span className="font-display text-xl font-bold uppercase tracking-wide">{name}</span>
    </span>
  );
}
