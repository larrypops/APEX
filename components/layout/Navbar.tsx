import { Badge } from "@/components/ui/Badge";
import { BrandMark } from "@/components/layout/BrandMark";
import { CartIcon, ContactIcon, HomeIcon, MenuIcon, ShopIcon } from "@/components/ui/Icons";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/shop", label: "Shop", icon: ShopIcon },
  { href: "/contact-us", label: "Contact Us", icon: ContactIcon },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(123,173,225,0.12)] bg-[rgba(7,17,32,0.82)] backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <BrandMark compact light />

          <div className="flex items-center justify-between gap-3 lg:flex-1 lg:justify-end">
            <nav className="flex flex-wrap items-center gap-2 md:gap-3">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-[rgba(142,226,255,0.18)] hover:bg-white/6 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-sky-200" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(123,173,225,0.14)] bg-white/8 text-sky-100 lg:hidden">
              <MenuIcon className="h-4 w-4" />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="warning">Ready to Order</Badge>
            <Link
              href="/shop"
              className="rounded-full border border-[rgba(123,173,225,0.14)] bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-[rgba(142,226,255,0.5)] hover:bg-white/14"
            >
              <span className="inline-flex items-center gap-2">
                <CartIcon className="h-4 w-4 text-sky-100" />
                <span>View Catalog</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
