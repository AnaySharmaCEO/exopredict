import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Sparkles } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@exopredict.com', label: 'Email' },
  ];

  const footerLinks = {
    Product: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Explorer', href: '/explorer' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Pricing', href: '/pricing' },
    ],
    Resources: [
      { name: 'API Reference', href: '/docs' },
      { name: 'Research Papers', href: '/docs' },
      { name: 'NASA Database', href: 'https://exoplanetarchive.ipac.caltech.edu' },
      { name: 'Support', href: '#' },
    ],
    Company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="glass border-t border-[rgba(0,255,255,0.2)] mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-[#00FFFF] neon-glow" />
              <span className="text-xl font-bold font-['Orbitron'] neon-text">
                ExoPredict
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md font-['Rajdhani']">
              Advanced AI-powered exoplanet prediction platform for researchers, 
              scientists, and space enthusiasts. Discover new worlds beyond our solar system.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-[#00FFFF] transition-colors p-2 rounded-full hover:bg-[rgba(0,255,255,0.1)]"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-['Orbitron'] font-semibold text-[#00FFFF] mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-[#00FFFF] transition-colors font-['Rajdhani'] hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(0,255,255,0.2)] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-['Rajdhani'] mb-4 md:mb-0">
            © 2024 ExoPredict. All rights reserved. Made with ❤️ for space exploration.
          </p>
          <div className="flex space-x-6">
            <Link 
              to="#" 
              className="text-gray-400 hover:text-[#00FFFF] transition-colors font-['Rajdhani'] hover:underline"
            >
              Privacy Policy
            </Link>
            <Link 
              to="#" 
              className="text-gray-400 hover:text-[#00FFFF] transition-colors font-['Rajdhani'] hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}