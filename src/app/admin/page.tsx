"use client";

import { motion } from "framer-motion";
import { Plus, BarChart3, Package, Users, Code2, Workflow, Zap } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data";

const recentOrders = [
  { id: "ORD-001", product: "Obsidian AI Website Builder", customer: "sarah@email.com", amount: 197, status: "completed" },
  { id: "ORD-002", product: "Agency Arsenal Pack", customer: "mike@email.com", amount: 397, status: "completed" },
  { id: "ORD-003", product: "ML Sales Predictor", customer: "jennifer@email.com", amount: 127, status: "pending" },
  { id: "ORD-004", product: "Niche Voice Agents Pack", customer: "alex@email.com", amount: 147, status: "completed" },
];

const dashboardStats = [
  { label: "Total Revenue", value: "$12,847", change: "+18%", trend: "up" as const, icon: BarChart3 },
  { label: "Products", value: "33", change: "+11", trend: "up" as const, icon: Package },
  { label: "Active Users", value: "234", change: "+45%", trend: "up" as const, icon: Users },
  { label: "Conversion Rate", value: "4.2%", change: "+0.8%", trend: "up" as const, icon: Zap },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-5 h-5 text-primary" />
              <span className={`text-xs font-bold ${stat.trend === "up" ? "text-success" : "text-error"}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-3xl font-extrabold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-4 text-text-muted text-xs uppercase tracking-wider font-medium">Order ID</th>
                <th className="pb-4 text-text-muted text-xs uppercase tracking-wider font-medium">Product</th>
                <th className="pb-4 text-text-muted text-xs uppercase tracking-wider font-medium">Customer</th>
                <th className="pb-4 text-text-muted text-xs uppercase tracking-wider font-medium">Amount</th>
                <th className="pb-4 text-text-muted text-xs uppercase tracking-wider font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border">
                  <td className="py-4 font-mono text-sm">{order.id}</td>
                  <td className="py-4 font-medium">{order.product}</td>
                  <td className="py-4 text-text-secondary">{order.customer}</td>
                  <td className="py-4 font-bold">${order.amount}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-bold ${order.status === "completed" ? "bg-success/10 text-success border border-success/20" : "bg-primary/10 text-primary border border-primary/20"}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/admin/products/new" className="glass-card p-6 hover:border-primary/30 transition group">
          <Plus className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-bold mb-2">Add New Product</h3>
          <p className="text-text-muted text-sm">Create a new codebase, workflow, or voice agent</p>
        </Link>
        <div className="glass-card p-6">
          <Code2 className="w-8 h-8 text-accent mb-4" />
          <h3 className="font-bold mb-2">Codebases</h3>
          <p className="text-text-muted text-sm">{products.filter(p => p.type === "codebase").length} products in catalog</p>
        </div>
        <div className="glass-card p-6">
          <Workflow className="w-8 h-8 text-success mb-4" />
          <h3 className="font-bold mb-2">Workflows</h3>
          <p className="text-text-muted text-sm">{products.filter(p => p.type === "workflow").length} workflows published</p>
        </div>
      </div>
    </div>
  );
}
