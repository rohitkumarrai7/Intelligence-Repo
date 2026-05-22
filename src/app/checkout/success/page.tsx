"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Download, ArrowRight, Package, FileJson, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Navbar, Footer } from "@/components/ui/Navbar";

const PRODUCT_DETAILS: Record<string, { name: string; files: string[]; price: number }> = {
  // Individual Workflows & Voice Agents
  "plumber-voice-agent": { name: "Plumber Voice Agent", price: 19, files: ["Plumber Voice Agent JSON", "Setup Guide"] },
  "dental-appointment-booking": { name: "Dental Appointment Booking", price: 19, files: ["Dental Booking JSON", "Setup Guide"] },
  "real-estate-lead-qualification": { name: "Real Estate Lead Qualification", price: 19, files: ["Real Estate Lead Qualifier JSON", "Setup Guide"] },
  "restaurant-whatsapp-order": { name: "Restaurant WhatsApp Order", price: 19, files: ["Restaurant WhatsApp Bot JSON", "Setup Guide"] },
  "hvac-emergency-dispatch": { name: "HVAC Emergency Dispatch", price: 19, files: ["HVAC Emergency Dispatch JSON", "Setup Guide"] },
  "cleaning-service-quote": { name: "Cleaning Service Quote", price: 19, files: ["Cleaning Quote Calculator JSON", "Setup Guide"] },
  "fitness-coach-followup": { name: "Fitness Coach Follow-Up", price: 19, files: ["Fitness Coach Follow-Up JSON", "Setup Guide"] },
  "content-repurposing": { name: "Content Repurposing", price: 19, files: ["Content Repurposing Workflow JSON", "Setup Guide"] },
  "lead-magnet-generator": { name: "Lead Magnet Generator", price: 19, files: ["Lead Magnet Generator JSON", "Setup Guide"] },
  "cold-email-personalizer": { name: "Cold Email Personalizer", price: 19, files: ["Cold Email Personalizer JSON", "Setup Guide"] },
  "meeting-summarizer": { name: "Meeting Summarizer", price: 19, files: ["Meeting Summarizer JSON", "Setup Guide"] },
  "support-ticket-router": { name: "Support Ticket Router", price: 19, files: ["Support Ticket Router JSON", "Setup Guide"] },
  "competitor-price-monitor": { name: "Competitor Price Monitor", price: 19, files: ["Competitor Price Monitor JSON", "Setup Guide"] },
  "resume-screening": { name: "Resume Screening", price: 19, files: ["Resume Screening JSON", "Setup Guide"] },
  "social-comment-responder": { name: "Social Comment Responder", price: 19, files: ["Social Comment Responder JSON", "Setup Guide"] },
  // Starter Pack
  "starter-codebase-pack": { name: "Starter Codebase Pack", price: 127, files: ["TARS-CONVERSA Source Code", "Jobify Extension Source", "Resumod Extension Source"] },
  // Complete Bundle
  "complete-bundle": { name: "Complete Bundle — All Access", price: 300, files: ["All 8 Codebases", "All 15 Workflows & Voice Agents", "White-Label Rights", "Lifetime Updates"] },
  "default": { name: "Product", price: 19, files: ["Source code / JSON files"] },
};

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const demo = searchParams.get("demo") === "true";
  const productSlug = searchParams.get("product") || "complete-bundle";

  const product = PRODUCT_DETAILS[productSlug] || PRODUCT_DETAILS["default"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 max-w-2xl w-full"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-10 h-10 text-success" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-center mb-2"
      >
        {demo ? "Demo Purchase Complete!" : "Payment Successful!"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-text-secondary text-center mb-8"
      >
        {demo ? "This is a demo checkout." : "Thank you! Your files are ready to download."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-surface-solid rounded-xl p-6 mb-8 border border-border"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-text-muted">Product</span>
          <span className="font-semibold">{product.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-muted">Amount</span>
          <span className="font-bold text-primary">${product.price}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" /> Your Files
        </h3>
        <div className="space-y-2">
          {product.files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-surface-solid rounded-lg border border-border">
              <FileJson className="w-5 h-5 text-primary" />
              <span className="text-sm">{file}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-3"
      >
        <Link href="/account" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
          <Download className="w-5 h-5" /> Go to My Account & Download
        </Link>
        <Link href="/products" className="block w-full py-3 text-center text-text-secondary hover:text-primary transition">
          Continue Shopping
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center p-6 pt-32">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <Suspense fallback={
          <div className="glass-card p-8 max-w-2xl w-full text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary animate-spin" />
            </div>
            <p className="text-text-secondary">Loading...</p>
          </div>
        }>
          <CheckoutSuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
