import Image from "next/image";

type PaymentMethodCardProps = {
  value: "visa" | "mastercard" | "paypal";
  label: string;
  helper: string;
  logo: string;
  selected: boolean;
  onSelect: (value: "visa" | "mastercard" | "paypal") => void;
};

export function PaymentMethodCard({
  value,
  label,
  helper,
  logo,
  selected,
  onSelect,
}: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`surface-soft flex w-full items-center gap-4 rounded-[24px] border p-4 text-left transition md:flex-col md:items-start md:gap-5 ${
        selected
          ? "border-[var(--accent)] bg-[linear-gradient(180deg,rgba(232,246,255,0.96)_0%,rgba(218,240,255,0.92)_100%)] ring-2 ring-[rgba(21,152,255,0.14)]"
          : "border-[var(--border)] bg-white/94"
      }`}
      aria-pressed={selected}
    >
      <div className="flex w-full items-center justify-between gap-3 md:block">
        <div className="flex h-14 w-20 items-center justify-center rounded-2xl border border-[rgba(120,162,200,0.16)] bg-white p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <Image src={logo} alt={`${label} logo`} width={72} height={36} className="h-auto w-auto" />
        </div>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold md:mt-4 ${
            selected
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[rgba(120,162,200,0.26)] text-transparent"
          }`}
        >
          ✓
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-950">{label}</p>
        <p className="mt-1 text-sm leading-6 text-neutral-600">{helper}</p>
      </div>
    </button>
  );
}
