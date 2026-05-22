"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { MarketplaceCard } from "@/components/ui/Card";
import { Navbar, Footer } from "@/components/ui/Navbar";
import { products } from "@/lib/data";

const niches = ["All", "Plumbing", "Dental", "Real Estate", "Restaurant", "HVAC", "Cleaning", "Fitness"];

export default function VoiceAgentsPage() {
  const [selectedNiche, setSelectedNiche] = useState("All");
  const voiceAgents = products.filter(p => p.type === "voice_agent");
  const filteredAgents = selectedNiche === "All"
    ? voiceAgents
    : voiceAgents.filter(a => a.niche === selectedNiche);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <Mic className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Voice Kits</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">AI <span className="text-gradient italic">Voice Agents</span></h1>
            <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              Human-like voice agents designed for industry-specific tasks. Retell/VAPI compatible kits ready for n8n orchestration.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-12 p-1.5 rounded-2xl bg-surface-solid border border-border inline-flex">
            {niches.map(niche => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition ${selectedNiche === niche ? "bg-primary/10 text-primary border border-primary/20" : "text-text-muted hover:text-text-primary"}`}
              >
                {niche}
              </button>
            ))}
          </div>

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
                  techStack={agent.apps}
                  ctaText="View Agent"
                  href={`/products/${agent.slug}`}
                  icon={agent.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
