"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProductType = "CODEBASE" | "WORKFLOW" | "VOICE_AGENT" | "BUNDLE";

const categories = ["Codebases", "Workflows", "Voice Agents", "Bundles"];
const niches = ["HR", "Sales", "Development", "Media", "Marketing", "Business", "Support", "Plumbing", "Dental", "Real Estate", "Restaurant", "HVAC", "Cleaning", "Fitness"];

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    type: "CODEBASE" as ProductType,
    category: "",
    niche: "",
    price: "",
    status: "DRAFT",
    featured: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", form);
    router.push("/admin/products");
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/products" className="text-text-secondary hover:text-primary transition">
          &larr; Back to Products
        </Link>
      </div>

      <div className="glass-card p-8">
        <h1 className="text-2xl font-bold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Product Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["CODEBASE", "WORKFLOW", "VOICE_AGENT", "BUNDLE"] as ProductType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({ ...form, type })}
                  className={`p-4 rounded-xl border transition text-sm font-bold ${form.type === type ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/30 text-text-secondary"}`}
                >
                  {type.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })}
                className="w-full px-4 py-3 rounded-xl bg-surface-solid border border-border focus:border-primary focus:outline-none text-text-primary"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-solid border border-border focus:border-primary focus:outline-none text-text-primary font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-surface-solid border border-border focus:border-primary focus:outline-none resize-none text-text-primary"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-solid border border-border focus:border-primary focus:outline-none text-text-primary"
              >
                <option value="">Select</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Niche</label>
              <select
                value={form.niche}
                onChange={(e) => setForm({ ...form, niche: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-solid border border-border focus:border-primary focus:outline-none text-text-primary"
              >
                <option value="">Select</option>
                {niches.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Price ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="29"
                className="w-full px-4 py-3 rounded-xl bg-surface-solid border border-border focus:border-primary focus:outline-none text-text-primary"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <span className="text-sm font-medium">Featured Product</span>
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="px-4 py-2 rounded-xl bg-surface-solid border border-border focus:border-primary focus:outline-none text-text-primary"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button type="submit" className="btn-primary px-8 py-3">
              Create Product
            </button>
            <Link href="/admin/products" className="px-8 py-3 text-text-secondary hover:text-primary transition">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
