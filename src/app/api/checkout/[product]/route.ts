import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Redirect to Polar hosted checkout with product
    const { searchParams } = new URL(req.url);
    const productSlug = searchParams.get("product");

    if (!productSlug) {
      return NextResponse.redirect(new URL("/pricing", req.url));
    }

    // For now, redirect to pricing - in production, create checkout via API
    return NextResponse.redirect(new URL(`/pricing?selected=${productSlug}`, req.url));
  } catch (error) {
    console.error("Checkout redirect error:", error);
    return NextResponse.redirect(new URL("/pricing", req.url));
  }
}