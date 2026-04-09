import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  light?: boolean;
  showText?: boolean;
};

export function BrandMark({
  compact = false,
  light = false,
  showText = true,
}: BrandMarkProps) {
  const frameStyles = light
    ? "border-white/14 bg-white/10 shadow-none"
    : "border-[rgba(15,23,42,0.08)] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.06)]";

  return (
    <Link href="/" aria-label="APEX LASER GROUP home" className="flex items-center gap-2.5">
      <div
        className={`overflow-hidden rounded-[16px] border ${frameStyles} ${
          compact ? "h-11 w-11 md:h-12 md:w-12" : "h-14 w-14 md:h-16 md:w-16"
        }`}
      >
        <Image
          src="/images/brand/apex-logo.jpg"
          alt="APEX LASER GROUP logo"
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
          priority={compact}
        />
      </div>
      {showText ? (
        <p className={`text-base font-semibold md:text-lg ${light ? "text-white" : "text-slate-950"}`}>
          APEX LASER GROUP
        </p>
      ) : null}
    </Link>
  );
}
