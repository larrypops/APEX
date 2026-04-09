"use client";

import { useState } from "react";
import { BrandMark } from "@/components/layout/BrandMark";
import { CartIcon, CloseIcon, ContactIcon, HomeIcon, MenuIcon, ShopIcon } from "@/components/ui/Icons";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/shop", label: "Shop", icon: ShopIcon },
  { href: "/contact-us", label: "Contact Us", icon: ContactIcon },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(123,173,225,0.12)] bg-[rgba(7,17,32,0.82)] backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="flex items-center justify-between gap-3">
          <BrandMark compact light />

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(123,173,225,0.14)] bg-white/10 text-white transition hover:border-[rgba(142,226,255,0.5)] hover:bg-white/14 lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>

          <div className="hidden items-center gap-3 lg:flex lg:flex-1 lg:justify-end">
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
            <Link
              href="/shop"
              className="inline-flex w-full items-center justify-center rounded-full border border-[rgba(123,173,225,0.14)] bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-[rgba(142,226,255,0.5)] hover:bg-white/14 sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                <CartIcon className="h-4 w-4 text-sky-100" />
                <span>View Catalog</span>
              </span>
            </Link>
          </div>
        </div>

        {isOpen ? (
          <div className="mt-4 rounded-[24px] border border-[rgba(123,173,225,0.14)] bg-[rgba(10,22,42,0.96)] p-3 shadow-[0_22px_48px_rgba(2,8,20,0.35)] lg:hidden">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-3 rounded-[18px] border border-transparent px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-[rgba(142,226,255,0.18)] hover:bg-white/6 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-sky-200" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full border border-[rgba(123,173,225,0.14)] bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-[rgba(142,226,255,0.5)] hover:bg-white/14"
              >
                <span className="inline-flex items-center gap-2">
                  <CartIcon className="h-4 w-4 text-sky-100" />
                  <span>View Catalog</span>
                </span>
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
