import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

export function GlowingButton({ 
  variant = 'primary', 
  size = 'md', 
  glow = true, 
  pulse = false,
  className, 
  children, 
  ...props 
}: GlowingButtonProps) {
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-black hover:from-[#00CCCC] hover:to-[#7B1FA2]',
    secondary: 'bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] hover:bg-[rgba(0,255,255,0.1)]',
    accent: 'bg-gradient-to-r from-[#8A2BE2] to-[#FF6B9D] text-white hover:from-[#7B1FA2] hover:to-[#E91E63]',
  };

  const sizeStyles = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const glowStyles = {
    primary: glow ? 'neon-glow' : '',
    secondary: glow ? 'shadow-[0_0_20px_rgba(0,255,255,0.5)]' : '',
    accent: glow ? 'purple-glow' : '',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={pulse ? 'animate-pulse' : ''}
    >
      <Button
        className={cn(
          'ripple font-["Rajdhani"] font-semibold rounded-lg transition-all duration-300',
          variantStyles[variant],
          sizeStyles[size],
          glowStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}