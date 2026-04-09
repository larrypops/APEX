import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-shell py-16">
      <div className="surface rounded-[28px] p-10 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">
          Product page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-neutral-600">
          The requested product is missing from the local static catalog. Head back to the shop to
          continue browsing.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/shop">Go to Shop</Button>
        </div>
      </div>
    </div>
  );
}
