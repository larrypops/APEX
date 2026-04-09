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
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
      <div className="container-shell py-2 md:py-3">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="justify-self-start">
            <span className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[#fbfbfc] px-3 text-sm font-semibold text-neutral-900">
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
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[#fbfbfc] px-3 text-sm font-semibold text-neutral-900 transition hover:border-[rgba(17,117,209,0.24)] hover:bg-white"
              aria-label={`Cart total ${cartAmount}`}
            >
              <CartIcon className="h-4 w-4 text-[var(--accent-strong)]" />
              <span className="hidden md:inline">Cart</span>
              <span>{cartAmount}</span>
            </Link>
          </div>
        </div>

        <nav className="mt-2 grid grid-cols-3 items-center border-t border-[var(--border)] pt-2 text-center text-sm font-medium text-neutral-700 md:mt-3 md:flex md:justify-center md:gap-8 md:border-t-0 md:pt-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2 whitespace-nowrap transition hover:bg-[#f5f7fa] hover:text-neutral-950 md:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
