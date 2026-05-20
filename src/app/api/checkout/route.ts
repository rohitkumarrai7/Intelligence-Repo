import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Product ID mapping from Polar
const PRODUCT_PRICES: Record<string, { priceId: string; name: string; price: number }> = {
  "niche-voice-agents-pack": {
    priceId: "1a95a61e-68a9-4ae3-8206-cad00b4a0734",
    name: "Niche Voice Agents Pack",
    price: 14700,
  },
  "ai-marketing-pack": {
    priceId: "1a95a61e-68a9-4ae3-8206-cad00b4a0734",
    name: "AI Marketing Pack",
    price: 12700,
  },
  "business-operations-pack": {
    priceId: "1a95a61e-68a9-4ae3-8206-cad00b4a0734",
    name: "Business Operations Pack",
    price: 14700,
  },
  "master-bundle": {
    priceId: "1712b635-0d78-43b5-9cc9-4611caf268de",
    name: "Master Bundle - All 15 Workflows",
    price: 29700,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const { productSlug, priceId } = await req.json();

    // Get product details
    const product = PRODUCT_PRICES[productSlug];
    
    if (!product && !priceId) {
      return NextResponse.json(
        { error: "Invalid product. Please select a valid product." },
        { status: 400 }
      );
    }

    const selectedPriceId = priceId || product?.priceId;

    if (!selectedPriceId) {
      return NextResponse.json(
        { error: "Invalid product configuration." },
        { status: 400 }
      );
    }

    // Get Polar access token
    const polarToken = process.env.POLAR_ACCESS_TOKEN;

    // Demo mode if no real token
    if (!polarToken || polarToken === "pol_test_xxx" || polarToken === "pol_live_xxx") {
      const price = product?.price || 29700;
      return NextResponse.json({
        success: true,
        demo: true,
        checkoutUrl: `/checkout/success?demo=true&product=${productSlug}&price=${price}`,
        message: "Demo mode - purchase simulation",
      });
    }

    // Create actual Polar checkout
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const successUrl = `${origin}/checkout/success?checkout_id={CHECKOUT_ID}&product=${productSlug}`;
    const cancelUrl = `${origin}/pricing`;

    const response = await fetch("https://api.polar.sh/v1/checkouts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${polarToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_price_id: selectedPriceId,
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: "customer@example.com",
        metadata: {
          user_id: userId || "anonymous",
          product_slug: productSlug,
          product_name: product?.name || "Unknown",
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Polar checkout error:", error);
      return NextResponse.json(
        { error: "Failed to create checkout. Please try again." },
        { status: 500 }
      );
    }

    const checkout = await response.json();

    return NextResponse.json({
      success: true,
      checkoutUrl: checkout.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}