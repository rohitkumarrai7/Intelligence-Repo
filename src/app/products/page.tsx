"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Sparkles, Layout } from "lucide-react";
import { MarketplaceCard } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { products } from "@/lib/data";

const categories = ["All", "Voice Agents", "Workflows"];
const niches = ["All", "Plumbing", "Dental", "Real Estate", "Restaurant", "HVAC", "Cleaning", "Fitness", "Marketing", "Business", "Support", "HR"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [niche, setNiche] = useState("All");

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.niche.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    const matchesNiche = niche === "All" || p.niche === niche;
    return matchesSearch && matchesCategory && matchesNiche;
  });

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
            <Link href="/pricing" className="text-sm font-medium text-text-secondary hover:text-primary transition">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signup" className="btn-primary text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Full Catalog</span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs font-medium text-text-secondary">Explore all assets</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Marketplace <span className="text-gradient">Catalog</span></h1>
            <p className="text-text-secondary text-lg max-w-2xl">{filteredProducts.length} high-performance AI assets available for immediate deployment.</p>
          </header>

          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by niche, agent, or workflow..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-surface border border-border focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-3 px-4 rounded-2xl bg-surface border border-border">
                <Filter className="w-4 h-4 text-text-muted" />
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  className="bg-transparent py-4 text-sm font-semibold focus:outline-none min-w-[120px]"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3 px-4 rounded-2xl bg-surface border border-border">
                <Layout className="w-4 h-4 text-text-muted" />
                <select 
                  value={niche} 
                  onChange={e => setNiche(e.target.value)} 
                  className="bg-transparent py-4 text-sm font-semibold focus:outline-none min-w-[120px]"
                >
                  {niches.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <MarketplaceCard
                  title={product.name}
                  description={product.shortDescription}
                  price={product.price}
                  category={product.category}
                  tags={[product.niche]}
                  image={`/workflow/images/${product.thumbnail}`}
                  ctaText="View Details"
                  href={product.type === "workflow" ? `/workflows/${product.slug}` : `/voice-agents/${product.slug}`}
                  apps={product.apps}
                />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-text-muted" />
              </div>
              <h3 className="text-xl font-bold mb-2">No assets found</h3>
              <p className="text-text-secondary">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setSearch(""); setCategory("All"); setNiche("All"); }}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-text-muted text-sm font-medium">© 2026 Intelligence Repository. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}