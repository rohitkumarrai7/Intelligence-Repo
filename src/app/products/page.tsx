"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Layout, Code2, Workflow, Mic, Package } from "lucide-react";
import { MarketplaceCard } from "@/components/ui/Card";
import { Navbar, Footer } from "@/components/ui/Navbar";
import { products } from "@/lib/data";
import { ProductType } from "@/lib/data";

const types = [
  { value: "all", label: "All Products", icon: Package },
  { value: "codebase", label: "Codebases", icon: Code2 },
  { value: "workflow", label: "Workflows", icon: Workflow },
  { value: "voice_agent", label: "Voice Agents", icon: Mic },
];

const allNiches = ["All", "HR", "Sales", "Development", "Media", "Marketing", "Business", "Support", "Plumbing", "Dental", "Real Estate", "Restaurant", "HVAC", "Cleaning", "Fitness"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<ProductType | "all">("all");
  const [niche, setNiche] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.niche.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === "all" || p.type === type;
      const matchesNiche = niche === "All" || p.niche === niche;
      return matchesSearch && matchesType && matchesNiche;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.id - a.id;
    });

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Full Catalog</span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs font-medium text-text-secondary">Explore all assets</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Marketplace <span className="text-gradient">Catalog</span></h1>
            <p className="text-text-secondary text-lg max-w-2xl">{filteredProducts.length} premium AI assets available for immediate deployment.</p>
          </header>

          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by name, niche, or description..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-surface-solid border border-border focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-text-primary placeholder:text-text-muted"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-3 px-4 rounded-2xl bg-surface-solid border border-border">
                <Filter className="w-4 h-4 text-text-muted" />
                <select
                  value={niche}
                  onChange={e => setNiche(e.target.value)}
                  className="bg-transparent py-4 text-sm font-semibold focus:outline-none min-w-[120px] text-text-primary"
                >
                  {allNiches.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3 px-4 rounded-2xl bg-surface-solid border border-border">
                <Layout className="w-4 h-4 text-text-muted" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-transparent py-4 text-sm font-semibold focus:outline-none min-w-[120px] text-text-primary"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low</option>
                  <option value="price-high">Price: High</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-12 p-1.5 rounded-2xl bg-surface-solid border border-border inline-flex">
            {types.map(t => (
              <button
                key={t.value}
                onClick={() => setType(t.value as ProductType | "all")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition ${type === t.value ? "bg-primary/10 text-primary border border-primary/20" : "text-text-muted hover:text-text-primary"}`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <MarketplaceCard
                  title={product.name}
                  description={product.shortDescription}
                  price={product.price}
                  comparePrice={product.comparePrice}
                  category={product.category}
                  tags={[product.niche]}
                  techStack={product.techStack || product.apps}
                  ctaText="View Details"
                  href={`/products/${product.slug}`}
                  icon={product.icon}
                  featured={product.rating >= 5}
                />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-20 h-20 bg-surface-solid rounded-full flex items-center justify-center mx-auto mb-6 border border-border">
                <Search className="w-10 h-10 text-text-muted" />
              </div>
              <h3 className="text-xl font-bold mb-2">No assets found</h3>
              <p className="text-text-secondary">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => { setSearch(""); setType("all"); setNiche("All"); }}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
