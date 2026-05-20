"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Download, Sparkles, Shield, Clock, Star, Bot, Mic, Play } from "lucide-react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";

export default function VoiceAgentDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product || product.type !== "voice_agent") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="scale-75 origin-left" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/voice-agents" className="text-sm font-medium text-text-secondary hover:text-primary transition flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Voice Kits
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signup" className="btn-primary text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Visuals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="relative aspect-video rounded-[32px] overflow-hidden bg-surface border border-border shadow-2xl group">
                <Image 
                  src={`/workflow/images/${product.thumbnail}`} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>

              <div className="p-8 rounded-3xl bg-surface border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center shadow-sm">
                    <Play className="w-5 h-5 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Demo Recording</p>
                    <p className="text-xs text-text-muted">Listen to the agent in action</p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-primary">0:45</span>
                </div>
              </div>

              <div className="glass-card p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-5 h-5", i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-border")} />
                  ))}
                  <span className="text-text-primary font-bold ml-2">{product.rating.toFixed(1)}</span>
                  <span className="text-text-muted ml-2">({product.reviews} verified reviews)</span>
                </div>
                <p className="text-text-secondary italic text-sm leading-relaxed">
                  &ldquo;This agent handles our calls perfectly. The integration with our CRM was seamless.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Right Column: Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-amber-50 text-[10px] font-black uppercase tracking-widest text-amber-600 border border-amber-200">Voice Agent Kit</div>
                  <div className="px-3 py-1 rounded-full bg-surface text-[10px] font-black uppercase tracking-widest text-text-muted border border-border">{product.niche}</div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">{product.name}</h1>
                <p className="text-text-secondary text-xl leading-relaxed">{product.description}</p>
              </div>

              <div className="p-8 rounded-[32px] bg-surface/50 border border-border">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-text-muted block mb-1">Kit Price</span>
                    <span className="text-5xl font-black text-text-primary">${product.price}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-success font-black text-sm uppercase tracking-widest flex items-center gap-2 justify-end mb-1">
                      <Shield className="w-4 h-4" /> Secure
                    </div>
                    <span className="text-xs font-medium text-text-muted">Instant Access</span>
                  </div>
                </div>
                <button className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg group">
                  <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" /> Get Voice Kit
                </button>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-6">Capabilities</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {product.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-6">What&apos;s Included</h3>
                <ul className="space-y-3">
                  {product.includes.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-text-muted text-xs font-bold uppercase tracking-widest">© 2026 Intelligence Repository. Verified Voice Kits.</p>
        </div>
      </footer>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
