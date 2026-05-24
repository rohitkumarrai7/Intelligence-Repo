import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productSlug = searchParams.get("product");

    if (!productSlug) {
      return NextResponse.redirect(new URL("/pricing", req.url));
    }

    return NextResponse.redirect(new URL(`/products/${productSlug}`, req.url));
  } catch (error) {
    console.error("Checkout redirect error:", error);
    return NextResponse.redirect(new URL("/pricing", req.url));
  }
}
