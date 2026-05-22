"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye, BarChart3, Package, Users, Settings, LogOut, Code2, Workflow, Mic, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { products } from "@/lib/data";

const adminNavItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className={`fixed left-0 top-0 bottom-0 z-40 bg-surface-solid border-r border-border pt-6 transition-all ${sidebarOpen ? "w-64" : "w-20"}`}>
          <div className="px-6 mb-8">
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              <span className="text-primary">IR</span> Admin
            </Link>
          </div>
          <nav className="p-4 space-y-2">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-surface-hover ${pathname === item.href ? "bg-primary/10 text-primary border border-primary/20" : "text-text-secondary"}`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </aside>

        <div className={`flex-1 transition-all ${sidebarOpen ? "ml-64" : "ml-20"}`}>
          <header className="sticky top-0 z-30 h-16 bg-surface-solid border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-text-muted hover:text-primary transition">
                {sidebarOpen ? "◀" : "▶"}
              </button>
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-text-secondary hover:text-primary transition">View Site</Link>
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
