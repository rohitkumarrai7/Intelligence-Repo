"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star, Sparkles, Workflow, Mic, Code2, Zap, TrendingUp, Shield, Clock, Bot, Package, Users } from "lucide-react";
import Link from "next/link";
import { MarketplaceCard } from "@/components/ui/Card";
import { Navbar, Footer } from "@/components/ui/Navbar";
import { products, productPacks, subscriptionTiers } from "@/lib/data";

const features = [
  { icon: Code2, title: "Full Codebases", desc: "8 production-grade SaaS projects with complete source", color: "bg-primary/10 text-primary border-primary/20" },
  { icon: Workflow, title: "n8n Workflows", desc: "Import-ready JSON automations", color: "bg-accent/10 text-accent border-accent/20" },
  { icon: Mic, title: "Voice Agent Kits", desc: "7 industry-specific AI agents", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { icon: Zap, title: "Chrome Extensions", desc: "ATS & recruitment tools ready to deploy", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Dental Practice Owner", text: "The dental booking workflow saved us 20 hours a week. Finally, automations that actually work!", rating: 5 },
  { name: "Mike Rodriguez", role: "HVAC Contractor", text: "Emergency dispatch is a game changer. My techs get called automatically when customers have AC emergencies.", rating: 5 },
  { name: "Jennifer Park", role: "Marketing Agency CEO", text: "Bought the Developer Pro Pack — the codebases alone were worth 10x the price. My team ships 3x faster now.", rating: 5 },
];

const comparison = [
  { feature: "Full source codebases", godofprompt: false, ours: true },
  { feature: "n8n workflows", godofprompt: false, ours: true },
  { feature: "Voice agent templates", godofprompt: false, ours: true },
  { feature: "Import-ready JSON", godofprompt: false, ours: true },
  { feature: "Chrome extensions", godofprompt: false, ours: true },
  { feature: "Text prompts only", godofprompt: true, ours: false },
  { feature: "White-label rights", godofprompt: false, ours: true },
  { feature: "Subscription access", godofprompt: false, ours: true },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function HomePage() {
  const featuredProducts = products.filter(p => p.rating >= 5).slice(0, 6);

  return (
    <div className="min-h-screen selection:bg-primary/20">
      <Navbar />

      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-8"
          >
            <div className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-bold uppercase tracking-wider text-primary">New</div>
            <span className="text-xs font-medium text-text-secondary">Premium Codebases + AI Workflows</span>
            <ArrowRight className="w-3 h-3 text-text-muted" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-[0.9]"
          >
            <span className="text-gradient">Codebases</span> &
            <br />AI <span className="text-gradient italic">Workflows</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The only marketplace selling full project codebases, n8n workflows, voice agents, 
            and Chrome extensions — ready to deploy, not just copy-paste.
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
            <Link href="/pricing" className="btn-secondary text-lg px-8 py-4">
              View Pricing
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[5%] hidden xl:block"
        >
          <div className="glass-card p-4 w-48 rotate-[-3deg]">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-bold">Full Codebases</p>
            <p className="text-[10px] text-text-muted font-medium">8 production-grade projects</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-[5%] hidden xl:block"
        >
          <div className="glass-card p-4 w-48 rotate-[3deg]">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
              <Workflow className="w-5 h-5 text-accent" />
            </div>
            <p className="text-sm font-bold">n8n Flows</p>
            <p className="text-[10px] text-text-muted font-medium">15 import-ready JSON</p>
          </div>
        </motion.div>
      </section>

      <section className="py-20 border-y border-border bg-surface-solid/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: 8, suffix: "", label: "Codebases" },
              { value: 15, suffix: "", label: "Workflows" },
              { value: 7, suffix: "", label: "Voice Agents" },
              { value: 500, suffix: "+", label: "Use Cases" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-extrabold text-primary mb-2 tracking-tighter">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs uppercase font-bold tracking-widest text-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Everything You Need to <span className="text-gradient">Build & Scale</span></h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">Not just prompts — full deployable codebases, workflows, and agents designed for immediate business impact.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] bg-surface-solid border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${f.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Featured <span className="text-gradient">Products</span></h2>
              <p className="text-text-secondary text-lg">Top-rated codebases and workflows from our collection.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-primary font-bold group">
              View all products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <MarketplaceCard
                  title={product.name}
                  description={product.shortDescription}
                  price={product.price}
                  comparePrice={product.comparePrice}
                  category={product.category}
                  tags={[product.niche]}
                  techStack={product.techStack || product.apps}
                  ctaText="View Details"
                  href={`/products/${product.slug}`}
                  icon={product.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Why We <span className="text-gradient">Win</span></h2>
            <p className="text-text-secondary text-lg">vs traditional prompt marketplaces</p>
          </motion.div>

          <div className="glass-card overflow-hidden border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-solid/50">
                  <th className="p-6 text-left text-xs font-bold uppercase tracking-widest text-text-muted">Feature</th>
                  <th className="p-6 text-center text-xs font-bold uppercase tracking-widest text-text-muted">God of Prompt</th>
                  <th className="p-6 text-center text-xs font-bold uppercase tracking-widest text-primary bg-primary/5">Intelligence Repo</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0 hover:bg-surface-solid/30 transition-colors">
                    <td className="p-6 text-text-secondary font-medium">{row.feature}</td>
                    <td className="p-6 text-center">
                      {row.godofprompt ? <CheckCircle className="w-5 h-5 text-success mx-auto" /> : <div className="w-5 h-5 mx-auto rounded-full bg-error/10 text-error flex items-center justify-center text-[10px] font-bold">&times;</div>}
                    </td>
                    <td className="p-6 text-center bg-primary/[0.02]">
                      {row.ours ? <CheckCircle className="w-5 h-5 text-primary mx-auto" /> : <div className="w-5 h-5 mx-auto rounded-full bg-error/10 text-error flex items-center justify-center text-[10px] font-bold">&times;</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Real <span className="text-gradient">Results</span></h2>
            <p className="text-text-secondary text-lg">Trusted by developers, agencies, and small businesses</p>
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
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-text-primary font-medium mb-8 flex-grow leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to <span className="text-gradient">Build</span>?</h2>
            <p className="text-text-secondary text-xl mb-12 max-w-2xl mx-auto">
              Stop copying prompts. Start deploying real codebases and workflows that drive revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5 group">
                Browse All Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-secondary text-lg px-10 py-5">
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
