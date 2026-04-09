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
      className={`surface-soft flex w-full items-center gap-4 rounded-[24px] border p-4 text-left transition ${
        selected
          ? "border-[var(--accent)] bg-[var(--accent-soft)] ring-2 ring-[rgba(207,63,35,0.12)]"
          : "border-[var(--border)] bg-white"
      }`}
      aria-pressed={selected}
    >
      <div className="flex h-14 w-20 items-center justify-center rounded-2xl border border-[var(--border)] bg-white p-2">
        <Image src={logo} alt={`${label} logo`} width={72} height={36} className="h-auto w-auto" />
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-950">{label}</p>
        <p className="mt-1 text-sm leading-6 text-neutral-600">{helper}</p>
      </div>
    </button>
  );
}
