"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="scale-75 origin-left" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-sm font-medium text-text-secondary hover:text-primary transition">Products</Link>
          <Link href="/codebases" className="text-sm font-medium text-text-secondary hover:text-primary transition">Codebases</Link>
          <Link href="/workflows" className="text-sm font-medium text-text-secondary hover:text-primary transition">Workflows</Link>
          <Link href="/pricing" className="text-sm font-medium text-text-secondary hover:text-primary transition">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-primary transition">Login</Link>
          <Link href="/signup" className="btn-primary text-sm">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="py-20 border-t border-border bg-surface-solid/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Logo />
            </div>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed mb-6">
              The premium marketplace for AI codebases, n8n workflows, voice agents, and Chrome extensions. Real projects, instant downloads.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-text-muted">Products</h4>
            <div className="flex flex-col gap-3 text-sm font-medium text-text-secondary">
              <Link href="/codebases" className="hover:text-primary transition">Codebases</Link>
              <Link href="/workflows" className="hover:text-primary transition">Workflows</Link>
              <Link href="/voice-agents" className="hover:text-primary transition">Voice Agents</Link>
              <Link href="/pricing" className="hover:text-primary transition">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-text-muted">Company</h4>
            <div className="flex flex-col gap-3 text-sm font-medium text-text-secondary">
              <Link href="/about" className="hover:text-primary transition">About</Link>
              <Link href="/blog" className="hover:text-primary transition">Blog</Link>
              <Link href="/faq" className="hover:text-primary transition">FAQ</Link>
              <Link href="/contact" className="hover:text-primary transition">Contact</Link>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-muted text-xs font-medium">&copy; 2026 Intelligence Repository. All rights reserved.</p>
          <div className="flex items-center gap-6 text-text-muted text-xs">
            <Link href="/privacy" className="hover:text-primary transition">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
