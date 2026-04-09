import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "warning";
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles =
    variant === "warning"
      ? "bg-[var(--accent-soft)] text-[var(--accent-strong)] border-[rgba(207,63,35,0.16)]"
      : "bg-white text-neutral-700 border-[var(--border)]";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${styles}`}
    >
      {children}
    </span>
  );
}
