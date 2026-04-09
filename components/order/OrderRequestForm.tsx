"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
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
    helper: "Choose Mastercard for a familiar card-based payment confirmation flow.",
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
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const pricing = getProductPricing(product, currency);

  const orderMeta = useMemo(
    () => ({
      productName: product.name,
      productSlug: product.slug,
      quantity,
      unitPrice: pricing.currentPrice,
      total: pricing.currentPrice * quantity,
      currency,
    }),
    [product, quantity, pricing.currentPrice, currency],
  );

  function handleSubmit(formData: FormData) {
    const nextErrors: Errors = {};
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
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
        <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600">
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

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="First Name" name="firstName" placeholder="Enter your first name" error={errors.firstName} />
          <Field label="Last Name" name="lastName" placeholder="Enter your last name" error={errors.lastName} />
          <Field label="Phone Number" name="phone" type="tel" placeholder="Enter your phone number" error={errors.phone} />
          <Field label="Email Address" name="email" type="email" placeholder="Enter your email address" error={errors.email} />
          <Field label="City" name="city" placeholder="City" />
          <Field label="State / Region" name="state" placeholder="State or region" />
          <div className="md:col-span-2">
            <Field label="Country" name="country" placeholder="Country" />
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
                className="w-full rounded-[22px] border border-[var(--border)] bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
              />
            </label>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <p className="text-sm font-semibold text-neutral-900">Preferred payment method</p>
            <p className="mt-1 text-sm leading-7 text-neutral-600">
              Select the payment method you would prefer during order confirmation.
            </p>
          </div>
          <div className="grid gap-4">
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
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            Your selected payment method will be used as your preferred payment option during order
            confirmation.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-[24px] border border-[var(--border)] bg-neutral-50 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-900">Ready to submit your order?</p>
            <p className="mt-1 text-sm leading-7 text-neutral-600">
              We will contact you to confirm your order details.
            </p>
          </div>
          <button
            type="submit"
            className="button-motion inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[rgba(207,63,35,0.24)] hover:bg-[var(--accent-strong)]"
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
        className={`w-full rounded-[22px] border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 ${
          error ? "border-red-400" : "border-[var(--border)]"
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
