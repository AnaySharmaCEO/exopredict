import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '../ui/utils';

interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  glowing?: boolean;
}

export const NeonInput = forwardRef<HTMLInputElement, NeonInputProps>(
  ({ label, error, glowing = true, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label className="text-[#00FFFF] font-['Orbitron'] neon-text">
            {label}
          </Label>
        )}
        <motion.div
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Input
            ref={ref}
            className={cn(
              'glass border-[rgba(0,255,255,0.3)] bg-[rgba(16,33,62,0.6)] text-white placeholder-gray-400',
              'focus:border-[#00FFFF] focus:ring-2 focus:ring-[rgba(0,255,255,0.3)]',
              'font-["Rajdhani"] transition-all duration-300',
              glowing && 'focus:shadow-[0_0_15px_rgba(0,255,255,0.3)]',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
              className
            )}
            {...props}
          />
        </motion.div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 font-['Rajdhani']"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

NeonInput.displayName = 'NeonInput';