"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-md w-full mx-6 glass-card p-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-error/20 flex items-center justify-center mx-auto mb-6">
          <X className="w-8 h-8 text-error" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Checkout Cancelled</h1>
        <p className="text-text-secondary mb-6">
          No worries! Your cart has been saved. Complete your purchase whenever you&apos;re ready.
        </p>

        <div className="space-y-3">
          <Link href="/products" className="btn-primary w-full flex items-center justify-center gap-2">
            Continue Shopping <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/" className="block w-full py-3 text-center text-text-secondary hover:text-primary transition">
            Go to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}