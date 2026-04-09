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
    <header className="sticky top-0 z-50 border-b border-[rgba(123,173,225,0.12)] bg-[rgba(7,17,32,0.82)] backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <BrandMark compact light />

          <nav className="flex flex-wrap items-center gap-3 md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-200 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="warning">Ready to Order</Badge>
            <Link
              href="/shop"
              className="rounded-full border border-[rgba(123,173,225,0.14)] bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-[rgba(142,226,255,0.5)] hover:bg-white/14"
            >
              View Catalog
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
