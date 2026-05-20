"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProductType = "PROMPT" | "WORKFLOW" | "VOICE_AGENT" | "BUNDLE";

const categories = ["Voice Agents", "Workflows", "AI Prompts", "Bundles"];
const niches = ["Plumbing", "Dental", "Real Estate", "Restaurant", "HVAC", "Cleaning", "Fitness", "Marketing", "Business", "Support", "HR"];

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    type: "WORKFLOW" as ProductType,
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
        <Link href="/admin/products" className="text-text-secondary hover:text-primary">
          ← Back to Products
        </Link>
      </div>

      <div className="glass-card p-8">
        <h1 className="text-2xl font-bold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium mb-3">Product Type</label>
            <div className="grid grid-cols-4 gap-4">
              {(["PROMPT", "WORKFLOW", "VOICE_AGENT", "BUNDLE"] as ProductType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({ ...form, type })}
                  className={`p-4 rounded-lg border transition ${form.type === type ? "border-primary bg-primary/20" : "border-border hover:border-primary"}`}
                >
                  <span className="text-sm font-medium">{type.replace("_", " ")}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title & Slug */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none resize-none"
              required
            />
          </div>

          {/* Category & Niche */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Niche</label>
              <select
                value={form.niche}
                onChange={(e) => setForm({ ...form, niche: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none"
              >
                <option value="">Select niche</option>
                {niches.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Price (in cents)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="2900"
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none"
              required
            />
            <p className="text-text-muted text-xs mt-1">Enter price in cents (2900 = $29.00)</p>
          </div>

          {/* Status & Featured */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">Featured Product</span>
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="px-4 py-2 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button type="submit" className="btn-primary px-8 py-3">
              Create Product
            </button>
            <Link href="/admin/products" className="px-8 py-3 text-text-secondary hover:text-primary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}