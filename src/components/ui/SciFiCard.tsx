import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { cn } from '../ui/utils';

interface SciFiCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  pulse?: boolean;
  animated?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function SciFiCard({ 
  children, 
  className, 
  glow = true, 
  pulse = false, 
  animated = true,
  variant = 'default'
}: SciFiCardProps) {
  const variantStyles = {
    default: 'border-[rgba(0,255,255,0.2)]',
    success: 'border-green-500/30 bg-green-500/5',
    warning: 'border-yellow-500/30 bg-yellow-500/5',
    error: 'border-red-500/30 bg-red-500/5',
  };

  const glowStyles = {
    default: glow ? 'shadow-[0_0_20px_rgba(0,255,255,0.1)]' : '',
    success: glow ? 'shadow-[0_0_20px_rgba(34,197,94,0.1)]' : '',
    warning: glow ? 'shadow-[0_0_20px_rgba(234,179,8,0.1)]' : '',
    error: glow ? 'shadow-[0_0_20px_rgba(239,68,68,0.1)]' : '',
  };

  const cardComponent = (
    <Card
      className={cn(
        'glass backdrop-blur-xl border transition-all duration-300',
        variantStyles[variant],
        glowStyles[variant],
        pulse && 'animate-pulse',
        'hover:shadow-lg hover:border-opacity-50',
        className
      )}
    >
      {children}
    </Card>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {cardComponent}
      </motion.div>
    );
  }

  return cardComponent;
}