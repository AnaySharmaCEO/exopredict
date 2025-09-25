import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Explorer', href: '/explorer' },
    { name: 'Docs', href: '/docs' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="glass border-b border-[rgba(0,255,255,0.2)] backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Sparkles className="h-8 w-8 text-[#00FFFF] neon-glow" />
              <div className="absolute inset-0 animate-pulse">
                <Sparkles className="h-8 w-8 text-[#8A2BE2] opacity-50" />
              </div>
            </motion.div>
            <span className="text-xl font-bold font-['Orbitron'] star-trail neon-text">
              ExoPredict
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 rounded-md transition-all duration-300 font-['Rajdhani'] font-medium ${
                  isActive(item.href)
                    ? 'text-[#00FFFF] neon-text'
                    : 'text-gray-300 hover:text-[#00FFFF] hover:neon-text'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.3)] rounded-md"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              asChild
              className="bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-black font-bold hover:scale-105 transition-transform duration-300 ripple neon-glow"
            >
              <Link to="/dashboard">Start Predicting</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#00FFFF] p-2 rounded-md hover:bg-[rgba(0,255,255,0.1)] transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass border-t border-[rgba(0,255,255,0.2)]"
        >
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-['Rajdhani'] font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-[#00FFFF] bg-[rgba(0,255,255,0.1)] neon-text'
                    : 'text-gray-300 hover:text-[#00FFFF] hover:bg-[rgba(0,255,255,0.1)]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Button 
                asChild
                className="w-full bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-black font-bold"
              >
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Start Predicting
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}