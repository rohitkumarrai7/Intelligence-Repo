"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/ui/Navbar";

const faqs = [
  {
    q: "What exactly do I get when I buy a codebase?",
    a: "You get the full source code (ZIP file), a comprehensive README, step-by-step setup guide, and a demo video. Everything you need to deploy the project locally or to production."
  },
  {
    q: "What's included in an n8n workflow?",
    a: "Each workflow includes an import-ready .json file, a visual diagram of the workflow, the AI system prompt used, a setup guide with required API keys, and test data."
  },
  {
    q: "Do I need technical skills to use these products?",
    a: "Codebases require basic developer skills (React/Node.js/Python). Workflows and voice agents are designed for beginners — just import the JSON into n8n and follow the setup guide."
  },
  {
    q: "What's the license?",
    a: "All products come with a commercial license. You can use them for your own projects, client projects, or resell the end product. You cannot resell the source code as-is."
  },
  {
    q: "Do I get updates?",
    a: "Yes! All one-time purchases include lifetime updates. We regularly improve our codebases and workflows."
  },
  {
    q: "How do I download my purchases?",
    a: "After purchase, you'll receive instant access to download links. You can also access all your purchases from your account dashboard at any time."
  },
  {
    q: "What's the difference between Pro and Agency subscriptions?",
    a: "Pro ($29/mo) gives you 2 new codebases and 5 workflows per month. Agency ($99/mo) gives you unlimited access to everything, white-label rights, priority support, and 5 team seats."
  },
  {
    q: "Can I get a refund?",
    a: "We offer a 30-day money-back guarantee on all purchases. If you're not satisfied, contact support for a full refund."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and Apple Pay through our secure checkout powered by Polar.sh."
  },
  {
    q: "Do you offer custom development?",
    a: "Yes! Contact us through the contact page and we can build custom AI solutions, workflows, or codebases tailored to your specific needs."
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-bold text-lg pr-8 group-hover:text-primary transition">{q}</span>
        <ChevronDown className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform ${open ? "rotate-180 text-primary" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="pb-6"
        >
          <p className="text-text-secondary leading-relaxed max-w-3xl">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <HelpCircle className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">FAQ</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">Common <span className="text-gradient">Questions</span></h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto">Everything you need to know about our codebases, workflows, and subscriptions.</p>
          </div>

          <div className="glass-card p-8 md:p-12 mb-20">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="glass-card p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have <span className="text-gradient">Questions</span>?</h2>
            <p className="text-text-secondary text-lg mb-8">Our team is ready to help you find the right solution.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 group">
                Contact Support <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/products" className="btn-secondary px-8 py-4">Browse Products</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
