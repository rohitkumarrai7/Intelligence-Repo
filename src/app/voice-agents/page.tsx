"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";
import { MarketplaceCard } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { products } from "@/lib/data";

const niches = ["All", "Plumbing", "Dental", "Real Estate", "Restaurant", "HVAC", "Cleaning", "Fitness"];

export default function VoiceAgentsPage() {
  const [selectedNiche, setSelectedNiche] = useState("All");

  const voiceAgents = products.filter(p => p.type === "voice_agent");

  const filteredAgents = selectedNiche === "All"
    ? voiceAgents
    : voiceAgents.filter(a => a.niche === selectedNiche);

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
            <Link href="/voice-agents" className="text-sm font-medium text-primary">Voice Agents</Link>
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
              <Mic className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Voice Kits</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">AI <span className="text-gradient italic">Voice Agents</span></h1>
            <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              Human-like voice agents designed for industry-specific tasks. Retell/VAPI compatible kits ready for n8n orchestration.
            </p>
          </div>

          {/* Niche Filters */}
          <div className="flex flex-wrap gap-2 mb-12 p-1.5 rounded-2xl bg-surface border border-border inline-flex">
            {niches.map(niche => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition ${selectedNiche === niche ? "bg-white shadow-sm text-primary ring-1 ring-border" : "text-text-muted hover:text-text-primary"}`}
              >
                {niche}
              </button>
            ))}
          </div>

          {/* Voice Agents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent, i) => (
              <motion.div
                key={agent.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <MarketplaceCard
                  title={agent.name}
                  description={agent.shortDescription}
                  price={agent.price}
                  category="Voice Agent"
                  tags={[agent.niche]}
                  image={`/workflow/images/${agent.thumbnail}`}
                  ctaText="View Agent"
                  href={`/voice-agents/${agent.slug}`}
                  apps={agent.apps}
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