import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo = ({ className, iconOnly = false }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <div className="relative flex flex-col justify-center font-display leading-[0.8] transition-transform active:scale-95">
        <div className="absolute -top-1.5 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-text-primary">
            Intelligence
          </span>
          {!iconOnly && (
            <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-primary">
              Repository
            </span>
          )}
        </div>
        <div className="absolute -bottom-1.5 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary" />
      </div>
    </div>
  );
};
