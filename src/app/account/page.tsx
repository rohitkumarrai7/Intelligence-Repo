"use client";

import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles, Download, CreditCard, Package, ArrowRight } from "lucide-react";
import { Navbar, Footer } from "@/components/ui/Navbar";

const purchases = [
  { name: "Obsidian AI — Website Builder", date: "2026-05-15", downloads: 2, price: 197 },
  { name: "Niche Voice Agents Pack", date: "2026-05-10", downloads: 7, price: 147 },
  { name: "ML Sales Predictor", date: "2026-04-28", downloads: 1, price: 127 },
];

const subscription = {
  tier: "Free",
  status: "active",
  renews: null,
};

export default function AccountPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-text-secondary">Manage your purchases and subscription</p>
          </motion.div>

          <SignedOut>
            <div className="glass-card p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Sign in to view your account</h2>
              <p className="text-text-secondary mb-6">Access your purchases, downloads, and account settings</p>
              <Link href="/login" className="btn-primary inline-flex items-center gap-2">
                Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold">Subscription</h2>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-success/10 text-success border border-success/20 font-bold">
                    {subscription.tier}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-muted text-sm">Status</p>
                    <p className="font-medium capitalize">{subscription.status}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Plan</p>
                    <p className="font-medium">{subscription.tier}</p>
                  </div>
                </div>
                <Link href="/pricing" className="mt-4 btn-primary inline-flex items-center gap-2 text-sm">
                  Upgrade Plan <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold">My Purchases</h2>
                </div>

                {purchases.length > 0 ? (
                  <div className="space-y-4">
                    {purchases.map((purchase, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-surface-solid rounded-xl border border-border">
                        <div>
                          <p className="font-medium">{purchase.name}</p>
                          <p className="text-text-muted text-sm">Purchased {purchase.date} &middot; ${purchase.price}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-text-muted text-sm">{purchase.downloads} files</span>
                          <button className="flex items-center gap-2 text-sm text-primary hover:underline font-bold">
                            <Download className="w-4 h-4" /> Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-secondary mb-4">No purchases yet</p>
                    <Link href="/products" className="btn-primary text-sm">Browse Products</Link>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                <Link href="/products" className="glass-card p-6 hover:border-primary/30 transition">
                  <Sparkles className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">Browse Products</h3>
                  <p className="text-text-muted text-sm">Explore codebases and workflows</p>
                </Link>
                <Link href="/pricing" className="glass-card p-6 hover:border-primary/30 transition">
                  <CreditCard className="w-6 h-6 text-accent mb-3" />
                  <h3 className="font-semibold mb-1">Pricing</h3>
                  <p className="text-text-muted text-sm">View plans and bundles</p>
                </Link>
              </motion.div>
            </div>
          </SignedIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
