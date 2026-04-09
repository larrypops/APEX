import { NextResponse } from "next/server";
import { products } from "@/data/products";

export function GET() {
  return NextResponse.json({
    count: products.length,
    products,
  });
}
