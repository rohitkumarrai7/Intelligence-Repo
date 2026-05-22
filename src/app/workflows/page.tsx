"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Workflow } from "lucide-react";
import { MarketplaceCard } from "@/components/ui/Card";
import { Navbar, Footer } from "@/components/ui/Navbar";
import { products, productPacks } from "@/lib/data";

const workflowPacks = productPacks.filter(p => p.type === "workflow" || p.type === "voice_agent");

export default function WorkflowsPage() {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const allWorkflows = products.filter(p => p.type === "workflow" || p.type === "voice_agent");
  const displayedWorkflows = selectedPack
    ? allWorkflows.filter(w => w.pack === selectedPack)
    : allWorkflows;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <Workflow className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">n8n Flows</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Production-Ready <span className="text-gradient italic">Workflows</span></h1>
            <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              Import-ready JSON workflows for automation. Each kit includes full documentation, visual diagrams, and required API lists.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-12 p-1.5 rounded-2xl bg-surface-solid border border-border inline-flex">
            <button
              onClick={() => setSelectedPack(null)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition ${!selectedPack ? "bg-primary/10 text-primary border border-primary/20" : "text-text-muted hover:text-text-primary"}`}
            >
              All Workflows ({allWorkflows.length})
            </button>
            {["Niche Voice Agents Pack", "AI Marketing Pack", "Business Operations Pack"].map(pack => (
              <button
                key={pack}
                onClick={() => setSelectedPack(pack)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition ${selectedPack === pack ? "bg-primary/10 text-primary border border-primary/20" : "text-text-muted hover:text-text-primary"}`}
              >
                {pack}
              </button>
            ))}
          </div>

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
                  category={workflow.type === "voice_agent" ? "Voice Agent" : "Workflow"}
                  tags={[workflow.niche]}
                  techStack={workflow.apps}
                  ctaText="View Details"
                  href={`/products/${workflow.slug}`}
                  icon={workflow.icon}
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
