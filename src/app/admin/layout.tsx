"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Sparkles, Zap, Package, Users, BarChart3, Settings, LogOut, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { usePathname } from "next/navigation";

const adminNavItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export const recentOrders = [
  { id: "ORD-001", product: "Plumber Voice Agent", customer: "sarah@email.com", amount: 29, status: "completed" },
  { id: "ORD-002", product: "Niche Voice Agents Pack", customer: "mike@email.com", amount: 147, status: "completed" },
  { id: "ORD-003", product: "Content Repurposing", customer: "jennifer@email.com", amount: 29, status: "pending" },
];

export const stats = [
  { label: "Total Revenue", value: "$4,297", change: "+12%", trend: "up" },
  { label: "Products Sold", value: "156", change: "+8%", trend: "up" },
  { label: "Active Users", value: "89", change: "+23%", trend: "up" },
  { label: "Conversion Rate", value: "3.2%", change: "-2%", trend: "down" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className={`fixed left-0 top-0 bottom-0 z-40 bg-surface border-r border-border pt-20 transition-all ${sidebarOpen ? "w-64" : "w-20"}`}>
          <nav className="p-4 space-y-2">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-surface-hover ${pathname === item.href ? "bg-primary/20 text-primary" : "text-text-secondary"}`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </aside>

        <div className={`flex-1 transition-all ${sidebarOpen ? "ml-64" : "ml-20"}`}>
          <header className="sticky top-0 z-30 h-16 bg-surface border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-text-muted hover:text-primary">
                {sidebarOpen ? "◀" : "▶"}
              </button>
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-text-secondary hover:text-primary">View Site</Link>
              <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </header>

          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <p className="text-text-muted text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold mb-2">{stat.value}</p>
            <span className={`text-sm ${stat.trend === "up" ? "text-success" : "text-error"}`}>
              {stat.change}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-4 text-text-muted font-medium">Order ID</th>
              <th className="pb-4 text-text-muted font-medium">Product</th>
              <th className="pb-4 text-text-muted font-medium">Customer</th>
              <th className="pb-4 text-text-muted font-medium">Amount</th>
              <th className="pb-4 text-text-muted font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-border">
                <td className="py-4">{order.id}</td>
                <td className="py-4">{order.product}</td>
                <td className="py-4">{order.customer}</td>
                <td className="py-4">${order.amount}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${order.status === "completed" ? "bg-success/20 text-success" : "bg-accent/20 text-accent"}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Link href="/admin/products/new" className="glass-card p-6 hover:bg-surface-hover transition">
          <Plus className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-semibold mb-2">Add New Product</h3>
          <p className="text-text-muted text-sm">Create a new workflow, voice agent, or prompt</p>
        </Link>
        <div className="glass-card p-6">
          <BarChart3 className="w-8 h-8 text-accent mb-4" />
          <h3 className="font-semibold mb-2">View Analytics</h3>
          <p className="text-text-muted text-sm">Track sales and user engagement</p>
        </div>
        <div className="glass-card p-6">
          <Users className="w-8 h-8 text-success mb-4" />
          <h3 className="font-semibold mb-2">Manage Users</h3>
          <p className="text-text-muted text-sm">View and manage user accounts</p>
        </div>
      </div>
    </div>
  );
}