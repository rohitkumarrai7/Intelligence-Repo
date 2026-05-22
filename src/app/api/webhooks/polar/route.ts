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
  // Individual Codebases (8 products)
  "tars-conversa-ai-livechat": {
    name: "TARS-CONVERSA — AI LiveChat Engine",
    files: [
      "TARS-CONVERSA Full Source Code (Frontend + Backend)",
      "Architecture Documentation",
      "Widget SDK & Customization Guide",
      "API Reference & Setup Guide",
    ],
  },
  "finflock-algorithmic-trading": {
    name: "Finflock — Algorithmic Trading Engine",
    files: [
      "Finflock Full Source Code",
      "Jupyter Notebook Tutorials",
      "Quantitative Strategy Documentation",
      "Sample Backtest Reports & Deployment Guide",
    ],
  },
  "gmaps-scraper-ai-outreach": {
    name: "GMaps Scraper — AI Cold Outreach Engine",
    files: [
      "GMaps Scraper Full Source Code (Scraper + Web App + Email Engine)",
      "API Integration Guide",
      "Email Template Library",
      "Deployment Guide & Sample Campaign Data",
    ],
  },
  "hashtric-marketing-intelligence": {
    name: "Hashtric — Marketing Intelligence OS",
    files: [
      "Hashtric Full Source Code (Web Frontend + Backend API)",
      "Architecture & Attribution Model Documentation",
      "Pixel Deployment Guide",
      "API Keys Setup Guide",
    ],
  },
  "jobify-universal-ats-extension": {
    name: "Jobify — Universal ATS Chrome Extension",
    files: [
      "Jobify Full Source Code",
      "Chrome Extension Build (Ready-to-install .crx)",
      "Platform Parser Customization Guide",
      "ATS Integration API Reference",
    ],
  },
  "autostream-social-lead-agent": {
    name: "AutoStream — Social-to-Lead AI Agent",
    files: [
      "AutoStream Full Source Code",
      "LangGraph Workflow Architecture Docs",
      "FAISS Index Setup Guide",
      "Prompt Engineering Playbook & CRM Integration Guide",
    ],
  },
  "resumod-ats-optimizer-extension": {
    name: "Resumod — ATS Resume Optimizer Extension",
    files: [
      "Resumod Full Source Code",
      "Chrome Extension Build (Ready-to-install .crx)",
      "ATS Scoring Algorithm Documentation",
      "Resume Template Pack",
    ],
  },
  "trend-analyzer-threat-intelligence": {
    name: "Trend Analyzer — Social Threat Intelligence",
    files: [
      "Trend Analyzer Full Source Code",
      "Architecture & Data Flow Documentation",
      "Convex Schema & Migration Guide",
      "NLP Model Setup & Deployment Guide",
    ],
  },
  // Individual Workflows & Voice Agents ($19)
  "plumber-voice-agent": { name: "Plumber Voice Agent", files: ["Plumber Voice Agent - n8n JSON + Setup Guide"] },
  "dental-appointment-booking": { name: "Dental Appointment Booking", files: ["Dental Appointment Booking - n8n JSON + Setup Guide"] },
  "real-estate-lead-qualification": { name: "Real Estate Lead Qualification", files: ["Real Estate Lead Qualification - n8n JSON + Setup Guide"] },
  "restaurant-whatsapp-order": { name: "Restaurant WhatsApp Order", files: ["Restaurant WhatsApp Order - n8n JSON + Setup Guide"] },
  "hvac-emergency-dispatch": { name: "HVAC Emergency Dispatch", files: ["HVAC Emergency Dispatch - n8n JSON + Setup Guide"] },
  "cleaning-service-quote": { name: "Cleaning Service Quote", files: ["Cleaning Service Quote - n8n JSON + Setup Guide"] },
  "fitness-coach-followup": { name: "Fitness Coach Follow-Up", files: ["Fitness Coach Follow-Up - n8n JSON + Setup Guide"] },
  "content-repurposing": { name: "Content Repurposing", files: ["Content Repurposing Workflow - n8n JSON + Setup Guide"] },
  "lead-magnet-generator": { name: "Lead Magnet Generator", files: ["Lead Magnet Generator - n8n JSON + Setup Guide"] },
  "cold-email-personalizer": { name: "Cold Email Personalizer", files: ["Cold Email Personalizer - n8n JSON + Setup Guide"] },
  "meeting-summarizer": { name: "Meeting Summarizer", files: ["Meeting Summarizer - n8n JSON + Setup Guide"] },
  "support-ticket-router": { name: "Support Ticket Router", files: ["Support Ticket Router - n8n JSON + Setup Guide"] },
  "competitor-price-monitor": { name: "Competitor Price Monitor", files: ["Competitor Price Monitor - n8n JSON + Setup Guide"] },
  "resume-screening": { name: "Resume Screening", files: ["Resume Screening - n8n JSON + Setup Guide"] },
  "social-comment-responder": { name: "Social Comment Responder", files: ["Social Comment Responder - n8n JSON + Setup Guide"] },
  // Complete Bundle
  "complete-bundle": { name: "Complete Bundle — All Access", files: ["All 8 Codebases", "All 15 Workflows & Voice Agents", "White-Label Rights", "Lifetime Updates", "Commercial License"] },
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