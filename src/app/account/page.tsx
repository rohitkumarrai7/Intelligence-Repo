"use client";

import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles, Download, CreditCard, Package, ArrowRight, Check } from "lucide-react";

const purchases = [
  { name: "Plumber Voice Agent", date: "2026-05-15", downloads: 1 },
  { name: "Niche Voice Agents Pack", date: "2026-05-10", downloads: 3 },
];

const subscription = {
  tier: "Free",
  status: "active",
  renews: null,
};

export default function AccountPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Intelligence Repo</span>
          </Link>
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
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
              {/* Subscription Card */}
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
                  <span className="px-3 py-1 text-sm rounded-full bg-success/20 text-success">
                    {subscription.tier}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-muted text-sm">Status</p>
                    <p className="font-medium capitalize">{subscription.status}</p>
                  </div>
                  {subscription.renews && (
                    <div>
                      <p className="text-text-muted text-sm">Renews</p>
                      <p className="font-medium">{subscription.renews}</p>
                    </div>
                  )}
                </div>
                <Link href="/pricing" className="mt-4 btn-primary inline-flex items-center gap-2 text-sm">
                  Upgrade Plan <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Purchases */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-accent" />
                  <h2 className="text-xl font-bold">My Purchases</h2>
                </div>
                
                {purchases.length > 0 ? (
                  <div className="space-y-4">
                    {purchases.map((purchase, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                        <div>
                          <p className="font-medium">{purchase.name}</p>
                          <p className="text-text-muted text-sm">Purchased {purchase.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-text-muted text-sm">{purchase.downloads} downloads</span>
                          <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                            <Download className="w-4 h-4" /> Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-secondary mb-4">No purchases yet</p>
                    <Link href="/products" className="btn-primary text-sm">
                      Browse Products
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                <Link href="/products" className="glass-card p-6 hover:bg-surface-hover transition">
                  <Sparkles className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">Browse Products</h3>
                  <p className="text-text-muted text-sm">Explore workflows and voice agents</p>
                </Link>
                <Link href="/pricing" className="glass-card p-6 hover:bg-surface-hover transition">
                  <CreditCard className="w-6 h-6 text-accent mb-3" />
                  <h3 className="font-semibold mb-1">Pricing</h3>
                  <p className="text-text-muted text-sm">View plans and bundles</p>
                </Link>
              </motion.div>
            </div>
          </SignedIn>
        </div>
      </main>
    </div>
  );
}