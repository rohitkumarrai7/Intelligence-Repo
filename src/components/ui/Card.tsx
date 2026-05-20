import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CardProps {
  icon?: LucideIcon;
  image?: string;
  category?: string;
  title: string;
  description: string;
  price?: number;
  tags?: string[];
  ctaText?: string;
  href?: string;
  className?: string;
  featured?: boolean;
  apps?: string[];
}

export const MarketplaceCard = ({
  icon: Icon,
  image,
  category,
  title,
  description,
  price,
  tags,
  ctaText,
  href,
  className,
  featured,
  apps
}: CardProps) => {
  const Content = (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className={cn(
        "glass-card group overflow-hidden flex flex-col h-full cursor-pointer",
        featured && "ring-2 ring-primary/20",
        className
      )}
    >
      {image ? (
        <div className="relative aspect-video overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {href && (
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>
      ) : Icon ? (
        <div className="p-6 pb-0 flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          {href && (
            <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>
      ) : null}

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          {category && (
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">
              {category}
            </span>
          )}
          {featured && (
            <span className="px-2 py-1 text-[10px] font-black uppercase tracking-widest bg-accent/10 text-accent rounded-md border border-accent/20 shadow-sm">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="mt-auto">
          {apps && apps.length > 0 && (
            <div className="flex -space-x-2 mb-6 overflow-hidden">
              {apps.slice(0, 4).map((app, i) => (
                <div key={app} title={app} className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-[10px] font-bold shadow-sm z-[i]">
                  {app.charAt(0)}
                </div>
              ))}
              {apps.length > 4 && (
                <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-[10px] font-bold text-text-muted z-0">
                  +{apps.length - 4}
                </div>
              )}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-surface text-text-muted border border-border">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/50">
            {price !== undefined && (
              <div className="flex flex-col">
                <span className="text-[9px] text-text-muted uppercase font-black tracking-[0.2em]">Price</span>
                <span className="text-2xl font-black text-text-primary tracking-tighter">${price}</span>
              </div>
            )}
            {ctaText && (
              <div className={cn(
                "btn-primary text-xs whitespace-nowrap px-6 py-3",
                !price && "w-full text-center"
              )}>
                {ctaText}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href}>
        {Content}
      </Link>
    );
  }

  return Content;
};
