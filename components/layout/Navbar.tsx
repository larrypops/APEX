import { getPreferredCurrency } from "@/lib/currency-server";
import { formatPrice } from "@/lib/pricing";
import { NavbarClient } from "@/components/layout/NavbarClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact-us", label: "Contact Us" },
];

export async function Navbar() {
  const currency = await getPreferredCurrency();
  const cartAmount = formatPrice(0, currency);

  return <NavbarClient cartAmount={cartAmount} navLinks={navLinks} />;
}
