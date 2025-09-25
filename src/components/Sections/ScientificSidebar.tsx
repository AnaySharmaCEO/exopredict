import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SciFiCard } from '../UI/SciFiCard';
import { ChevronDown, ExternalLink, BookOpen, Telescope, Zap } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

export function ScientificSidebar() {
  const [openSections, setOpenSections] = useState<string[]>(['methods']);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const researchData = [
    {
      id: 'methods',
      icon: Telescope,
      title: 'Detection Methods',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-[#00FFFF] mb-2">Transit Method</h4>
            <p className="text-sm text-gray-300">
              Detects periodic dimming of stellar light as a planet passes in front of its host star. 
              The depth of the transit reveals the planet's size relative to the star.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#00FFFF] mb-2">Radial Velocity</h4>
            <p className="text-sm text-gray-300">
              Measures the wobble of a star caused by gravitational pull of an orbiting planet. 
              Reveals planet mass and orbital characteristics.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'parameters',
      icon: Zap,
      title: 'Key Parameters',
      content: (
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-[#00FFFF]">Orbital Period</h4>
            <p className="text-xs text-gray-300">Time for one complete orbit around the host star</p>
          </div>
          <div>
            <h4 className="font-semibold text-[#00FFFF]">Planet Radius</h4>
            <p className="text-xs text-gray-300">Size relative to Earth (1.0 = Earth-sized)</p>
          </div>
          <div>
            <h4 className="font-semibold text-[#00FFFF]">Transit Depth</h4>
            <p className="text-xs text-gray-300">Fraction of stellar light blocked during transit</p>
          </div>
          <div>
            <h4 className="font-semibold text-[#00FFFF]">Transit Duration</h4>
            <p className="text-xs text-gray-300">Time planet spends crossing the stellar disk</p>
          </div>
        </div>
      )
    },
    {
      id: 'examples',
      icon: BookOpen,
      title: 'Famous Exoplanets',
      content: (
        <div className="space-y-3">
          <div className="p-3 bg-[rgba(0,255,255,0.1)] rounded-lg">
            <h4 className="font-semibold text-[#00FFFF]">Kepler-452b</h4>
            <p className="text-xs text-gray-300">Earth's "older cousin" - 385-day orbit, potentially habitable</p>
          </div>
          <div className="p-3 bg-[rgba(138,43,226,0.1)] rounded-lg">
            <h4 className="font-semibold text-[#8A2BE2]">TRAPPIST-1e</h4>
            <p className="text-xs text-gray-300">Rocky planet in habitable zone of ultra-cool dwarf star</p>
          </div>
          <div className="p-3 bg-[rgba(0,255,255,0.1)] rounded-lg">
            <h4 className="font-semibold text-[#00FFFF]">HD 209458b</h4>
            <p className="text-xs text-gray-300">First exoplanet detected by transit method (1999)</p>
          </div>
        </div>
      )
    }
  ];

  const externalLinks = [
    {
      name: 'NASA Exoplanet Archive',
      url: 'https://exoplanetarchive.ipac.caltech.edu',
      description: 'Official database of confirmed exoplanets'
    },
    {
      name: 'Kepler Mission',
      url: 'https://www.nasa.gov/kepler',
      description: 'NASA\'s planet-hunting space telescope'
    },
    {
      name: 'TESS Mission',
      url: 'https://tess.mit.edu',
      description: 'Transiting Exoplanet Survey Satellite'
    },
    {
      name: 'ExoFOP',
      url: 'https://exofop.ipac.caltech.edu',
      description: 'Follow-up observations portal'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Research Information */}
      <SciFiCard className="p-6">
        <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6 neon-text">
          Research Notes
        </h3>
        
        <div className="space-y-4">
          {researchData.map((section) => (
            <Collapsible
              key={section.id}
              open={openSections.includes(section.id)}
              onOpenChange={() => toggleSection(section.id)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 glass rounded-lg border border-[rgba(0,255,255,0.2)] hover:border-[rgba(0,255,255,0.4)] transition-colors">
                <div className="flex items-center gap-3">
                  <section.icon className="h-5 w-5 text-[#00FFFF]" />
                  <span className="font-['Orbitron'] text-[#00FFFF]">{section.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: openSections.includes(section.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-[#00FFFF]" />
                </motion.div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 font-['Rajdhani']"
                >
                  {section.content}
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </SciFiCard>

      {/* External Resources */}
      <SciFiCard className="p-6">
        <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6 neon-text">
          External Resources
        </h3>
        
        <div className="space-y-3">
          {externalLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block p-3 glass rounded-lg border border-[rgba(0,255,255,0.2)] hover:border-[rgba(0,255,255,0.4)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#00FFFF] group-hover:neon-text transition-all">
                    {link.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-['Rajdhani']">
                    {link.description}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-[#00FFFF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>
      </SciFiCard>

      {/* Fun Fact */}
      <SciFiCard className="p-6 bg-gradient-to-br from-[rgba(0,255,255,0.1)] to-[rgba(138,43,226,0.1)]">
        <h3 className="text-lg font-bold font-['Orbitron'] text-[#00FFFF] mb-3">
          Did You Know?
        </h3>
        <p className="text-sm text-gray-300 font-['Rajdhani'] leading-relaxed">
          As of 2024, over 5,000 exoplanets have been confirmed! The first exoplanet 
          around a sun-like star was discovered in 1995, earning the 2019 Nobel Prize in Physics.
        </p>
      </SciFiCard>
    </div>
  );
}