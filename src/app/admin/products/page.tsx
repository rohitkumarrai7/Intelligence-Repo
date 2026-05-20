"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";

const products = [
  { id: "1", title: "Plumber Voice Agent", slug: "plumber-voice-agent", type: "VOICE_AGENT", category: "Voice Agents", price: 2900, status: "PUBLISHED", downloads: 45, rating: 5 },
  { id: "2", title: "Dental Appointment Booking", slug: "dental-appointment-booking", type: "VOICE_AGENT", category: "Voice Agents", price: 2900, status: "PUBLISHED", downloads: 32, rating: 5 },
  { id: "3", title: "Content Repurposing", slug: "content-repurposing", type: "WORKFLOW", category: "Workflows", price: 2900, status: "PUBLISHED", downloads: 78, rating: 4 },
  { id: "4", title: "Lead Magnet Generator", slug: "lead-magnet-generator", type: "WORKFLOW", category: "Workflows", price: 2900, status: "DRAFT", downloads: 12, rating: 4 },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="glass-card">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface border border-border focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="p-4 text-text-muted font-medium">Product</th>
              <th className="p-4 text-text-muted font-medium">Type</th>
              <th className="p-4 text-text-muted font-medium">Price</th>
              <th className="p-4 text-text-muted font-medium">Status</th>
              <th className="p-4 text-text-muted font-medium">Downloads</th>
              <th className="p-4 text-text-muted font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-surface" />
                    <div>
                      <p className="font-medium">{product.title}</p>
                      <p className="text-text-muted text-xs">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                    {product.type.replace("_", " ")}
                  </span>
                </td>
                <td className="p-4">${(product.price / 100).toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${product.status === "PUBLISHED" ? "bg-success/20 text-success" : "bg-surface text-text-muted"}`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4">{product.downloads}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-surface transition">
                      <Eye className="w-4 h-4 text-text-muted" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-surface transition">
                      <Edit className="w-4 h-4 text-text-muted" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-surface transition">
                      <Trash2 className="w-4 h-4 text-error" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}