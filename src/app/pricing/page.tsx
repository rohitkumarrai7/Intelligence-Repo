"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap, ArrowRight, Sparkles, Loader2, Package, Download, FileJson, Shield, Star, TrendingUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "@/components/ui/Logo";

const productPacks = [
  {
    name: "Niche Voice Agents Pack",
    slug: "niche-voice-agents-pack",
    price: 147,
    originalPrice: 203,
    items: ["Plumber Voice Agent", "Dental Booking Agent", "Real Estate Lead Qualifier", "Restaurant WhatsApp Bot", "HVAC Emergency Dispatch", "Cleaning Quote Calculator", "Fitness Coach Follow-Up"],
    savings: "Save $56",
    priceId: "70fb9a42-0591-4b5e-8518-26f9f39aa09d",
    color: "from-indigo-500 to-purple-500",
    popular: false,
  },
  {
    name: "AI Marketing Pack",
    slug: "ai-marketing-pack",
    price: 127,
    originalPrice: 174,
    items: ["Content Repurposing Workflow", "Lead Magnet Generator", "Cold Email Personalizer"],
    savings: "Save $47",
    priceId: "70fb9a42-0591-4b5e-8518-26f9f39aa09d",
    color: "from-amber-500 to-orange-500",
    popular: true,
  },
  {
    name: "Business Operations Pack",
    slug: "business-operations-pack",
    price: 147,
    originalPrice: 203,
    items: ["Meeting Summarizer", "Support Ticket Router", "Competitor Price Monitor", "Resume Screening", "Social Comment Responder"],
    savings: "Save $56",
    priceId: "70fb9a42-0591-4b5e-8518-26f9f39aa09d",
    color: "from-emerald-500 to-teal-500",
    popular: false,
  },
  {
    name: "Master Bundle (All 15)",
    slug: "master-bundle",
    price: 297,
    originalPrice: 435,
    items: ["All 15 workflows", "All future additions", "Lifetime updates", "Commercial license"],
    savings: "Save $138",
    priceId: "1712b635-0d78-43b5-9cc9-4611caf268de",
    color: "from-primary to-accent",
    popular: false,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedParam = searchParams.get("selected");

  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (productSlug: string, priceId: string) => {
    setLoading(productSlug);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, priceId }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.demo) {
        // Demo mode - simulate checkout
        router.push(`/checkout/success?demo=true&product=${productSlug}&price=${data.price}`);
      } else {
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="scale-75 origin-left" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/workflows" className="text-sm font-medium text-text-secondary hover:text-primary transition">Workflows</Link>
            <Link href="/voice-agents" className="text-sm font-medium text-text-secondary hover:text-primary transition">Voice Agents</Link>
            <Link href="/pricing" className="text-sm font-medium text-primary">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="btn-primary text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Pricing Plans</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Simple, <span className="text-gradient italic">Transparent</span> Pricing</h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
              One-time payments. Lifetime access. Instant downloads. 
              No recurring fees, just high-performance assets.
            </p>
          </div>

          {/* Product Packs */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {productPacks.map((pack, i) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-8 relative flex flex-col group ${selectedParam === pack.slug ? "ring-2 ring-primary" : ""}`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-8 px-3 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                
                {selectedParam === pack.slug && (
                  <div className="absolute -top-3 right-8 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    Selected
                  </div>
                )}

                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-2">{pack.name}</h3>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider border border-success/20">
                      <Star className="w-3 h-3 fill-success" />
                      {pack.savings}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-sm font-bold text-text-muted">$</span>
                      <span className="text-4xl font-black tracking-tighter">{pack.price}</span>
                    </div>
                    <span className="text-text-muted line-through text-sm font-medium italic opacity-60">${pack.originalPrice}</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">What&apos;s Included:</p>
                  <ul className="space-y-4 mb-10">
                    {pack.items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm font-medium text-text-secondary">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout(pack.slug, pack.priceId)}
                  disabled={loading === pack.slug}
                  className="btn-primary w-full py-5 flex items-center justify-center gap-3 disabled:opacity-50 text-lg group/btn"
                >
                  {loading === pack.slug ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6 group-hover/btn:scale-110 transition-transform" /> Purchase Access
                    </>
                  )}
                </button>

                <div className="mt-6 flex items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-text-muted border-t border-border pt-6">
                  <span className="flex items-center gap-1.5">
                    <FileJson className="w-3.5 h-3.5" /> JSON
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" /> GUIDES
                  </span>
                  <span className="flex items-center gap-1.5 text-success">
                    <Download className="w-3.5 h-3.5" /> INSTANT
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Single Workflow Option */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center p-12 rounded-[32px] bg-surface/50 border border-border"
          >
            <p className="text-text-secondary font-medium mb-6">Looking for something specific?</p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
              Browse Individual Assets ($29 each) <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Features/Trust */}
          <div className="mt-32 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Commercial License</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Every asset comes with a full commercial license. Use them for your business or your clients.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl bg-accent/5 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lifetime Updates</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Pay once, get all future updates for that asset. We constantly refine our workflows.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl bg-success/5 flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Delivery</h3>
              <p className="text-text-secondary text-sm leading-relaxed">No waiting. Get access to your JSON files and setup guides immediately after checkout.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="text-text-muted text-sm font-medium">© 2026 Intelligence Repository. All rights reserved.</p>
            <div className="flex items-center gap-6 text-text-secondary text-sm font-medium">
              <Link href="/privacy" className="hover:text-primary transition">Privacy</Link>
              <Link href="/terms" className="hover:text-primary transition">Terms</Link>
              <Link href="/contact" className="hover:text-primary transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}