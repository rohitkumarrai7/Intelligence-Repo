"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Download, Shield, Star, Bot, Copy, Check, ExternalLink, Clock, BarChart3, Zap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components/ui/Navbar";
import { MarketplaceCard } from "@/components/ui/Card";
import { products, getProductBySlug } from "@/lib/data";
import { generateClientEventId, getMetaBrowserIds, trackInitiateCheckout } from "@/lib/meta-client";
import { useUser } from "@clerk/nextjs";

export default function ProductDetailPage() {
  const params = useParams();
  const { user } = useUser();
  const product = getProductBySlug(params.slug as string);
  const [copied, setCopied] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const router = useRouter();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center pt-20">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-text-secondary mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.type === product.type && p.slug !== product.slug)
    .slice(0, 3);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const typeLabel = product.type === "codebase" ? "Codebase" : product.type === "workflow" ? "n8n Workflow" : "Voice Agent Kit";
  const typeColor = product.type === "codebase" ? "bg-primary/10 text-primary border-primary/20" : product.type === "workflow" ? "bg-accent/10 text-accent border-accent/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const eventId = generateClientEventId();
      trackInitiateCheckout({
        eventId,
        value: product.price,
        currency: "USD",
        contentName: product.name,
        contentIds: [product.slug],
      });
      const { fbp, fbc } = getMetaBrowserIds();
      const email = user?.primaryEmailAddress?.emailAddress;
      const externalId = user?.id;

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: product.slug, eventId, fbp, fbc, email, externalId }),
      });
      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.demo) {
        router.push(`/checkout/success?demo=true&product=${product.slug}&price=${data.price}`);
      } else {
        alert("Checkout failed. Please try again.");
      }
    } catch {
      alert("Checkout failed. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/products" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="relative aspect-video rounded-[32px] overflow-hidden bg-surface-solid border border-border shadow-2xl group">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-solid to-background">
                  <div className="text-center p-8">
                    <product.icon className="w-20 h-20 text-primary mx-auto mb-4 opacity-40" />
                    <p className="text-lg font-bold text-text-primary">{product.name}</p>
                    <p className="text-sm text-text-muted mt-1">{typeLabel}</p>
                  </div>
                </div>
              </div>

              {product.techStack && product.techStack.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.techStack.map(tech => (
                      <span key={tech} className="px-4 py-2 text-sm font-mono font-medium rounded-xl bg-accent/10 text-accent border border-accent/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass-card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-border"}`} />
                  ))}
                  <span className="text-text-primary font-bold ml-2">{product.rating.toFixed(1)}</span>
                  <span className="text-text-muted ml-2">({product.reviews} verified reviews)</span>
                </div>
                <p className="text-text-secondary italic text-sm leading-relaxed">
                  &ldquo;Saved us at least 10 hours of dev work. The setup guide was incredibly detailed.&rdquo;
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted mt-3">&mdash; Verified Buyer</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${typeColor}`}>
                    {typeLabel}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-surface-solid text-[10px] font-bold uppercase tracking-widest text-text-muted border border-border">
                    {product.niche}
                  </div>
                  {product.difficulty && (
                    <div className="px-3 py-1 rounded-full bg-surface-solid text-[10px] font-bold uppercase tracking-widest text-text-muted border border-border">
                      {product.difficulty}
                    </div>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">{product.name}</h1>
                <p className="text-text-secondary text-lg leading-relaxed">{product.description}</p>
              </div>

              <div className="p-8 rounded-[32px] bg-surface-solid border border-border">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-text-muted block mb-1">Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-text-primary">${product.price}</span>
                      {product.comparePrice && (
                        <span className="text-xl text-text-muted line-through">${product.comparePrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-success font-bold text-sm uppercase tracking-widest flex items-center gap-2 justify-end mb-1">
                      <Shield className="w-4 h-4" /> Secure
                    </div>
                    <span className="text-xs font-medium text-text-muted">Instant Download</span>
                  </div>
                </div>
                {product.polarCheckoutUrl ? (
                    <a
                      href={product.polarCheckoutUrl}
                      data-polar-checkout
                      data-polar-checkout-theme="dark"
                      className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg group no-underline"
                    >
                      <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" /> Purchase & Download
                    </a>
                  ) : (
                    <button onClick={handlePurchase} disabled={purchasing} className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg group disabled:opacity-50">
                      {purchasing ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" /> Purchase & Download</>}
                    </button>
                  )}
                {product.demoUrl && (
                  <Link href={product.demoUrl} className="mt-3 btn-secondary w-full py-4 flex items-center justify-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4" /> View Live Demo
                  </Link>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-6">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {product.includes.map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium text-text-secondary">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-6">Features</h3>
                  <ul className="space-y-3">
                    {product.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm font-medium text-text-secondary">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-3 h-3 text-primary" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {product.promptText && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">System Prompt</h3>
                    <button
                      onClick={() => handleCopy(product.promptText!)}
                      className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover transition"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                  <div className="p-6 rounded-2xl bg-surface-solid border border-primary/20 font-mono text-sm text-text-secondary leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                    {product.promptText}
                  </div>
                </div>
              )}

              {product.apps && product.apps.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-4">Apps Integrated</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.apps.map(app => (
                      <span key={app} className="px-4 py-2 text-sm font-medium rounded-xl bg-surface-solid border border-border text-text-primary">{app}</span>
                    ))}
                  </div>
                </div>
              )}

              {(product.setupTime || product.licenseType) && (
                <div className="grid grid-cols-2 gap-4">
                  {product.setupTime && (
                    <div className="glass-card p-4 text-center">
                      <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-xs text-text-muted uppercase tracking-wider">Setup Time</p>
                      <p className="text-sm font-bold">{product.setupTime}</p>
                    </div>
                  )}
                  {product.licenseType && (
                    <div className="glass-card p-4 text-center">
                      <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-xs text-text-muted uppercase tracking-wider">License</p>
                      <p className="text-sm font-bold capitalize">{product.licenseType}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-32">
              <h2 className="text-3xl font-bold mb-12 tracking-tight">Related <span className="text-gradient">Products</span></h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProducts.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <MarketplaceCard
                      title={p.name}
                      description={p.shortDescription}
                      price={p.price}
                      comparePrice={p.comparePrice}
                      category={p.category}
                      tags={[p.niche]}
                      techStack={p.techStack || p.apps}
                      ctaText="View Details"
                      href={`/products/${p.slug}`}
                      icon={p.icon}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
