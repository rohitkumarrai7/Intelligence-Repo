"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap, ArrowRight, Loader2, Download, Shield, Sparkles, TrendingUp, Code2, Workflow, Mic, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components/ui/Navbar";
import { productPacks } from "@/lib/data";

export default function PricingPage() {
  const router = useRouter();
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
        router.push(`/checkout/success?demo=true&product=${productSlug}&price=${data.price}`);
      } else {
        alert("Checkout failed. Please try again.");
      }
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Pricing</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">One Price. <span className="text-gradient italic">Everything.</span></h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
              Get every codebase and workflow for one simple price. No monthly fees, no subscriptions.
            </p>
          </div>

          {/* Single Pro Plan */}
          <div className="mb-32">
            <div className="max-w-2xl mx-auto">
              // Single Complete Bundle Plan
          <div className="mb-32">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-10 relative flex flex-col ring-1 ring-primary/30"
              >
                <div className="absolute -top-3 left-10 px-4 py-1 bg-primary text-background text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Best Value
                </div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight mb-1">Complete Bundle</h3>
                    <p className="text-text-secondary text-sm">Everything — all codebases + all workflows + lifetime updates</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-5xl font-extrabold tracking-tighter">$350</span>
                    </div>
                    <span className="text-text-muted text-sm">one-time</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    "All 8 production-ready codebases",
                    "All 15 AI-powered workflows & voice agents",
                    "Full source code with documentation",
                    "Instant download after purchase",
                    "Lifetime access to purchased files",
                    "Commercial license included",
                    "Priority support included",
                  ].map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://buy.polar.sh/polar_cl_nbkIgUTuFGTp4nqEfdKcprCOgSaNSLZ9pW6VW3VZhF0"
                  data-polar-checkout
                  data-polar-checkout-theme="dark"
                  className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg group cursor-pointer no-underline"
                >
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" /> Get All Access
                </a>
              </motion.div>
            </div>
          </div>
            </div>
          </div>

          {/* Starter Codebase Pack */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Starter <span className="text-gradient">Codebase</span> Pack</h2>
              <p className="text-text-secondary text-lg">3 production-ready codebases to kickstart your portfolio — at a fraction of the cost.</p>
            </div>

            <div className="max-w-xl mx-auto">
              {productPacks.map((pack, i) => (
                <motion.div
                  key={pack.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-8 relative flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight mb-2">{pack.name}</h3>
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider border border-success/20">
                        <Sparkles className="w-3 h-3 fill-success" />
                        {pack.savings}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-3xl font-extrabold tracking-tighter">${pack.price}</span>
                      </div>
                      <span className="text-text-muted line-through text-sm">${pack.originalPrice}</span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm mb-6">{pack.description}</p>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {pack.items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCheckout(pack.slug, pack.priceId)}
                    disabled={loading === pack.slug}
                    className="btn-secondary w-full py-4 flex items-center justify-center gap-3 disabled:opacity-50 group"
                  >
                    {loading === pack.slug ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Package className="w-5 h-5" /> Purchase Starter Pack
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center p-12 rounded-[32px] bg-surface-solid border border-border"
          >
            <p className="text-text-secondary font-medium mb-6">Looking for individual products?</p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
              Browse All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="mt-32 grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl bg-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Commercial License</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Every asset comes with a full commercial license. Use them for your business or your clients.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl bg-accent/5 border border-accent/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lifetime Updates</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Pay once, get all future updates for that asset. We constantly refine our products.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl bg-success/5 border border-success/20 flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Delivery</h3>
              <p className="text-text-secondary text-sm leading-relaxed">No waiting. Get access to your files immediately after checkout.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}