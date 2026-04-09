"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { CartIcon, CloseIcon, MenuIcon } from "@/components/ui/Icons";

type NavLink = {
  href: string;
  label: string;
};

type NavbarClientProps = {
  cartAmount: string;
  navLinks: NavLink[];
};

export function NavbarClient({ cartAmount, navLinks }: NavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
      <div className="container-shell py-2.5 md:py-3.5">
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-6 md:grid lg:gap-8">
          <div className="justify-self-start">
            <BrandMark compact={false} />
          </div>

          <nav className="justify-self-center flex items-center gap-1 text-sm font-medium text-neutral-700 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 whitespace-nowrap transition hover:bg-[#f5f7fa] hover:text-neutral-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-4 lg:gap-6">
            <span className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[#fbfbfc] px-3 text-sm font-semibold text-neutral-900">
              <span className="text-base" aria-hidden="true">
                🇬🇧
              </span>
              <span>EN</span>
            </span>

            <Link
              href="/shop"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[#fbfbfc] px-3.5 text-sm font-semibold text-neutral-900 transition hover:border-[rgba(17,117,209,0.24)] hover:bg-white"
              aria-label={`Cart total ${cartAmount}`}
            >
              <CartIcon className="h-4 w-4 text-[var(--accent-strong)]" />
              <span>Cart</span>
              <span>{cartAmount}</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:hidden">
          <div className="min-w-0 shrink">
            <BrandMark compact showText={false} />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[#fbfbfc] px-3 text-sm font-semibold text-neutral-900 transition hover:border-[rgba(17,117,209,0.24)] hover:bg-white"
              aria-label={`Cart total ${cartAmount}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <CartIcon className="h-4 w-4 text-[var(--accent-strong)]" />
              <span>{cartAmount}</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[#fbfbfc] text-neutral-900 transition hover:border-[rgba(17,117,209,0.24)] hover:bg-white"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="mt-3 rounded-2xl border border-[var(--border)] bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)] md:hidden">
            <nav className="grid gap-1 text-sm font-medium text-neutral-800">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-3 transition hover:bg-[#f5f7fa] hover:text-neutral-950"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[#fbfbfc] px-3 py-2.5">
              <span className="text-sm font-medium text-neutral-600">Language</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
                <span aria-hidden="true">🇬🇧</span>
                <span>EN</span>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
