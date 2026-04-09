import Link from "next/link";

export default function OrderNotFound() {
  return (
    <div className="container-shell py-16">
      <div className="surface rounded-[28px] p-10 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">Order</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">
          We could not find the selected product
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-neutral-600">
          Return to the catalog and choose a valid product before completing your order request.
        </p>
        <Link
          href="/shop"
          className="button-motion mt-8 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
