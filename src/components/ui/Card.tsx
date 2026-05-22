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
  comparePrice?: number;
  tags?: string[];
  ctaText?: string;
  href?: string;
  className?: string;
  featured?: boolean;
  apps?: string[];
  techStack?: string[];
}

export const MarketplaceCard = ({
  icon: Icon,
  image,
  category,
  title,
  description,
  price,
  comparePrice,
  tags,
  ctaText,
  href,
  className,
  featured,
  apps,
  techStack
}: CardProps) => {
  const Content = (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className={cn(
        "glass-card group overflow-hidden flex flex-col h-full cursor-pointer",
        featured && "ring-1 ring-primary/30",
        className
      )}
    >
      {image ? (
        <div className="relative aspect-video overflow-hidden rounded-t-3xl">
          <div className="w-full h-full bg-gradient-to-br from-surface-solid to-background flex items-center justify-center">
            <div className="text-center p-4">
              {Icon && <Icon className="w-12 h-12 text-primary mx-auto mb-2 opacity-60" />}
              <p className="text-xs text-text-muted font-mono">{title}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {href && (
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 border border-primary/30">
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>
      ) : Icon ? (
        <div className="p-6 pb-0 flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          {href && (
            <div className="w-8 h-8 rounded-full bg-surface-solid border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>
      ) : null}

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          {category && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              {category}
            </span>
          )}
          {featured && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary rounded-md border border-primary/20 shadow-sm">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {techStack.slice(0, 4).map(tech => (
              <span key={tech} className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-accent/10 text-accent border border-accent/20">
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-surface-solid text-text-muted border border-border">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto">
          {apps && apps.length > 0 && !techStack && (
            <div className="flex -space-x-2 mb-4 overflow-hidden">
              {apps.slice(0, 4).map((app, i) => (
                <div key={app} title={app} className="w-8 h-8 rounded-lg bg-surface-solid border border-border flex items-center justify-center text-[10px] font-bold shadow-sm z-[4-i]">
                  {app.charAt(0)}
                </div>
              ))}
              {apps.length > 4 && (
                <div className="w-8 h-8 rounded-lg bg-surface-solid border border-border flex items-center justify-center text-[10px] font-bold text-text-muted z-0">
                  +{apps.length - 4}
                </div>
              )}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-surface-solid text-text-muted border border-border">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
            {price !== undefined && (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-text-primary tracking-tighter">${price}</span>
                {comparePrice && (
                  <span className="text-sm text-text-muted line-through">${comparePrice}</span>
                )}
              </div>
            )}
            {ctaText && (
              <div className={cn(
                "btn-primary text-xs whitespace-nowrap px-5 py-2.5",
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
