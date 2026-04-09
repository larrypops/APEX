"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { flagEmoji, phoneCountries } from "@/data/phoneCountries";
import type { Product } from "@/data/products";
import { PaymentMethodCard } from "@/components/order/PaymentMethodCard";
import type { CurrencyCode } from "@/lib/currency";
import { getProductPricing } from "@/lib/currency";

type PaymentMethod = "visa" | "mastercard" | "paypal";

type OrderRequestFormProps = {
  product: Product;
  quantity: number;
  currency: CurrencyCode;
};

type Errors = Partial<Record<
  | "firstName"
  | "lastName"
  | "phone"
  | "email"
  | "address"
  | "paymentMethod",
  string
>>;

const paymentMethods: Array<{
  value: PaymentMethod;
  label: string;
  helper: string;
  logo: string;
}> = [
  {
    value: "visa",
    label: "Visa",
    helper: "Choose Visa as your preferred payment option during order confirmation.",
    logo: "/images/payments/visa.svg",
  },
  {
    value: "mastercard",
    label: "Mastercard",
    helper: "Choose Mastercard for a familiar card payment option during final confirmation.",
    logo: "/images/payments/mastercard.svg",
  },
  {
    value: "paypal",
    label: "PayPal",
    helper: "Choose PayPal if you prefer a digital wallet during final order confirmation.",
    logo: "/images/payments/paypal.svg",
  },
];

function emailIsValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function OrderRequestForm({ product, quantity, currency }: OrderRequestFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("visa");
  const [phoneCountryCode, setPhoneCountryCode] = useState("US");
  const [phoneValue, setPhoneValue] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const pricing = getProductPricing(product, currency);
  const selectedPhoneCountry =
    phoneCountries.find((country) => country.code === phoneCountryCode) ?? phoneCountries[0];

  const orderMeta = useMemo(
    () => ({
      productName: product.name,
      productSlug: product.slug,
      quantity,
      unitPrice: pricing.currentPrice,
      total: pricing.currentPrice * quantity,
      currency,
      phone: `${selectedPhoneCountry.dialCode} ${phoneValue}`.trim(),
    }),
    [product, quantity, pricing.currentPrice, currency, phoneValue, selectedPhoneCountry.dialCode],
  );

  function handleSubmit(formData: FormData) {
    const nextErrors: Errors = {};
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const phone = phoneValue.trim();
    const email = String(formData.get("email") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();

    if (!firstName) nextErrors.firstName = "First name is required.";
    if (!lastName) nextErrors.lastName = "Last name is required.";
    if (!phone) nextErrors.phone = "Phone number is required.";
    if (!email) nextErrors.email = "Email address is required.";
    if (email && !emailIsValid(email)) nextErrors.email = "Enter a valid email address.";
    if (!address) nextErrors.address = "Delivery address is required.";
    if (!paymentMethod) nextErrors.paymentMethod = "Select a preferred payment method.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    handleSubmit(formData);
  }

  if (submitted) {
    return (
      <div className="surface rounded-[28px] p-6 md:p-8">
        <div className="rounded-[24px] border border-[var(--border)] bg-[var(--accent-soft)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
            Order Received
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
            Thank you. Your order has been received.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-700">
            Our team will contact you shortly to confirm the details, preferred payment method,
            delivery expectations, and next steps for <span className="font-semibold">{product.name}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="surface rounded-[28px] p-6 md:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Complete your order details
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
          Fill in your information so we can process your order
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-700">
          This order request form keeps the premium ecommerce flow while allowing our team to
          confirm pricing, stock, delivery details, and preferred payment method manually.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8" noValidate>
        <input type="hidden" name="productName" value={orderMeta.productName} />
        <input type="hidden" name="productSlug" value={orderMeta.productSlug} />
        <input type="hidden" name="quantity" value={String(orderMeta.quantity)} />
        <input type="hidden" name="unitPrice" value={String(orderMeta.unitPrice)} />
        <input type="hidden" name="currency" value={orderMeta.currency} />
        <input type="hidden" name="phone" value={orderMeta.phone} />
        <input type="hidden" name="country" value={selectedPhoneCountry.name} />

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <Field label="First Name" name="firstName" placeholder="Enter your first name" error={errors.firstName} />
          <Field label="Last Name" name="lastName" placeholder="Enter your last name" error={errors.lastName} />
          <div className="md:col-span-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-neutral-900">Phone Number</span>
              <div className="flex items-center gap-3 rounded-[22px] border border-[rgba(120,162,200,0.18)] bg-[rgba(247,251,255,0.92)] px-4 py-3 transition focus-within:border-[var(--accent)] focus-within:bg-white">
                  <span className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-semibold text-[var(--accent-strong)]">
                    <span>{flagEmoji(selectedPhoneCountry.code)}</span>
                    {selectedPhoneCountry.dialCode}
                  </span>
                  <input
                    type="tel"
                    name="phoneLocal"
                    value={phoneValue}
                    onChange={(event) => setPhoneValue(event.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-500"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
              </div>
              {errors.phone ? (
                <p id="phone-error" className="mt-2 text-sm text-red-600">
                  {errors.phone}
                </p>
              ) : (
                <p className="mt-2 text-sm text-neutral-700">
                  Select your country code and enter your active mobile or WhatsApp number.
                </p>
              )}
            </label>
          </div>
          <Field label="Email Address" name="email" type="email" placeholder="Enter your email address" error={errors.email} />
          <Field label="City" name="city" placeholder="City" />
          <Field label="State / Region" name="state" placeholder="State or region" />
          <div className="md:col-span-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-neutral-900">Country</span>
              <div className="relative">
                <select
                  name="countrySelect"
                  value={phoneCountryCode}
                  onChange={(event) => setPhoneCountryCode(event.target.value)}
                  className="w-full appearance-none rounded-[22px] border border-[rgba(120,162,200,0.18)] bg-[rgba(247,251,255,0.92)] px-4 py-3 pr-10 text-sm text-neutral-900 outline-none transition focus:border-[var(--accent)] focus:bg-white"
                >
                  {phoneCountries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {flagEmoji(country.code)} {country.name} ({country.dialCode})
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
                  v
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-700">
                Changing the country automatically updates the phone code above.
              </p>
            </label>
          </div>
          <div className="md:col-span-2">
            <Field
              label="Delivery Address"
              name="address"
              placeholder="Enter your full delivery address"
              error={errors.address}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-neutral-900">Order Notes</span>
              <textarea
                name="notes"
                rows={4}
                placeholder="Add special instructions, project notes, or delivery details"
                className="w-full rounded-[22px] border border-[rgba(120,162,200,0.18)] bg-[rgba(247,251,255,0.92)] px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[var(--accent)] focus:bg-white"
              />
            </label>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <p className="text-sm font-semibold text-neutral-900">Preferred payment method</p>
            <p className="mt-1 text-sm leading-7 text-neutral-700">
              Select the payment method you would prefer during order confirmation.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.value}
                value={method.value}
                label={method.label}
                helper={method.helper}
                logo={method.logo}
                selected={paymentMethod === method.value}
                onSelect={setPaymentMethod}
              />
            ))}
          </div>
          <input type="hidden" name="paymentMethod" value={paymentMethod} />
          {errors.paymentMethod ? (
            <p className="mt-2 text-sm text-red-600">{errors.paymentMethod}</p>
          ) : null}
          <p className="mt-3 text-sm leading-7 text-neutral-700">
            Your selected payment method will be used as your preferred payment option during order
            confirmation.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-[24px] border border-[rgba(120,162,200,0.16)] bg-[linear-gradient(180deg,rgba(247,251,255,0.92)_0%,rgba(234,243,251,0.92)_100%)] p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-900">Ready to submit your order?</p>
            <p className="mt-1 text-sm leading-7 text-neutral-700">
              We will contact you to confirm your order details.
            </p>
          </div>
          <button
            type="submit"
            className="button-motion inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#17b0ff_0%,#0b7cff_52%,#0a5ed7_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(10,94,215,0.22)] focus:outline-none focus:ring-2 focus:ring-[rgba(21,152,255,0.28)] hover:shadow-[0_22px_42px_rgba(10,94,215,0.32)]"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
};

function Field({ label, name, placeholder, type = "text", error }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-neutral-900">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full rounded-[22px] border px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-[var(--accent)] focus:bg-white ${
          error
            ? "border-red-400 bg-white"
            : "border-[rgba(120,162,200,0.18)] bg-[rgba(247,251,255,0.92)]"
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </label>
  );
}
