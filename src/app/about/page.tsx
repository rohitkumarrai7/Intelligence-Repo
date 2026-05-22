"use client";

import { motion } from "framer-motion";
import { Code2, Workflow, Mic, Target, Users, Zap, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/ui/Navbar";

const timeline = [
  { year: "2024", title: "Started Building", desc: "Began creating AI-powered tools and automation workflows for real businesses." },
  { year: "2025", title: "15+ Products", desc: "Built a portfolio of 11 codebases, 15 workflows, and 7 voice agent kits." },
  { year: "2026", title: "Marketplace Launch", desc: "Launched Intelligence Repository — the premium codebase & workflow marketplace." },
];

const values = [
  { icon: Code2, title: "Real Code, Real Value", desc: "Every product is a real project we built and deployed. Not tutorials — production code." },
  { icon: Workflow, title: "Import & Deploy", desc: "Workflows are import-ready JSON files. Codebases come with setup guides. Deploy in minutes." },
  { icon: Target, title: "Niche-Specific", desc: "Built for real industries: plumbing, dental, real estate, HVAC, restaurants, and more." },
  { icon: Users, title: "Developer First", desc: "Source code, documentation, and support. Everything a developer needs to ship fast." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">About Us</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              We Build <span className="text-gradient">Real</span> AI Products
            </h1>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
              Intelligence Repository is a marketplace born from real-world experience. 
              Every codebase, workflow, and agent we sell was built for an actual business use case.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 mb-24"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                We got tired of prompt marketplaces selling text files for $29. We wanted real, deployable AI products — 
                full source code, import-ready workflows, production voice agents. So we built them.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Intelligence Repository is the only marketplace where you can buy a complete SaaS codebase, 
                an n8n automation workflow, a voice agent kit, and a Chrome extension — all in one place.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                Every product comes with source code, setup guides, demo videos, and commercial licensing. 
                Download, customize, deploy, profit.
              </p>
            </div>
          </motion.div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-12 text-center">Our <span className="text-gradient">Values</span></h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-8"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-12 text-center">Our <span className="text-gradient">Journey</span></h2>
            <div className="space-y-8 max-w-2xl mx-auto">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {item.year}
                    </div>
                    {i < timeline.length - 1 && <div className="w-px h-full bg-border mt-2" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start <span className="text-gradient">Building</span>?</h2>
            <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">Browse our collection of real codebases, workflows, and AI agents.</p>
            <Link href="/products" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 group">
              Explore Marketplace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
