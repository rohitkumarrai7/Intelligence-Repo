"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag, User } from "lucide-react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/ui/Navbar";

const posts = [
  {
    slug: "building-ai-codebases-that-sell",
    title: "Building AI Codebases That People Actually Want to Buy",
    excerpt: "How we turned 11 real SaaS projects into marketable codebase products. Lessons on what makes a codebase valuable.",
    category: "Building",
    author: "Intelligence Repo Team",
    date: "May 15, 2026",
    readTime: "8 min",
  },
  {
    slug: "n8n-workflow-automation-guide",
    title: "The Complete Guide to n8n Workflow Automation in 2026",
    excerpt: "Everything you need to know about building, testing, and selling n8n automation workflows. From beginner to advanced.",
    category: "Tutorials",
    author: "Intelligence Repo Team",
    date: "May 10, 2026",
    readTime: "12 min",
  },
  {
    slug: "voice-agents-for-small-business",
    title: "How Voice AI Agents Are Transforming Small Businesses",
    excerpt: "Real case studies of plumbers, dentists, and HVAC companies using AI voice agents to handle calls, book appointments, and close leads.",
    category: "Case Studies",
    author: "Intelligence Repo Team",
    date: "May 5, 2026",
    readTime: "6 min",
  },
  {
    slug: "chrome-extension-development-guide",
    title: "Building Chrome Extensions with AI: A Developer's Guide",
    excerpt: "Step-by-step guide to building Chrome extensions that integrate with AI APIs. Covers Manifest V3, React, and deployment.",
    category: "Tutorials",
    author: "Intelligence Repo Team",
    date: "Apr 28, 2026",
    readTime: "10 min",
  },
  {
    slug: "selling-digital-products-online",
    title: "How to Sell Digital Products: Codebases, Workflows, and Templates",
    excerpt: "A complete playbook for developers who want to monetize their side projects. Pricing, marketing, and delivery strategies.",
    category: "Business",
    author: "Intelligence Repo Team",
    date: "Apr 20, 2026",
    readTime: "7 min",
  },
  {
    slug: "ai-automation-stacks-2026",
    title: "The Best AI Automation Stacks in 2026",
    excerpt: "Comparing the top AI automation tools: n8n vs Zapier vs Make. Which one should you use for your next project?",
    category: "Guides",
    author: "Intelligence Repo Team",
    date: "Apr 15, 2026",
    readTime: "9 min",
  },
];

const categories = ["All", "Tutorials", "Case Studies", "Building", "Business", "Guides"];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Blog</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">AI <span className="text-gradient">Insights</span></h1>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto">Tutorials, guides, and case studies on building AI products, automation, and selling digital assets.</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition border ${cat === "All" ? "bg-primary/10 text-primary border-primary/20" : "bg-surface-solid text-text-muted border-border hover:text-text-primary"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group"
              >
                <div className="aspect-video bg-gradient-to-br from-surface-solid to-background flex items-center justify-center">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{post.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {post.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition leading-tight">{post.title}</h2>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{post.date}</span>
                    <span className="text-primary text-sm font-bold group-hover:underline">Read More &rarr;</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
