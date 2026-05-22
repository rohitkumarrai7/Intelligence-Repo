"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Code2, Workflow, Mic, Package } from "lucide-react";
import { products } from "@/lib/data";

const typeIcons: Record<string, typeof Code2> = {
  codebase: Code2,
  workflow: Workflow,
  voice_agent: Mic,
};

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const allProducts = products.map(p => ({
    id: p.id.toString(),
    title: p.name,
    slug: p.slug,
    type: p.type.toUpperCase(),
    category: p.category,
    price: p.price * 100,
    status: "PUBLISHED",
    downloads: Math.floor(Math.random() * 100) + 10,
    rating: p.rating,
    niche: p.niche,
  }));

  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || p.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-text-muted text-sm mt-1">{allProducts.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="glass-card">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-solid border border-border focus:border-primary focus:outline-none text-text-primary placeholder:text-text-muted"
            />
          </div>
          <div className="flex gap-2">
            {["all", "codebase", "workflow", "voice_agent"].map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition ${typeFilter === type ? "bg-primary/10 text-primary border border-primary/20" : "text-text-muted hover:text-text-primary"}`}
              >
                {type === "all" ? "All" : type === "voice_agent" ? "Voice Agents" : type.charAt(0).toUpperCase() + type.slice(1) + "s"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 text-text-muted text-xs uppercase tracking-wider font-medium">Product</th>
                <th className="p-4 text-text-muted text-xs uppercase tracking-wider font-medium">Type</th>
                <th className="p-4 text-text-muted text-xs uppercase tracking-wider font-medium">Niche</th>
                <th className="p-4 text-text-muted text-xs uppercase tracking-wider font-medium">Price</th>
                <th className="p-4 text-text-muted text-xs uppercase tracking-wider font-medium">Status</th>
                <th className="p-4 text-text-muted text-xs uppercase tracking-wider font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const IconComp = typeIcons[product.type.toLowerCase()] || Package;
                return (
                  <tr key={product.id} className="border-b border-border hover:bg-surface-solid/50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <IconComp className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-text-muted text-xs font-mono">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20 font-bold">
                        {product.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-text-secondary text-sm">{product.niche}</td>
                    <td className="p-4 font-bold">${(product.price / 100).toFixed(0)}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-success/10 text-success border border-success/20 font-bold">
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/products/${product.slug}`} className="p-2 rounded-lg hover:bg-surface-solid transition">
                          <Eye className="w-4 h-4 text-text-muted" />
                        </Link>
                        <button className="p-2 rounded-lg hover:bg-surface-solid transition">
                          <Edit className="w-4 h-4 text-text-muted" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-surface-solid transition">
                          <Trash2 className="w-4 h-4 text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border">
          <p className="text-text-muted text-sm">Showing {filteredProducts.length} of {allProducts.length} products</p>
        </div>
      </div>
    </div>
  );
}
