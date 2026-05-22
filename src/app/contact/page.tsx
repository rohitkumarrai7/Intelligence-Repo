"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/ui/Navbar";

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
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <Mail className="w-3 h-3 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Contact Us</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">Get in <span className="text-gradient italic">Touch</span></h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
              Have questions about our codebases or need a custom AI solution? We&apos;re here to help.
            </p>
          </motion.div>

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
                <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1">{item.label}</h3>
                <p className="text-text-primary font-bold mb-1">{item.value}</p>
                <p className="text-text-muted text-xs font-bold uppercase tracking-widest">{item.desc}</p>
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
                  className="w-20 h-20 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle className="w-10 h-10 text-success" />
                </motion.div>
                <h3 className="text-3xl font-extrabold mb-4 tracking-tight">Message Received!</h3>
                <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
                  We&apos;ve received your message and will get back to you within 24 hours.
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
                      className="w-full px-6 py-4 rounded-2xl bg-surface-solid border border-border focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-medium text-text-primary placeholder:text-text-muted"
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
                      className="w-full px-6 py-4 rounded-2xl bg-surface-solid border border-border focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-medium text-text-primary placeholder:text-text-muted"
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
                    className="w-full px-6 py-4 rounded-2xl bg-surface-solid border border-border focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-bold text-text-primary"
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
                    className="w-full px-6 py-4 rounded-2xl bg-surface-solid border border-border focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all font-medium resize-none text-text-primary placeholder:text-text-muted"
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
                      <><Loader2 className="w-6 h-6 animate-spin" /> Processing...</>
                    ) : (
                      <><Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send Message</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
