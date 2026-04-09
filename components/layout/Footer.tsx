import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";

const policyLinks = [
  "Shipping Policy",
  "Refund & Return Policy",
  "Privacy Policy",
  "Terms of Service",
  "Contact Us",
  "Tracking Order",
  "Payment Methods",
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-[rgba(123,173,225,0.12)] bg-[linear-gradient(180deg,rgba(7,17,32,0.88)_0%,rgba(5,12,24,0.94)_100%)]">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1fr_0.9fr]">
        <div>
          <BrandMark light />
          <p className="mt-5 text-sm uppercase tracking-[0.24em] text-sky-200/70">Follow Us</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            APEX LASER GROUP customer support and sales contact
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Contact our team for product details, order assistance, bulk requests, and delivery
            coordination for laser equipment and machine orders.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[24px] border border-[rgba(123,173,225,0.14)] bg-white/8 p-5 backdrop-blur-md">
            <p className="text-sm font-semibold text-sky-100/70">Contact</p>
            <div className="mt-4 space-y-2 text-slate-100">
              <p>30 N Gould St Num 39904 Sheridan, WY 82801</p>
              <p>00:00 - 24:00</p>
              <p>+86-15305304222</p>
              <p>+1(329)228-8566</p>
            </div>
          </div>
          <div className="rounded-[24px] border border-[rgba(123,173,225,0.14)] bg-white/8 p-5 backdrop-blur-md">
            <p className="text-sm font-semibold text-sky-100/70">Policies</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {policyLinks.map((item) => (
                <Link
                  key={item}
                  href="/contact-us"
                  className="rounded-full border border-[rgba(123,173,225,0.18)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100 transition hover:border-[rgba(142,226,255,0.5)] hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(123,173,225,0.12)] py-5">
        <p className="text-center text-sm text-slate-300">
          © 2020-2026 APEX LASER GROUP. All rights reserved. Product information and order requests are handled directly by our team.
        </p>
      </div>
    </footer>
  );
}
