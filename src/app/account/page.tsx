"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Download, CreditCard, ArrowRight, LogOut, Gift } from "lucide-react";
import { Navbar, Footer } from "@/components/ui/Navbar";

interface UserWorkflow {
  workflow_slug: string;
  source: string;
  granted_at: string;
  download_count: number;
}

export default function AccountPage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [workflows, setWorkflows] = useState<UserWorkflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser({ email: data.email, name: data.name || "" });
        if (data.workflows) setWorkflows(data.workflows);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setUser(null);
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Sign in to view your account</h2>
            <p className="text-text-secondary mb-6">Access your purchases, downloads, and free workflows</p>
            <Link href="/login" className="btn-primary inline-flex items-center gap-2">
              Sign In <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-bold mb-2">My Account</h1>
              <p className="text-text-secondary">{user.email}</p>
            </motion.div>
            <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 text-sm">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Gift className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">My Workflows</h2>
              </div>

              {workflows.length > 0 ? (
                <div className="space-y-4">
                  {workflows.map((wf) => (
                    <div key={wf.workflow_slug} className="flex items-center justify-between p-4 bg-surface-solid rounded-xl border border-border">
                      <div>
                        <p className="font-medium">
                          {wf.workflow_slug === "dental-appointment-booking"
                            ? "Dental Clinic Appointment Booking Bot"
                            : wf.workflow_slug}
                        </p>
                        <p className="text-text-muted text-sm">
                          {wf.source === "FREE_SIGNUP" ? "Free signup bonus" : "Purchased"} &middot; Granted {new Date(wf.granted_at).toLocaleDateString()}
                        </p>
                      </div>
                      <a
                        href={`/workflow/json/${wf.workflow_slug === "dental-appointment-booking" ? "dental-booking-production" : wf.workflow_slug}.json`}
                        download
                        className="flex items-center gap-2 text-sm text-primary hover:underline font-bold"
                      >
                        <Download className="w-4 h-4" /> Download
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-text-secondary mb-4">No workflows yet</p>
                  <Link href="/signup" className="btn-primary text-sm">
                    Sign up to get a free workflow
                  </Link>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <Link href="/products" className="glass-card p-6 hover:border-primary/30 transition">
                <Sparkles className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-semibold mb-1">Browse Products</h3>
                <p className="text-text-muted text-sm">Explore codebases and workflows</p>
              </Link>
              <Link href="/pricing" className="glass-card p-6 hover:border-primary/30 transition">
                <CreditCard className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-1">Pricing</h3>
                <p className="text-text-muted text-sm">View plans and bundles</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
