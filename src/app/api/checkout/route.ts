import { NextRequest, NextResponse } from "next/server";
import { sendMetaConversionEvent } from "@/lib/meta";

const CHECKOUT_URLS: Record<string, string> = {
  POLAR_TARS_CONVERSA_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_hwz8MqSiebRo1jWq3bFZUw95ZiMMnPBgWxyGp21Tczi",
  POLAR_FINFLOCK_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_fWqcckhFNzAB7ixYDxh7rWISHr5594Eg1xqrU4G1t4l",
  POLAR_GMAPS_SCRAPER_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_EMAXx5XynwtI60v4zneFK7s5MIOPgLwbfyfuC0mD2kY",
  POLAR_HASHTRIC_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_EYJAOWPX2OjFZKX2k5d2sh1SvMZ1StMNFsd4B2WZ8Wo",
  POLAR_JOBIFY_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_mGvhZKAc38nUf73hqUjejY1AETomUwqyJ14hq1FzdLN",
  POLAR_AUTOSTREAM_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_QpKcKEtafKDPIqE57YwBw4307jLn4gnEajA4C0HHoAZ",
  POLAR_RESUMOD_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_f0tV9CpoO6PlgUAUDQ4sJhfusgKx2yB88tf4404lfJT",
  POLAR_TREND_ANALYZER_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_q7d1pEVqU8j3VkqErChwYyS3qL2tcpuHvhXuV1U0om7",
  POLAR_PLUMBER_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_NyRJWUMbWZmmVzbCxycMW3OroRpaP3vkGkyDH2ji5HQ",
  POLAR_DENTAL_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_n16HAY8YEzHDKEgr8BLRcWWMQJT7HJ0bRhnHK1n4vZI",
  POLAR_REALESTATE_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_DPC58EtoiCbpZDvr0CC2uz8QZO0wY9saJZ4Ln1NFNIO",
  POLAR_RESTAURANT_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_DPC58EtoiCbpZDvr0CC2uz8QZO0wY9saJZ4Ln1NFNIO",
  POLAR_HVAC_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_pgXhPjyqkCQvgrTPjFnIkjbSDZmxxsqhbhcb80jgJQB",
  POLAR_CLEANING_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_XjjPsPWl8y0tEy1SeScChB4l7IjAIK9OShqc829s1yZ",
  POLAR_FITNESS_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_RSp7iQym6bJ3a6AJsEWuh9uLPN8Z7KdEt1NIT2UlGxb",
  POLAR_CONTENT_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_GvmE2N3q297ScuWuq9yDgZUXK3ljpd9uvM7F53BjQxK",
  POLAR_LEADMAGNET_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_TxY8t7LvvI1ewGoq9zkBmxkcGWGkEk5PHxbzi3VCiIE",
  POLAR_COLDEMAIL_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_ZmfmWmS4JPoRp2ngXeZfvNx9LgpzcqNLe7B6S1Hj9US",
  POLAR_MEETING_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_7NvwxDigIQfjRw9sj4yjZD0jhb5lJXenNDLf52ykNFd",
  POLAR_SUPPORT_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_fuKQprjfRQcM139Tronia21KwDearDRkagVqG3JFR7l",
  POLAR_PRICE_MONITOR_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_rZc92CrueVCCHRyCf6PsVjeIY884ktO1bMxe90aOf9T",
  POLAR_RESUME_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_BxW9jZPZAqC6GLs3Tz8DQNGzMX5MVSnMXwySX0OrvKY",
  POLAR_SOCIAL_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_sM6RbGQeVK0KCLrm2DCn9lD6T6VaJSPLZE2Ku2eOTId",
  POLAR_COMPLETE_BUNDLE_CHECKOUT_URL: "https://buy.polar.sh/polar_cl_4cm59WRQKhRSQORVp3xSlgtxoQQk8a55uhkpk3EZ380",
};

const getPriceId = (envVarName: string) => process.env[envVarName];
const getCheckoutUrl = (envVarName: string) => process.env[envVarName] || CHECKOUT_URLS[envVarName];

// Product ID mapping from Polar
const PRODUCT_PRICES: Record<string, { checkoutUrl?: string; priceId?: string; name: string; price: number }> = {
  // Individual Codebases (8 products)
  "tars-conversa-ai-livechat": {
    checkoutUrl: getCheckoutUrl("POLAR_TARS_CONVERSA_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_TARS_CONVERSA_PRICE_ID"),
    name: "TARS-CONVERSA — AI LiveChat Engine",
    price: 4900,
  },
  "finflock-algorithmic-trading": {
    checkoutUrl: getCheckoutUrl("POLAR_FINFLOCK_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_FINFLOCK_PRICE_ID"),
    name: "Finflock — Algorithmic Trading Engine",
    price: 2900,
  },
  "gmaps-scraper-ai-outreach": {
    checkoutUrl: getCheckoutUrl("POLAR_GMAPS_SCRAPER_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_GMAPS_SCRAPER_PRICE_ID"),
    name: "GMaps Scraper — AI Cold Outreach Engine",
    price: 3500,
  },
  "hashtric-marketing-intelligence": {
    checkoutUrl: getCheckoutUrl("POLAR_HASHTRIC_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_HASHTRIC_PRICE_ID"),
    name: "Hashtric — Marketing Intelligence OS",
    price: 4900,
  },
  "jobify-universal-ats-extension": {
    checkoutUrl: getCheckoutUrl("POLAR_JOBIFY_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_JOBIFY_PRICE_ID"),
    name: "Jobify — Universal ATS Chrome Extension",
    price: 3000,
  },
  "autostream-social-lead-agent": {
    checkoutUrl: getCheckoutUrl("POLAR_AUTOSTREAM_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_AUTOSTREAM_PRICE_ID"),
    name: "AutoStream — Social-to-Lead AI Agent",
    price: 1900,
  },
  "resumod-ats-optimizer-extension": {
    checkoutUrl: getCheckoutUrl("POLAR_RESUMOD_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_RESUMOD_PRICE_ID"),
    name: "Resumod — ATS Resume Optimizer Extension",
    price: 3900,
  },
  "trend-analyzer-threat-intelligence": {
    checkoutUrl: getCheckoutUrl("POLAR_TREND_ANALYZER_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_TREND_ANALYZER_PRICE_ID"),
    name: "Trend Analyzer — Social Threat Intelligence",
    price: 2500,
  },
    // Workflows & Voice Agents — $19 each
  "plumber-voice-agent": {
    checkoutUrl: getCheckoutUrl("POLAR_PLUMBER_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_PLUMBER_PRICE_ID"),
    name: "Plumber Voice Agent",
    price: 1900,
  },
  "dental-appointment-booking": {
    checkoutUrl: getCheckoutUrl("POLAR_DENTAL_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_DENTAL_PRICE_ID"),
    name: "Dental Appointment Booking",
    price: 1900,
  },
  "real-estate-lead-qualification": {
    checkoutUrl: getCheckoutUrl("POLAR_REALESTATE_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_REALESTATE_PRICE_ID"),
    name: "Real Estate Lead Qualification",
    price: 1900,
  },
  "restaurant-whatsapp-order": {
    checkoutUrl: getCheckoutUrl("POLAR_RESTAURANT_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_RESTAURANT_PRICE_ID"),
    name: "Restaurant WhatsApp Order",
    price: 1900,
  },
  "hvac-emergency-dispatch": {
    checkoutUrl: getCheckoutUrl("POLAR_HVAC_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_HVAC_PRICE_ID"),
    name: "HVAC Emergency Dispatch",
    price: 1900,
  },
  "cleaning-service-quote": {
    checkoutUrl: getCheckoutUrl("POLAR_CLEANING_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_CLEANING_PRICE_ID"),
    name: "Cleaning Service Quote",
    price: 1900,
  },
  "fitness-coach-followup": {
    checkoutUrl: getCheckoutUrl("POLAR_FITNESS_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_FITNESS_PRICE_ID"),
    name: "Fitness Coach Follow-Up",
    price: 1900,
  },
  "content-repurposing": {
    checkoutUrl: getCheckoutUrl("POLAR_CONTENT_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_CONTENT_PRICE_ID"),
    name: "Content Repurposing",
    price: 1900,
  },
  "lead-magnet-generator": {
    checkoutUrl: getCheckoutUrl("POLAR_LEADMAGNET_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_LEADMAGNET_PRICE_ID"),
    name: "Lead Magnet Generator",
    price: 1900,
  },
  "cold-email-personalizer": {
    checkoutUrl: getCheckoutUrl("POLAR_COLDEMAIL_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_COLDEMAIL_PRICE_ID"),
    name: "Cold Email Personalizer",
    price: 1900,
  },
  "meeting-summarizer": {
    checkoutUrl: getCheckoutUrl("POLAR_MEETING_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_MEETING_PRICE_ID"),
    name: "Meeting Summarizer",
    price: 1900,
  },
  "support-ticket-router": {
    checkoutUrl: getCheckoutUrl("POLAR_SUPPORT_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_SUPPORT_PRICE_ID"),
    name: "Support Ticket Router",
    price: 1900,
  },
  "competitor-price-monitor": {
    checkoutUrl: getCheckoutUrl("POLAR_PRICE_MONITOR_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_PRICE_MONITOR_PRICE_ID"),
    name: "Competitor Price Monitor",
    price: 1900,
  },
  "resume-screening": {
    checkoutUrl: getCheckoutUrl("POLAR_RESUME_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_RESUME_PRICE_ID"),
    name: "Resume Screening",
    price: 1900,
  },
  "social-comment-responder": {
    checkoutUrl: getCheckoutUrl("POLAR_SOCIAL_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_SOCIAL_PRICE_ID"),
    name: "Social Comment Responder",
    price: 1900,
  },
  "starter-codebase-pack": {
    checkoutUrl: getCheckoutUrl("POLAR_STARTER_CODEBASE_PACK_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_STARTER_CODEBASE_PACK_PRICE_ID"),
    name: "Starter Codebase Pack",
    price: 12700,
  },
  // Single All-Access Plan
  "complete-bundle": {
    checkoutUrl: getCheckoutUrl("POLAR_COMPLETE_BUNDLE_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_COMPLETE_BUNDLE_PRICE_ID"),
    name: "Complete Bundle — All Access",
    price: 35000,
  },
  "developer-pro-pack": {
    checkoutUrl: getCheckoutUrl("POLAR_DEV_PRO_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_DEV_PRO_PRICE_ID"),
    name: "Developer Pro Pack",
    price: 29700,
  },
  "agency-arsenal": {
    checkoutUrl: getCheckoutUrl("POLAR_AGENCY_ARSENAL_CHECKOUT_URL"),
    priceId: getPriceId("POLAR_AGENCY_ARSENAL_PRICE_ID"),
    name: "Agency Arsenal",
    price: 49700,
  },
  "niche-voice-agents-pack": {
    checkoutUrl: getCheckoutUrl("POLAR_NICHE_VOICE_AGENTS_PACK_CHECKOUT_URL"),
    priceId: "1a95a61e-68a9-4ae3-8206-cad00b4a0734",
    name: "Niche Voice Agents Pack",
    price: 14700,
  },
  "ai-marketing-pack": {
    checkoutUrl: getCheckoutUrl("POLAR_AI_MARKETING_PACK_CHECKOUT_URL"),
    priceId: "1a95a61e-68a9-4ae3-8206-cad00b4a0734",
    name: "AI Marketing Pack",
    price: 12700,
  },
  "business-operations-pack": {
    checkoutUrl: getCheckoutUrl("POLAR_BUSINESS_OPERATIONS_PACK_CHECKOUT_URL"),
    priceId: "1a95a61e-68a9-4ae3-8206-cad00b4a0734",
    name: "Business Operations Pack",
    price: 14700,
  },
  "master-bundle": {
    checkoutUrl: getCheckoutUrl("POLAR_MASTER_BUNDLE_CHECKOUT_URL"),
    priceId: "1712b635-0d78-43b5-9cc9-4611caf268de",
    name: "Complete Bundle — Everything",
    price: 59700,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { productSlug, priceId, eventId, fbp, fbc, email, externalId } = await req.json();

    const product = PRODUCT_PRICES[productSlug];
    
    if (!product) {
      return NextResponse.json(
        { error: "Invalid product. Please select a valid product." },
        { status: 400 }
      );
    }

    const selectedPriceId = priceId || product?.priceId;
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const eventSourceUrl = `${origin}/pricing`;
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    if (eventId && product) {
      void sendMetaConversionEvent({
        eventName: "InitiateCheckout",
        eventId,
        eventSourceUrl,
        userData: {
          em: typeof email === "string" ? email : undefined,
          external_id: typeof externalId === "string" ? externalId : "anonymous",
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          fbp: typeof fbp === "string" ? fbp : undefined,
          fbc: typeof fbc === "string" ? fbc : undefined,
        },
        customData: {
          value: product.price / 100,
          currency: "USD",
          content_name: product.name,
          content_ids: [productSlug],
          content_type: "product",
        },
        testEventCode: process.env.META_CAPI_TEST_EVENT_CODE,
      });
    }

    if (product.checkoutUrl) {
      return NextResponse.json({
        success: true,
        checkoutUrl: product.checkoutUrl,
      });
    }

    if (!selectedPriceId) {
      return NextResponse.json(
        { error: "Invalid product configuration." },
        { status: 400 }
      );
    }

    // Get Polar access token
    const polarToken = process.env.POLAR_ACCESS_TOKEN;

    if (!polarToken || polarToken === "pol_test_xxx" || polarToken === "pol_live_xxx") {
      return NextResponse.json(
        { error: `Polar checkout is not configured for ${product.name}. Add a checkout URL or real Polar access token and price ID.` },
        { status: 500 }
      );
    }

    if (!product.priceId) {
      return NextResponse.json(
        { error: `Missing Polar price ID for ${product.name}.` },
        { status: 500 }
      );
    }

    // Create actual Polar checkout
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
        metadata: {
          user_id: "anonymous",
          product_slug: productSlug,
          product_name: product.name,
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
