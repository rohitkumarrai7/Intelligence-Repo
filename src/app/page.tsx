"use client";

import { motion } from "framer-motion";
import { Bot, Zap, Phone, ArrowRight, CheckCircle, Star, Sparkles, Workflow, Mic, Code2, TrendingUp, Shield, Clock, Layout, MousePointer2 } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { MarketplaceCard } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";

const features = [
  { icon: Workflow, title: "n8n Workflows", desc: "Import-ready JSON workflows for automation", color: "bg-indigo-50 text-indigo-600" },
  { icon: Mic, title: "Voice Agent Kits", desc: "Retell/VAPI agents for real businesses", color: "bg-amber-50 text-amber-600" },
  { icon: Code2, title: "AI Prompts", desc: "Production-tested prompts with variables", color: "bg-emerald-50 text-emerald-600" },
  { icon: Zap, title: "Done-For-You", desc: "Custom deployment available", color: "bg-rose-50 text-rose-600" },
];

const stats = [
  { value: "15+", label: "Production Workflows" },
  { value: "7", label: "Voice Agent Kits" },
  { value: "3", label: "Product Packs" },
  { value: "500+", label: "Use Cases Covered" },
];

const productPacks = [
  {
    title: "Niche Voice Agents Pack",
    price: 147,
    description: "7 industry-specific voice agents designed for real-world businesses. Includes scripts, prompts, and deployment guides.",
    items: ["Plumber Voice Agent", "Dental Booking Agent", "Real Estate Lead Qualifier", "Restaurant WhatsApp Bot", "HVAC Emergency Dispatch", "Cleaning Quote Calculator", "Fitness Coach Follow-Up"],
    tags: ["voice", "sms", "calls"],
    category: "Voice Agents",
    featured: true,
    icon: Mic,
  },
  {
    title: "AI Marketing Pack",
    price: 127,
    description: "Automate your entire content engine. From repurposing to cold outreach, these workflows handle the heavy lifting.",
    items: ["Content Repurposing", "Lead Magnet Generator", "Cold Email Personalizer"],
    tags: ["content", "gemini", "marketing"],
    category: "Marketing",
    icon: Workflow,
  },
  {
    title: "Business Operations Pack",
    price: 147,
    description: "Streamline your back-office with AI. Handle summaries, tickets, and price monitoring automatically.",
    items: ["Meeting Summarizer", "Support Ticket Router", "Price Monitor", "Resume Screening", "Social Comment Responder"],
    tags: ["automation", "ai", "business"],
    category: "Operations",
    icon: Layout,
  },
];

const testimonials = [
  { name: "Sarah Chen", role: "Dental Practice Owner", text: "The dental booking workflow saved us 20 hours a week. Finally, automations that actually work!", rating: 5 },
  { name: "Mike Rodriguez", role: "HVAC Contractor", text: "Emergency dispatch is a game changer. My techs get called automatically when customers have AC emergencies.", rating: 5 },
  { name: "Jennifer Park", role: "Marketing Agency CEO", text: "The content repurposing workflow alone is worth the price. We repurpose everything now.", rating: 5 },
];

const comparison = [
  { feature: "Text prompts only", godofprompt: true, ours: false },
  { feature: "n8n workflows", godofprompt: false, ours: true },
  { feature: "Voice agent templates", godofprompt: false, ours: true },
  { feature: "Import-ready JSON", godofprompt: false, ours: true },
  { feature: "Done-for-you services", godofprompt: false, ours: true },
  { feature: "Recurring SaaS tier", godofprompt: false, ours: true },
];

export default function HomePage() {
  return (
    <div className="min-h-screen selection:bg-primary/20">
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
            <SignedOut>
              <SignInButton>
                <button className="text-sm font-medium text-text-secondary hover:text-primary transition">Login</button>
              </SignInButton>
              <SignUpButton>
                <button className="btn-primary text-sm">Get Started</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/account" className="text-sm font-medium text-text-secondary hover:text-primary transition">My Account</Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-8"
          >
            <div className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-bold uppercase tracking-wider text-primary">New</div>
            <span className="text-xs font-medium text-text-secondary">Evolution of AI Marketplaces</span>
            <ArrowRight className="w-3 h-3 text-text-muted" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[0.9]"
          >
            <span className="text-gradient">AI Assets</span> That
            <br />Actually{" "}
            <span className="text-gradient italic">Deploy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The only marketplace selling n8n workflows, voice agents, and AI prompts — 
            not just text. Import, deploy, profit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products" className="btn-primary flex items-center gap-2 text-lg px-8 py-4 group">
              Explore Marketplace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/pricing" className="px-8 py-4 rounded-full border border-border hover:border-primary/50 hover:bg-surface transition text-lg font-medium">
              View Pricing
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[5%] hidden xl:block"
        >
          <div className="glass-card p-4 w-44 rotate-[-3deg]">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">
              <Bot className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-sm font-bold">Voice Agents</p>
            <p className="text-[10px] text-text-muted font-medium">Ready to deploy JSON</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-[5%] hidden xl:block"
        >
          <div className="glass-card p-4 w-44 rotate-[3deg]">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
              <Workflow className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-sm font-bold">n8n Flows</p>
            <p className="text-[10px] text-text-muted font-medium">Import & Auto-run</p>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface/50 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-text-primary mb-2 tracking-tighter">{stat.value}</div>
                <p className="text-xs uppercase font-bold tracking-widest text-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Everything You Need to <span className="text-primary italic">Build & Scale</span></h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">Not just prompts — full deployable systems designed for immediate business impact.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] bg-white border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Packs */}
      <section className="py-32 bg-surface/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready-Made Product Packs</h2>
              <p className="text-text-secondary text-lg">Pick your niche, deploy today. Full documentation included.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-primary font-bold group">
              View all products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {productPacks.map((pack, i) => (
              <MarketplaceCard
                key={pack.title}
                title={pack.title}
                description={pack.description}
                price={pack.price}
                tags={pack.tags}
                category={pack.category}
                featured={pack.featured}
                icon={pack.icon}
                ctaText="Get Pack"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Why We Win</h2>
            <p className="text-text-secondary text-lg">vs traditional prompt marketplaces</p>
          </motion.div>

          <div className="glass-card overflow-hidden border-border/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface/50">
                  <th className="p-6 text-left text-sm font-bold uppercase tracking-wider text-text-muted">Feature</th>
                  <th className="p-6 text-center text-sm font-bold uppercase tracking-wider text-text-muted">God of Prompt</th>
                  <th className="p-6 text-center text-sm font-bold uppercase tracking-wider text-primary bg-primary/5">Intelligence Repo</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className="border-b border-border last:border-0 hover:bg-surface/30 transition-colors">
                    <td className="p-6 text-text-secondary font-medium">{row.feature}</td>
                    <td className="p-6 text-center">
                      {row.godofprompt ? <CheckCircle className="w-5 h-5 text-success mx-auto" /> : <div className="w-5 h-5 mx-auto bg-error/10 text-error rounded-full flex items-center justify-center text-[10px] font-bold">✕</div>}
                    </td>
                    <td className="p-6 text-center bg-primary/[0.02]">
                      {row.ours ? <CheckCircle className="w-5 h-5 text-success mx-auto" /> : <div className="w-5 h-5 mx-auto bg-error/10 text-error rounded-full flex items-center justify-center text-[10px] font-bold">✕</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-surface/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Real Results</h2>
            <p className="text-text-secondary text-lg">Trusted by agency owners and small businesses</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-text-primary font-medium mb-8 flex-grow leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-text-muted text-[11px] font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to <span className="text-gradient">Automate</span> Your Business?</h2>
            <p className="text-text-secondary text-xl mb-12 max-w-2xl mx-auto">
              Stop copying prompts. Start deploying workflows that actually drive revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5 group">
                Browse All Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="px-10 py-5 rounded-full border border-border hover:bg-white transition text-lg font-medium">
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Logo />
              </div>
              <p className="text-text-secondary text-sm max-w-sm leading-relaxed mb-6">
                The only AI marketplace where prompts come with workflows and voice agents — ready to deploy, not just copy-paste.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-text-muted">Product</h4>
              <div className="flex flex-col gap-4 text-sm font-medium text-text-secondary">
                <Link href="/workflows" className="hover:text-primary transition">Workflows</Link>
                <Link href="/voice-agents" className="hover:text-primary transition">Voice Agents</Link>
                <Link href="/pricing" className="hover:text-primary transition">Pricing</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-text-muted">Company</h4>
              <div className="flex flex-col gap-4 text-sm font-medium text-text-secondary">
                <Link href="/privacy" className="hover:text-primary transition">Privacy</Link>
                <Link href="/terms" className="hover:text-primary transition">Terms</Link>
                <Link href="/contact" className="hover:text-primary transition">Contact</Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-text-muted text-xs font-medium">© 2026 Intelligence Repository. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border">
                <Shield className="w-4 h-4 text-text-muted" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-border">
                <Clock className="w-4 h-4 text-text-muted" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
