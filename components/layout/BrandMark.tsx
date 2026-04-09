import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  light?: boolean;
};

export function BrandMark({ compact = false, light = false }: BrandMarkProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div
        className={`overflow-hidden rounded-2xl border border-white/10 bg-[#071121] shadow-[0_14px_34px_rgba(5,14,32,0.24)] ${
          compact ? "h-14 w-14" : "h-16 w-16"
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
      <div>
        <p
          className={`text-xs uppercase tracking-[0.24em] ${
            light ? "text-sky-100/72" : "text-slate-500"
          }`}
        >
          Enterprise Catalog
        </p>
        <p className={`text-base font-semibold ${light ? "text-white" : "text-slate-950"}`}>
          APEX LASER GROUP
        </p>
      </div>
    </Link>
  );
}
