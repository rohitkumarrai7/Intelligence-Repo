"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles, Download, ArrowRight, Package, FileJson, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PRODUCT_DETAILS: Record<string, { name: string; files: string[]; price: number }> = {
  "niche-voice-agents-pack": {
    name: "Niche Voice Agents Pack",
    price: 147,
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
    price: 127,
    files: [
      "Content Repurposing Workflow - n8n JSON + Setup Guide",
      "Lead Magnet Generator - n8n JSON + Setup Guide",
      "Cold Email Personalizer - n8n JSON + Setup Guide",
    ],
  },
  "business-operations-pack": {
    name: "Business Operations Pack",
    price: 147,
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
    price: 297,
    files: [
      "All 15 n8n Workflows",
      "All Voice Agent Kits",
      "All Setup Guides",
      "Future Updates",
      "Commercial License",
    ],
  },
  "single-workflow": {
    name: "Single Workflow",
    price: 29,
    files: ["Individual workflow n8n JSON + Setup Guide"],
  },
};

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const demo = searchParams.get("demo") === "true";
  const productSlug = searchParams.get("product") || "master-bundle";
  const price = searchParams.get("price") || "29700";

  const product = PRODUCT_DETAILS[productSlug] || PRODUCT_DETAILS["master-bundle"];
  const isDemo = demo === true;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 max-w-2xl w-full"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-10 h-10 text-success" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-center mb-2"
      >
        {isDemo ? "Demo Purchase Complete!" : "Payment Successful!"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-text-secondary text-center mb-8"
      >
        {isDemo
          ? "This is a demo checkout. In production, you would receive real files."
          : "Thank you for your purchase! Your workflow files are ready to download."}
      </motion.p>

      {/* Order Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-surface rounded-xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-text-muted">Product</span>
          <span className="font-semibold">{product.name}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-text-muted">Amount</span>
          <span className="font-semibold text-accent">${product.price}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-muted">Order ID</span>
          <span className="font-mono text-sm text-text-secondary">
            {isDemo ? "DEMO-" + Date.now().toString(36).toUpperCase() : "ORD-" + Date.now().toString(36).toUpperCase()}
          </span>
        </div>
      </motion.div>

      {/* Files Included */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Your Files
        </h3>
        <div className="space-y-2">
          {product.files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <FileJson className="w-5 h-5 text-primary" />
              <span className="text-sm">{file}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-3"
      >
        <Link
          href="/account"
          className="btn-primary w-full flex items-center justify-center gap-2 py-4"
        >
          <Download className="w-5 h-5" />
          Go to My Account & Download
        </Link>

        <Link
          href="/products"
          className="block w-full py-3 text-center text-text-secondary hover:text-primary transition"
        >
          Continue Shopping
        </Link>
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-text-muted text-xs mt-6"
      >
        A confirmation email has been sent with your download links.
        <br />
        Files are accessible anytime from your account dashboard.
      </motion.p>
    </motion.div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <Suspense fallback={
        <div className="glass-card p-8 max-w-2xl w-full text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      }>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}