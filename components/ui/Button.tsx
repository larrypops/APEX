import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
  trailingIcon?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = false,
  trailingIcon = false,
}: ButtonProps) {
  const base =
    "button-motion inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[rgba(21,152,255,0.28)]";
  const tone =
    variant === "secondary"
      ? "border border-[rgba(18,52,88,0.14)] bg-white/90 text-slate-900 hover:border-[rgba(0,105,217,0.42)] hover:bg-white"
      : "bg-[linear-gradient(135deg,#17b0ff_0%,#0b7cff_52%,#0a5ed7_100%)] text-white shadow-[0_18px_36px_rgba(10,94,215,0.26)] hover:shadow-[0_22px_44px_rgba(10,94,215,0.34)]";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${tone} ${className}`.trim()}
      >
        {children}
        {trailingIcon ? <ArrowRightIcon className="ml-2 h-4 w-4" /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${tone} ${className}`.trim()}>
      {children}
      {trailingIcon ? <ArrowRightIcon className="ml-2 h-4 w-4" /> : null}
    </Link>
  );
}
