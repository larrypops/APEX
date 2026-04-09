import { Badge } from "@/components/ui/Badge";
import { BrandMark } from "@/components/layout/BrandMark";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact-us", label: "Contact Us" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[rgba(247,247,244,0.86)] backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <BrandMark compact />

          <nav className="flex flex-wrap items-center gap-3 md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-700 transition hover:text-neutral-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="warning">SSR Catalog</Badge>
            <Link
              href="/shop"
              className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
            >
              Cart (0)
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
