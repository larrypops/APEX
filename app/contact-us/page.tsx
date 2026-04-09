import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Contact APEX LASER GROUP",
  description:
    "Contact APEX LASER GROUP for product information, OEM discussions, project matching, lead times, and enterprise laser equipment inquiries.",
  path: "/contact-us",
  keywords: ["contact laser supplier", "OEM laser inquiry", "APEX LASER GROUP contact"],
});

export default function ContactPage() {
  return (
    <div className="container-shell py-6 md:py-10">
      <section className="surface fade-up rounded-[28px] p-6 md:p-10">
        <Badge>Contact Us</Badge>
        <h1 className="section-title mt-4">Talk to APEX LASER GROUP</h1>
        <p className="section-copy mt-4 max-w-2xl">
          Contact our team for quotations, product recommendations, bulk orders, technical
          questions, and delivery coordination across the APEX LASER GROUP catalog.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-700">Direct Contacts</p>
            <div className="mt-4 space-y-3 text-neutral-800">
              <p>WhatsApp / WeChat: +86-15305304222</p>
              <p>Line ID: 86-15305304222</p>
              <p>KakaoTalk ID: K-15305304222</p>
              <p>Telegram: @LaserIgniter</p>
              <p>Phone: +1(329)228-8566</p>
            </div>
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--accent-soft)] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-700">Availability</p>
            <div className="mt-4 space-y-3 text-neutral-800">
              <p>Address: 30 N Gould St Num 39904 Sheridan, WY 82801</p>
              <p>Hours: 00:00 - 24:00</p>
              <p>Response Window: within one business day</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href="https://wa.me/237XXXXXXXXX?text=Hello,%20I%20am%20interested%20in%20your%20laser%20products"
            external
          >
            Contact on WhatsApp
          </Button>
          <Button href="/shop" variant="secondary">
            Back to Catalog
          </Button>
        </div>
      </section>
    </div>
  );
}
