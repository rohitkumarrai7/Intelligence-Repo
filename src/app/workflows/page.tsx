"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Sparkles, Workflow, Layout } from "lucide-react";
import { MarketplaceCard } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { products } from "@/lib/data";

const packs = [
  { name: "Niche Voice Agents Pack", price: 147, count: 7 },
  { name: "AI Marketing Pack", price: 127, count: 3 },
  { name: "Business Operations Pack", price: 147, count: 5 },
  { name: "All 15 Workflows", price: 297, count: 15 },
];

export default function WorkflowsPage() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  
  const workflows = products.filter(p => p.type === "workflow");

  const displayedWorkflows = selectedPack
    ? workflows.filter(w => w.pack === selectedPack)
    : workflows;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="scale-75 origin-left" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/workflows" className="text-sm font-medium text-primary">Workflows</Link>
            <Link href="/voice-agents" className="text-sm font-medium text-text-secondary hover:text-primary transition">Voice Agents</Link>
            <Link href="/pricing" className="text-sm font-medium text-text-secondary hover:text-primary transition">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signup" className="btn-primary text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <Workflow className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">n8n Flows</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Production-Ready <span className="text-gradient italic">Workflows</span></h1>
            <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              Import-ready JSON workflows for automation. Each kit includes full documentation, visual diagrams, and required API lists.
            </p>
          </div>

          {/* Pack Filters */}
          <div className="flex flex-wrap gap-2 mb-12 p-1.5 rounded-2xl bg-surface border border-border inline-flex">
            <button
              onClick={() => setSelectedPack(null)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition ${!selectedPack ? "bg-white shadow-sm text-primary ring-1 ring-border" : "text-text-muted hover:text-text-primary"}`}
            >
              All Assets ({workflows.length})
            </button>
            {packs.map(pack => (
              <button
                key={pack.name}
                onClick={() => setSelectedPack(pack.name)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition ${selectedPack === pack.name ? "bg-white shadow-sm text-primary ring-1 ring-border" : "text-text-muted hover:text-text-primary"}`}
              >
                {pack.name} ({pack.count})
              </button>
            ))}
          </div>

          {/* Workflow Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedWorkflows.map((workflow, i) => (
              <motion.div
                key={workflow.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <MarketplaceCard
                  title={workflow.name}
                  description={workflow.shortDescription}
                  price={workflow.price}
                  category={workflow.category}
                  tags={[workflow.niche]}
                  image={`/workflow/images/${workflow.thumbnail}`}
                  ctaText="View Details"
                  href={`/workflows/${workflow.slug}`}
                  apps={workflow.apps}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-text-muted text-xs font-bold uppercase tracking-widest">© 2026 Intelligence Repository. Secure Asset Marketplace.</p>
        </div>
      </footer>
    </div>
  );
}