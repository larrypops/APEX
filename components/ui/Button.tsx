import type { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "button-motion inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[rgba(207,63,35,0.24)]";
  const tone =
    variant === "secondary"
      ? "border border-[var(--border)] bg-white text-neutral-900 hover:border-neutral-900"
      : "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${tone} ${className}`.trim()}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${tone} ${className}`.trim()}>
      {children}
    </Link>
  );
}
