"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Mail, Phone, MapPin, Send, CheckCircle, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const subjects = [
  { value: "", label: "Select a subject" },
  { value: "sales", label: "Sales Inquiry" },
  { value: "meeting", label: "Book a Meeting" },
  { value: "support", label: "Technical Support" },
  { value: "custom", label: "Custom Development" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="scale-75 origin-left" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/workflows" className="text-sm font-medium text-text-secondary hover:text-primary transition">Workflows</Link>
            <Link href="/voice-agents" className="text-sm font-medium text-text-secondary hover:text-primary transition">Voice Agents</Link>
            <Link href="/pricing" className="text-sm font-medium text-text-secondary hover:text-primary transition">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signup" className="btn-primary text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <Mail className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Contact Us</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Get in <span className="text-gradient italic">Touch</span></h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
              Have questions about our workflows or need a custom AI solution? 
              Our team of experts is ready to help you automate your business.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Mail, label: "Email", value: "support@intelligencerepo.ai", desc: "For general inquiries" },
              { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", desc: "Mon-Fri, 9am-5pm EST" },
              { icon: MapPin, label: "Location", value: "Remote Worldwide", desc: "Operating globally" }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-8 text-center group hover:border-primary/20 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1">{item.label}</h3>
                <p className="text-text-primary font-bold mb-1">{item.value}</p>
                <p className="text-text-muted text-xs font-medium uppercase tracking-widest">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 md:p-12"
          >
            {submitted ? (
              <div className="text-center py-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle className="w-10 h-10 text-success" />
                </motion.div>
                <h3 className="text-3xl font-black mb-4 tracking-tight">Message Received!</h3>
                <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
                  We&apos;ve received your message and will get back to you within 24 hours. A confirmation has been sent to your email.
                </p>
                <Link href="/" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
                  Back to Home <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 rounded-2xl bg-error/10 text-error text-sm font-bold border border-error/20">
                    {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-medium"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-medium"
                      placeholder="jane@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-bold"
                    required
                  >
                    {subjects.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted ml-1">Your Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-medium resize-none"
                    placeholder="Tell us about your project or questions..."
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-5 flex items-center justify-center gap-3 disabled:opacity-50 text-lg group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send Message
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-text-muted text-xs font-medium uppercase tracking-widest">
                  Secure transmission. No spam guaranteed.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-text-muted text-xs font-bold uppercase tracking-widest">© 2026 Intelligence Repository. Professional AI Solutions.</p>
        </div>
      </footer>
    </div>
  );
}