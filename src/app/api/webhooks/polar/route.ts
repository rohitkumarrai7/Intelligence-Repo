import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_xxx");

interface CheckoutSuccessData {
  checkout_id: string;
  product_slug: string;
  user_id: string;
  email: string;
  amount: number;
}

const CONTACTS_EMAIL = "Intelligence Repo <orders@intelligencerepo.ai>";
const ADMIN_EMAIL = "support@intelligencerepo.ai";

const PRODUCT_DETAILS: Record<string, { name: string; files: string[] }> = {
  "niche-voice-agents-pack": {
    name: "Niche Voice Agents Pack",
    files: [
      "Plumber Voice Agent - n8n JSON + Setup Guide",
      "Dental Appointment Booking - n8n JSON + Setup Guide",
      "Real Estate Lead Qualification - n8n JSON + Setup Guide",
      "Restaurant WhatsApp Order - n8n JSON + Setup Guide",
      "HVAC Emergency Dispatch - n8n JSON + Setup Guide",
      "Cleaning Service Quote - n8n JSON + Setup Guide",
      "Fitness Coach Follow-Up - n8n JSON + Setup Guide",
    ],
  },
  "ai-marketing-pack": {
    name: "AI Marketing Pack",
    files: [
      "Content Repurposing Workflow - n8n JSON + Setup Guide",
      "Lead Magnet Generator - n8n JSON + Setup Guide",
      "Cold Email Personalizer - n8n JSON + Setup Guide",
    ],
  },
  "business-operations-pack": {
    name: "Business Operations Pack",
    files: [
      "Meeting Summarizer - n8n JSON + Setup Guide",
      "Support Ticket Router - n8n JSON + Setup Guide",
      "Competitor Price Monitor - n8n JSON + Setup Guide",
      "Resume Screening - n8n JSON + Setup Guide",
      "Social Comment Responder - n8n JSON + Setup Guide",
    ],
  },
  "master-bundle": {
    name: "Master Bundle - All 15 Workflows",
    files: [
      "All 15 n8n Workflows",
      "All Voice Agent Kits",
      "All Setup Guides",
      "Future Updates",
      "Commercial License",
    ],
  },
};

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutSuccessData = await req.json();
    const { checkout_id, product_slug, user_id, email, amount } = body;

    const product = PRODUCT_DETAILS[product_slug];

    if (!product) {
      console.error("Unknown product slug:", product_slug);
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }

    // Send confirmation email to customer
    const customerEmailContent = `
🎉 Payment Successful - Intelligence Repo

Hi there,

Thank you for your purchase! Your order has been confirmed.

ORDER DETAILS
==============
Order ID: ${checkout_id}
Product: ${product.name}
Amount: $${(amount / 100).toFixed(2)}

YOUR DOWNLOADS
==============
${product.files.map((file, i) => `${i + 1}. ${file}`).join("\n")}

NEXT STEPS
==========
1. Download your files from your account dashboard
2. Import the n8n JSON files into your workflow editor
3. Configure API keys for each service
4. Deploy!

Need help? Reply to this email or visit our FAQ.

Best regards,
The Intelligence Repo Team

---
Intelligence Repo
AI Workflows & Voice Agents Marketplace
    `.trim();

    await resend.emails.send({
      from: CONTACTS_EMAIL,
      to: email,
      subject: `🎉 Order Confirmed - ${product.name}`,
      text: customerEmailContent,
    });

    // Send notification to admin
    const adminEmailContent = `
💰 NEW ORDER - Intelligence Repo

Order ID: ${checkout_id}
Product: ${product.name}
Slug: ${product_slug}
User ID: ${user_id}
Email: ${email}
Amount: $${(amount / 100).toFixed(2)}

Files Included:
${product.files.map((f, i) => `${i + 1}. ${f}`).join("\n")}

---
Time: ${new Date().toISOString()}
    `.trim();

    await resend.emails.send({
      from: CONTACTS_EMAIL,
      to: ADMIN_EMAIL,
      subject: `[ORDER] ${product.name} - $${(amount / 100).toFixed(2)} - ${email}`,
      text: adminEmailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}