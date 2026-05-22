"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Search, Filter } from "lucide-react";
import { MarketplaceCard } from "@/components/ui/Card";
import { Navbar, Footer } from "@/components/ui/Navbar";
import { products } from "@/lib/data";

const techFilters = ["All", "React", "Next.js", "Node.js", "Python", "Gemini", "OpenAI", "Tailwind CSS", "Supabase", "FastAPI", "LangGraph", "Chrome API", "WebSocket", "Convex"];
const categories = ["All", "HR", "Sales", "Development", "Media", "Marketing"];

export default function CodebasesPage() {
  const [search, setSearch] = useState("");
  const [techFilter, setTechFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const codebases = products.filter(p => p.type === "codebase");

  const filtered = codebases.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesTech = techFilter === "All" || (p.techStack && p.techStack.some(t => t.includes(techFilter)));
    const matchesCat = categoryFilter === "All" || p.niche === categoryFilter;
    return matchesSearch && matchesTech && matchesCat;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <Code2 className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Source Code</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Premium <span className="text-gradient">Codebases</span></h1>
            <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              Full project source code from real SaaS applications. Download, deploy, and customize. Each codebase includes documentation, setup guides, and demo videos.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search codebases..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-surface-solid border border-border focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-text-primary placeholder:text-text-muted"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-3 px-4 rounded-2xl bg-surface-solid border border-border">
                <Filter className="w-4 h-4 text-text-muted" />
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="bg-transparent py-4 text-sm font-semibold focus:outline-none min-w-[120px] text-text-primary"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {techFilters.map(tech => (
              <button
                key={tech}
                onClick={() => setTechFilter(tech)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition border ${techFilter === tech ? "bg-primary/10 text-primary border-primary/20" : "bg-surface-solid text-text-muted border-border hover:text-text-primary"}`}
              >
                {tech}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, i) => (
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
                  comparePrice={product.comparePrice}
                  category="Codebase"
                  tags={[product.niche]}
                  techStack={product.techStack}
                  ctaText="View Codebase"
                  href={`/products/${product.slug}`}
                  icon={product.icon}
                  featured={product.comparePrice !== undefined}
                />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <Code2 className="w-16 h-16 text-text-muted mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-2">No codebases found</h3>
              <p className="text-text-secondary">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
