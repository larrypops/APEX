import { BrandMark } from "@/components/layout/BrandMark";
import Link from "next/link";
import { CartIcon } from "@/components/ui/Icons";
import { getPreferredCurrency } from "@/lib/currency-server";
import { formatPrice } from "@/lib/pricing";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact-us", label: "Contact Us" },
];

export async function Navbar() {
  const currency = await getPreferredCurrency();
  const cartAmount = formatPrice(0, currency);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(123,173,225,0.14)] bg-[rgba(248,251,255,0.96)] backdrop-blur-xl">
      <div className="container-shell py-3 md:py-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="justify-self-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(110,156,206,0.18)] bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-[0_10px_24px_rgba(8,18,33,0.06)]">
              <span className="text-base" aria-hidden="true">
                🇬🇧
              </span>
              <span>EN</span>
            </span>
          </div>

          <div className="justify-self-center">
            <BrandMark compact showText={false} />
          </div>

          <div className="justify-self-end">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(110,156,206,0.18)] bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-[0_10px_24px_rgba(8,18,33,0.06)] transition hover:border-[rgba(21,152,255,0.3)]"
              aria-label={`Cart total ${cartAmount}`}
            >
              <CartIcon className="h-4 w-4 text-[var(--accent-strong)]" />
              <span className="hidden sm:inline">Cart</span>
              <span>{cartAmount}</span>
            </Link>
          </div>
        </div>

        <nav className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-sm font-medium text-neutral-800 md:justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full border border-[rgba(110,156,206,0.16)] bg-white px-4 py-2 transition hover:border-[rgba(21,152,255,0.3)] hover:text-neutral-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
