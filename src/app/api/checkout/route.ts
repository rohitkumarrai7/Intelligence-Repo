import { NextRequest, NextResponse } from "next/server";

// Product ID mapping from Polar
const PRODUCT_PRICES: Record<string, { priceId: string; name: string; price: number }> = {
  // Individual Codebases (8 products)
  "tars-conversa-ai-livechat": {
    priceId: "POLAR_TARS_CONVERSA_PRICE_ID",
    name: "TARS-CONVERSA — AI LiveChat Engine",
    price: 7900,
  },
  "finflock-algorithmic-trading": {
    priceId: "POLAR_FINFLOCK_PRICE_ID",
    name: "Finflock — Algorithmic Trading Engine",
    price: 9700,
  },
  "gmaps-scraper-ai-outreach": {
    priceId: "POLAR_GMAPS_SCRAPER_PRICE_ID",
    name: "GMaps Scraper — AI Cold Outreach Engine",
    price: 12700,
  },
  "hashtric-marketing-intelligence": {
    priceId: "POLAR_HASHTRIC_PRICE_ID",
    name: "Hashtric — Marketing Intelligence OS",
    price: 19700,
  },
  "jobify-universal-ats-extension": {
    priceId: "POLAR_JOBIFY_PRICE_ID",
    name: "Jobify — Universal ATS Chrome Extension",
    price: 9700,
  },
  "autostream-social-lead-agent": {
    priceId: "POLAR_AUTOSTREAM_PRICE_ID",
    name: "AutoStream — Social-to-Lead AI Agent",
    price: 14700,
  },
  "resumod-ats-optimizer-extension": {
    priceId: "POLAR_RESUMOD_PRICE_ID",
    name: "Resumod — ATS Resume Optimizer Extension",
    price: 6700,
  },
  "trend-analyzer-threat-intelligence": {
    priceId: "POLAR_TREND_ANALYZER_PRICE_ID",
    name: "Trend Analyzer — Social Threat Intelligence",
    price: 14900,
  },
    // Workflows & Voice Agents — $19 each
  "plumber-voice-agent": {
    priceId: "POLAR_PLUMBER_PRICE_ID",
    name: "Plumber Voice Agent",
    price: 1900,
  },
  "dental-appointment-booking": {
    priceId: "POLAR_DENTAL_PRICE_ID",
    name: "Dental Appointment Booking",
    price: 1900,
  },
  "real-estate-lead-qualification": {
    priceId: "POLAR_REALESTATE_PRICE_ID",
    name: "Real Estate Lead Qualification",
    price: 1900,
  },
  "restaurant-whatsapp-order": {
    priceId: "POLAR_RESTAURANT_PRICE_ID",
    name: "Restaurant WhatsApp Order",
    price: 1900,
  },
  "hvac-emergency-dispatch": {
    priceId: "POLAR_HVAC_PRICE_ID",
    name: "HVAC Emergency Dispatch",
    price: 1900,
  },
  "cleaning-service-quote": {
    priceId: "POLAR_CLEANING_PRICE_ID",
    name: "Cleaning Service Quote",
    price: 1900,
  },
  "fitness-coach-followup": {
    priceId: "POLAR_FITNESS_PRICE_ID",
    name: "Fitness Coach Follow-Up",
    price: 1900,
  },
  "content-repurposing": {
    priceId: "POLAR_CONTENT_PRICE_ID",
    name: "Content Repurposing",
    price: 1900,
  },
  "lead-magnet-generator": {
    priceId: "POLAR_LEADMAGNET_PRICE_ID",
    name: "Lead Magnet Generator",
    price: 1900,
  },
  "cold-email-personalizer": {
    priceId: "POLAR_COLDEMAIL_PRICE_ID",
    name: "Cold Email Personalizer",
    price: 1900,
  },
  "meeting-summarizer": {
    priceId: "POLAR_MEETING_PRICE_ID",
    name: "Meeting Summarizer",
    price: 1900,
  },
  "support-ticket-router": {
    priceId: "POLAR_SUPPORT_PRICE_ID",
    name: "Support Ticket Router",
    price: 1900,
  },
  "competitor-price-monitor": {
    priceId: "POLAR_PRICE_MONITOR_PRICE_ID",
    name: "Competitor Price Monitor",
    price: 1900,
  },
  "resume-screening": {
    priceId: "POLAR_RESUME_PRICE_ID",
    name: "Resume Screening",
    price: 1900,
  },
  "social-comment-responder": {
    priceId: "POLAR_SOCIAL_PRICE_ID",
    name: "Social Comment Responder",
    price: 1900,
  },
  // Single All-Access Plan
  "complete-bundle": {
    priceId: "POLAR_COMPLETE_BUNDLE_PRICE_ID",
    name: "Complete Bundle — All Access",
    price: 30000,
  },
  "developer-pro-pack": {
    priceId: "POLAR_DEV_PRO_PRICE_ID",
    name: "Developer Pro Pack",
    price: 29700,
  },
  "agency-arsenal": {
    priceId: "POLAR_AGENCY_ARSENAL_PRICE_ID",
    name: "Agency Arsenal",
    price: 49700,
  },
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
    name: "Complete Bundle — Everything",
    price: 59700,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { productSlug, priceId } = await req.json();

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
          user_id: "anonymous",
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